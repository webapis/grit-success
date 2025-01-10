import SearchResultContainer from '../../dizisponsoru/comp/SearchResultContainer';
import PaginationContainer from '@/app/dizisponsoru/comp/PaginationContainer';
import pagesMetaData from '@/app/dizi/pageMetadata.json';
import keywordMetaData from '@/app/dizisponsoru/keywordMetaData.json';
import pagesData from '@/app/dizi/dizisponsoru.json';
import deaccent from '@/app/dizisponsoru/[...slug]/deaccent';
import getViews from "@/app/utils/firebase/supabase";
import Fuse from 'fuse.js';
const ITEMS_PER_PAGE = 50;

// Remove Fuse.js since it's not being used in this file
export function countItemsByKeyword(dizi) {
    return keywordMetaData.map(keywordObj => ({
        dizi,
        keyword: keywordObj.keyword,
        count: pagesData.filter(f => f.tag === dizi).length,
        keywordTitle: keywordObj.keywordTitle,
    }));
}
const fuseOptions = {
    keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'],
    minMatchCharLength: 4,
    threshold: 0.0,
};

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
    const result = pagesMetaData.find(f => f.slug === params.slug[0]);

    if (!result) {
        return {
            title: 'Dizi sponsoru',
            description: 'Dizi sponsorları ve ürünleri',
            alternates: {
                canonical: `/dizi`
            }
        };
    }

    const { pageTitle, dizi } = result;
    const description = `${dizi} dizisinde kullanılan sponsorlu ürünler ve markaları`;
    const url = `/dizi/${result.slug}`;

    return {
        title: pageTitle,
        description,
        alternates: {
            canonical: url
        },
        openGraph: {
            title: pageTitle,
            description,
            type: 'website',
            url,
        }
    };
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;

export default async function DiziPage({ params }) {
    const page = params.slug[2] ? parseInt(params.slug[2]) : 1;
    const result = pagesMetaData.find(f => f.slug === params.slug[0]);

    if (!result) return null;

    const tag = result.slug.replace('-dizi-sponsorlari', '');
    const resultSimple = pagesData.filter(f => f.tag === tag);
    
    // Calculate pagination
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedData = resultSimple.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(resultSimple.length / ITEMS_PER_PAGE);
    
    const diziSlug = deaccent(result.dizi).replaceAll(' ', '-').toLowerCase();

    // Fetch view data with error handling
    let userViewData = { data: [] };
    try {
        userViewData = await getViews({ table: 'dizisponsoru' });
    } catch (error) {
        console.error('Failed to fetch view data:', error);
    }

    return (
        <main>
            <SearchResultContainer 
                totalItems={resultSimple.length} 
                keywordsCounter={keywordsCounter.filter(f => f.dizi === tag)} 
                data={paginatedData} 
                pageTitle={result.pageTitle} 
                dizi={diziSlug} 
                keyword="tum"
                userViewData={userViewData}
            />
            <PaginationContainer 
                count={pageCount} 
                page={page} 
                url={`/dizi/${params.slug[0]}/sayfa/`} 
            />
        </main>
    );
}

export function generateStaticParams() {
    const paths = [];
    
    for (const meta of pagesMetaData) {
        const resultCount = pagesData.filter(
            f => f.tag === meta.slug.replace('-dizi-sponsorlari', '')
        ).length;
        
        const pageCount = Math.ceil(resultCount / ITEMS_PER_PAGE);
        
        // Add path for first page
        paths.push({
            slug: [meta.slug]
        });
        
        // Add paths for additional pages
        for (let page = 2; page <= pageCount; page++) {
            paths.push({
                slug: [meta.slug, 'sayfa', page.toString()]
            });
        }
    }
    
    return paths;
}