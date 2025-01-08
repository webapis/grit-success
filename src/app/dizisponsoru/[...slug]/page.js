import SearchResultContainer from '@/app/dizisponsoru/comp/SearchResultContainer';
import PaginationContainer from '@/app/dizisponsoru/comp/PaginationContainer';
import Fuse from 'fuse.js';
import keywordMetaData from '@/app/dizisponsoru/keywordMetaData.json';
import pagesMetaData from '@/app/dizi/pageMetadata.json';
import pagesData from '@/app/dizi/dizisponsoru.json';
import deaccent from './deaccent';
import getViews from "@/app/utils/firebase/supabase"

// Route segment config for static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600; // Revalidate every hour

// Global caches
const CACHE_VERSION = '1.0';
const slugCache = new Map();
const memoizedPageData = new Map();
const fuseInstances = new Map();
const searchResultsCache = new Map();
const keywordResultsCache = new Map();

// Fuse.js options optimized for performance
const fuseOptions = {
    keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'],
    minMatchCharLength: 4,
    threshold: 0.0,
    distance: 100,
    ignoreLocation: true,
    useExtendedSearch: true,
    includeScore: false,
    includeMatches: false,
    shouldSort: true,
    findAllMatches: false,
};

// Utility functions with improved caching
function getProcessedSlug(dizi) {
    const cacheKey = `${CACHE_VERSION}:slug:${dizi}`;
    if (!slugCache.has(cacheKey)) {
        slugCache.set(cacheKey, deaccent(dizi).replaceAll(' ', '-').toLowerCase());
    }
    return slugCache.get(cacheKey);
}

function getPageData(slug) {
    const cacheKey = `${CACHE_VERSION}:page:${slug}`;
    if (!memoizedPageData.has(cacheKey)) {
        const cleanSlug = slug.replace('-dizi-sponsorlari', '');
        memoizedPageData.set(
            cacheKey,
            pagesData.filter((f) => f.tag === cleanSlug)
        );
    }
    return memoizedPageData.get(cacheKey);
}

function getFuseInstance(data) {
    const key = `${CACHE_VERSION}:fuse:${data.length}`;
    if (!fuseInstances.has(key)) {
        fuseInstances.set(key, new Fuse(data, fuseOptions));
    }
    return fuseInstances.get(key);
}

function getSearchResults(fuse, pattern, cacheKey) {
    if (!searchResultsCache.has(cacheKey)) {
        try {
            const results = pattern && fuse
                ? fuse.search({ "$and": [pattern] }).map(m => ({ ...m.item }))
                : (fuse ? fuse.__collection : []);
            searchResultsCache.set(cacheKey, results || []);
        } catch (error) {
            console.error('Search error:', error);
            searchResultsCache.set(cacheKey, []);
        }
    }
    return searchResultsCache.get(cacheKey) || [];
}

function paginate(array, page, pageSize = 50) {
    const startIndex = (page - 1) * pageSize;
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

// Optimized data processing with caching
export function countItemsByKeyword({ pagesMetaData, keywordMetaData }) {
    const cacheKey = `${CACHE_VERSION}:keywords:${pagesMetaData.length}:${keywordMetaData.length}`;
    
    if (!keywordResultsCache.has(cacheKey)) {
        try {
            const results = pagesMetaData.flatMap(pageObj => {
                if (!pageObj?.slug) return [];

                const resultSimple = getPageData(pageObj.slug);
                if (!resultSimple?.length) return [];

                const fuse = getFuseInstance(resultSimple);
                if (!fuse) return [];
                
                // Add "Tümü" option first
                const allResults = [{
                    dizi: pageObj.slug.replace('-dizi-sponsorlari', ''),
                    keyword: 'tum',
                    count: resultSimple.length,
                    keywordTitle: 'Tümü',
                }];
                
                // Then add other keyword results
                const keywordResults = keywordMetaData.map(keywordObj => {
                    if (!keywordObj) return null;

                    const searchCacheKey = `${CACHE_VERSION}:search:${pageObj.slug}:${keywordObj.keyword}`;
                    const results = getSearchResults(fuse, keywordObj.or, searchCacheKey);

                    return {
                        dizi: pageObj.slug.replace('-dizi-sponsorlari', ''),
                        keyword: keywordObj.keyword || 'tum',
                        count: Array.isArray(results) ? results.length : 0,
                        keywordTitle: keywordObj.keywordTitle || 'Tüm Ürünler',
                    };
                }).filter(Boolean); // Remove null results

                return [...allResults, ...keywordResults];
            });

            keywordResultsCache.set(cacheKey, results || []);
        } catch (error) {
            console.error('Keyword counting error:', error);
            keywordResultsCache.set(cacheKey, []);
        }
    }
    
    return keywordResultsCache.get(cacheKey) || [];
}

// Initialize counters with caching
const keywordsCounter = countItemsByKeyword({ pagesMetaData, keywordMetaData });

// Optimized metadata generation
export function generateMetadata({ params }) {
    const dizi = params.slug[0];
    const keyword = params.slug[1];

    const keywordObj = keywordMetaData.find(f => f.keyword === keyword);
    const pageObj = pagesMetaData.find(f => getProcessedSlug(f.dizi) === dizi);

    if (!pageObj || !keywordObj) {
        return { title: 'Dizi Sponsoru' };
    }

    const title = `${pageObj.dizi} Dizisi ${keywordObj.keywordTitle} Sponsorları`;
    const description = `${pageObj.dizi} dizisinin ${keywordObj.keywordTitle.toLowerCase()} sponsorları ve ürünleri hakkında detaylı bilgi.`;
    
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            locale: 'tr_TR',
        },
        alternates: {
            canonical: `/dizisponsoru/${dizi}/${keyword}`
        }
    };
}

