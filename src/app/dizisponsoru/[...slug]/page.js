import SearchResultContainer from '@/app/dizisponsoru/comp/SearchResultContainer';
import PaginationContainer from '@/app/dizisponsoru/comp/PaginationContainer';
import Fuse from 'fuse.js';
import keywordMetaData from '@/app/dizisponsoru/keywordMetaData.json';
import pagesMetaData from '@/app/dizi/pageMetadata.json';
import pagesData from '@/app/dizi/dizisponsoru.json';
import deaccent from './deaccent';

// Pre-compute common data at build time
const ITEMS_PER_PAGE = 50;
const fuseOptions = {
    keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'],
    minMatchCharLength: 4,
    threshold: 0.0,
};

// Pre-process page metadata for faster lookups
const pageMetadataMap = new Map(
    pagesMetaData.map(page => [
        deaccent(page.dizi).replaceAll(' ', '-').toLowerCase(),
        page
    ])
);

// Pre-process keyword metadata for faster lookups
const keywordMetadataMap = new Map(
    keywordMetaData.map(keyword => [keyword.keyword, keyword])
);

// Pre-compute keyword counts
const keywordsCounter = (() => {
    const candidateKeywords = [];
    const fuseInstances = new Map();

    for (const pageObj of pagesMetaData) {
        const tag = pageObj.slug.replace('-dizi-sponsorlari', '');
        const resultSimple = pagesData.filter(f => f.tag === tag);
        
        // Reuse Fuse instance for the same dataset
        if (!fuseInstances.has(tag)) {
            fuseInstances.set(tag, new Fuse(resultSimple, fuseOptions));
        }
        const fuse = fuseInstances.get(tag);

        for (const keywordObj of keywordMetaData) {
            const results = keywordObj.or 
                ? fuse.search({ "$and": [keywordObj.or] }).map(m => ({ ...m.item }))
                : resultSimple;

            candidateKeywords.push({
                dizi: tag,
                keyword: keywordObj.keyword,
                count: results.length,
                keywordTitle: keywordObj.keywordTitle,
            });
        }
    }
    return candidateKeywords;
})();

export function generateMetadata({ params }) {
    const pageObj = pageMetadataMap.get(params.slug[0]);
    const keywordObj = keywordMetadataMap.get(params.slug[1]);

    return {
        title: `${pageObj.dizi} Dizisi ${keywordObj.keywordTitle} Sponsorları`,
    };
}

export default async function DiziSponsoru({ params }) {
    const [dizi, keyword, _, pageStr] = params.slug;
    const page = parseInt(pageStr) || 1;

    const pageObj = pageMetadataMap.get(dizi);
    const keywordObj = keywordMetadataMap.get(keyword);
    const tag = pageObj.slug.replace('-dizi-sponsorlari', '');
    
    // Filter results based on the page object slug
    const resultSimple = pagesData.filter(f => f.tag === tag);
    
    // Search results
    const results = keywordObj.or
        ? new Fuse(resultSimple, fuseOptions)
            .search({ "$and": [keywordObj.or] })
            .map(m => ({ ...m.item }))
        : resultSimple;

    // Paginate results
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedData = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(results.length / ITEMS_PER_PAGE);

    return (
        <>
            <SearchResultContainer 
                totalItems={resultSimple.length} 
                keywordsCounter={keywordsCounter.filter(f => f.dizi === tag)} 
                data={paginatedData} 
                pageTitle={`${pageObj.dizi} Dizisi ${keywordObj.keywordTitle} Sponsorları`} 
                dizi={dizi} 
                page={page} 
                keyword={keyword} 
            />
            <PaginationContainer 
                count={pageCount} 
                page={page} 
                url={`/dizisponsoru/${dizi}/${keyword}/sayfa/`} 
            />
        </>
    );
}

export function generateStaticParams() {
    const pageCandidates = [];
    const fuseInstances = new Map();

    for (const pageObj of pagesMetaData) {
        const tag = pageObj.slug.replace('-dizi-sponsorlari', '');
        const resultSimple = pagesData.filter(f => f.tag === tag);
        
        // Reuse Fuse instance for the same dataset
        if (!fuseInstances.has(tag)) {
            fuseInstances.set(tag, new Fuse(resultSimple, fuseOptions));
        }
        const fuse = fuseInstances.get(tag);

        for (const keywordObj of keywordMetaData) {
            const results = keywordObj.or 
                ? fuse.search({ "$and": [keywordObj.or] }).map(m => ({ ...m.item }))
                : resultSimple;
            
            const pageCount = Math.ceil(results.length / ITEMS_PER_PAGE);
            
            if (pageCount > 0) {
                pageCandidates.push({
                    dizi: pageObj.dizi,
                    keyword: keywordObj.keyword,
                    pageCount
                });
            }
        }
    }

    return pageCandidates.flatMap(({ dizi, keyword, pageCount }) =>
        Array.from({ length: pageCount }, (_, index) => ({
            slug: [
                deaccent(dizi).toLowerCase().replaceAll(' ', '-'),
                keyword,
                'sayfa',
                (index + 1).toString()
            ]
        }))
    );
}