import SearchResultContainer from '@/app/dizisponsoru/comp/SearchResultContainer';
import PaginationContainer from '@/app/dizisponsoru/comp/PaginationContainer';
import Fuse from 'fuse.js';
import keywordMetaData from '@/app/dizisponsoru/keywordMetaData.json';
import pagesMetaData from '@/app/dizi/pageMetadata.json';
import pagesData from '@/app/dizi/dizisponsoru.json';
import deaccent from './deaccent';
import {mappedData} from "../[...slug]/../Application"
import PersistentDrawerLeft from "@/app/components/drawer"
const keywordsCounter = countItemsByKeyword({ pagesMetaData, keywordMetaData });

export function generateMetadata({ params }) {
    const dizi = params.slug[0];
    const keyword = params.slug[1];

    const keywordObj = keywordMetaData.find(f => f.keyword === keyword);
    const pageObj = pagesMetaData.find(f => {
        const current = deaccent(f.dizi).replaceAll(' ', '-').toLowerCase();
        return current === dizi;
    });

    return {
        title: `${pageObj.dizi} Dizisi ${keywordObj.keywordTitle} Sponsorları`,
    };
}

export default async function DiziSponsoru({ params }) {
    const dizi = params.slug[0];
    const keyword = params.slug[1];
    const page = parseInt(params.slug[3]) || 1;

    // Get page and keyword objects
    const pageObj = pagesMetaData.find(f => {
        const current = deaccent(f.dizi).replaceAll(' ', '-').toLowerCase();
        return current === dizi;
    });

    const keywordObj = keywordMetaData.find(f => f.keyword === keyword);

    // Filter results based on the page object slug
    const resultSimple = pagesData.filter((f) => f.tag === pageObj.slug.replace('-dizi-sponsorlari', ''));

    // Initialize Fuse.js for search functionality
    const fuse = new Fuse(resultSimple, {
        keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'],
        minMatchCharLength: 4,
        threshold: 0.0,
    });

    // Perform the search based on the keyword object
    const results = keywordObj.or ? fuse.search({ "$and": [keywordObj.or] }).map(m => ({ ...m.item })) : resultSimple;

    // Paginate results
    const paginatedData = paginate(results, page, 50);
    const pageCount = Math.ceil(results.length / 50);

    return (
        <>
     
            <SearchResultContainer 
                totalItems={resultSimple.length} 
                keywordsCounter={keywordsCounter.filter(f => f.dizi === dizi)} 
                data={paginatedData} 
                pageTitle={`${pageObj.dizi} Dizisi ${keywordObj.keywordTitle} Sponsorları`} 
                dizi={dizi} 
                page={page} 
                keyword={keyword} 
            />
            <PaginationContainer count={pageCount} page={page} url={`/dizisponsoru/${dizi}/${keyword}/sayfa/`} />
    
        </>
    );
}

export function generateStaticParams() {
    const pageCandidates = [];

    for (let pageObj of pagesMetaData) {
        for (let keywordObj of keywordMetaData) {
            const resultSimple = pagesData.filter((f) => f.tag === pageObj.slug.replace('-dizi-sponsorlari', ''));
            const fuse = new Fuse(resultSimple, {
                keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'],
                minMatchCharLength: 4,
                threshold: 0.0,
            });

            let results = keywordObj.or ? fuse.search({ "$and": [keywordObj.or] }).map(m => ({ ...m.item })) : resultSimple;
            const pageCount = Math.ceil(results.length / 50);

            pageCandidates.push({ dizi: pageObj.dizi, keyword: keywordObj.keyword, pageCount });
        }
    }

    return flattenArrayByPageCount(pageCandidates).map(({ dizi, keyword, page }) => ({
        slug: [deaccent(dizi).toLowerCase().replaceAll(' ', '-'), keyword, 'sayfa', page.toString()],
    }));
}

function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index
    const startIndex = page * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
}

function flattenArrayByPageCount(arrayOfObjects) {
    return arrayOfObjects.flatMap(({ dizi, pageCount, keyword }) =>
        Array.from({ length: pageCount }, (_, index) => ({
            dizi,
            keyword,
            page: index + 1,
        }))
    );
}

export function countItemsByKeyword({ pagesMetaData, keywordMetaData }) {
    const candidateKeywords = [];

    for (let pageObj of pagesMetaData) {
        for (let keywordObj of keywordMetaData) {
            const resultSimple = pagesData.filter((f) => f.tag === pageObj.slug.replace('-dizi-sponsorlari', ''));
            const fuse = new Fuse(resultSimple, {
                keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'],
                minMatchCharLength: 4,
                threshold: 0.0,
            });

            let results = keywordObj.or ? fuse.search({ "$and": [keywordObj.or] }).map(m => ({ ...m.item })) : resultSimple;

            candidateKeywords.push({
                dizi: pageObj.slug.replace('-dizi-sponsorlari', ''),
                keyword: keywordObj.keyword,
                count: results.length,
                keywordTitle: keywordObj.keywordTitle,
            });
        }
    }

    return candidateKeywords;
}