// Main component with optimized data fetching
export default async function DiziSponsoru({ params }) {
    const dizi = params.slug[0];
    const keyword = params.slug[1];
    const page = parseInt(params.slug[3]) || 1;

    // Fetch view data with error handling
    let userViewData = { data: [] }
    try {
        userViewData = await getViews({ table: 'dizisponsoru' })
    } catch (error) {
        console.error('Failed to fetch view data:', error)
    }

    const pageObj = pagesMetaData.find(f => getProcessedSlug(f.dizi) === dizi);
    if (!pageObj) return null;

    // Handle "Tümü" case
    if (keyword === 'tum') {
        const resultSimple = getPageData(pageObj.slug);
        if (!resultSimple?.length) return null;

        const paginatedData = paginate(resultSimple, page);
        const pageCount = Math.ceil(resultSimple.length / 50);

        return (
            <main className="min-h-screen py-8">
                <SearchResultContainer 
                    totalItems={resultSimple.length} 
                    keywordsCounter={keywordsCounter.filter(f => f?.dizi === dizi) || []} 
                    data={paginatedData} 
                    pageTitle={`${pageObj.dizi} Dizisi Tüm Sponsorları`} 
                    dizi={dizi} 
                    page={page} 
                    keyword={keyword}
                    userViewData={userViewData}
                />
                <PaginationContainer 
                    count={pageCount} 
                    page={page} 
                    url={`/dizisponsoru/${dizi}/${keyword}/sayfa/`} 
                />
            </main>
        );
    }

    const keywordObj = keywordMetaData.find(f => f.keyword === keyword);
    if (!keywordObj) return null;

    const resultSimple = getPageData(pageObj.slug);
    if (!resultSimple?.length) return null;

    const fuse = getFuseInstance(resultSimple);
    if (!fuse) return null;
    
    const searchCacheKey = `${CACHE_VERSION}:search:${pageObj.slug}:${keyword}:${page}`;
    const results = getSearchResults(fuse, keywordObj.or, searchCacheKey);

    const paginatedData = paginate(results, page);
    const pageCount = Math.ceil(results.length / 50);

    return (
        <main className="min-h-screen py-8">
            <SearchResultContainer 
                totalItems={resultSimple.length} 
                keywordsCounter={keywordsCounter.filter(f => f?.dizi === dizi) || []} 
                data={paginatedData} 
                pageTitle={`${pageObj.dizi} Dizisi ${keywordObj.keywordTitle} Sponsorları`} 
                dizi={dizi} 
                page={page} 
                keyword={keyword}
                userViewData={userViewData}
            />
            <PaginationContainer 
                count={pageCount} 
                page={page} 
                url={`/dizisponsoru/${dizi}/${keyword}/sayfa/`} 
            />
        </main>
    );
}

// Optimized static params generation
export function generateStaticParams() {
    const pageCandidates = pagesMetaData.flatMap(pageObj => {
        const resultSimple = getPageData(pageObj.slug);
        const fuse = getFuseInstance(resultSimple);
        
        // Add "Tümü" option first
        const allResults = [{
            dizi: pageObj.dizi,
            keyword: 'tum',
            pageCount: Math.ceil(resultSimple.length / 50)
        }];
        
        // Then add other keyword results
        const keywordResults = keywordMetaData.map(keywordObj => {
            const searchCacheKey = `${CACHE_VERSION}:static:${pageObj.slug}:${keywordObj.keyword}`;
            const results = getSearchResults(fuse, keywordObj.or, searchCacheKey);

            return {
                dizi: pageObj.dizi,
                keyword: keywordObj.keyword,
                pageCount: Math.ceil(results.length / 50)
            };
        });

        return [...allResults, ...keywordResults];
    });

    return flattenArrayByPageCount(pageCandidates).map(({ dizi, keyword, page }) => ({
        slug: [
            getProcessedSlug(dizi),
            keyword,
            'sayfa',
            page.toString()
        ],
    }));
}