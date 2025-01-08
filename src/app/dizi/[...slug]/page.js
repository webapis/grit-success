import SearchResultContainer from '../../dizisponsoru/comp/SearchResultContainer';

import PaginationContainer from '@/app/dizisponsoru/comp/PaginationContainer';

import pagesMetaData from '@/app/dizi/pageMetadata.json'
import keywordMetaData from '@/app/dizisponsoru/keywordMetaData.json';
import pagesData from '@/app/dizi/dizisponsoru.json'
import deaccent from '@/app/dizisponsoru/[...slug]/deaccent';
import { countItemsByKeyword } from '@/app/dizisponsoru/[...slug]/page';
import getViews from "@/app/utils/firebase/supabase"


const keywordsCounter = countItemsByKeyword({ pagesMetaData, keywordMetaData })

/**
 * @type {import('next/types').Metadata}
 */
export function generateMetadata({ params }) {
    const result = pagesMetaData.find(f => {
        const current = f.slug
        const slug = params.slug[0]
        return current === slug
    })

    if (!result) {
        return {
            title: 'Dizi sponsoru',
            description: 'Dizi sponsorları ve ürünleri',
            alternates: {
                canonical: `/dizi`
            }
        }
    }

    const { pageTitle, dizi } = result
    return {
        title: pageTitle,
        description: `${dizi} dizisinde kullanılan sponsorlu ürünler ve markaları`,
        alternates: {
            canonical: `/dizi/${result.slug}`
        },
        openGraph: {
            title: pageTitle,
            description: `${dizi} dizisinde kullanılan sponsorlu ürünler ve markaları`,
            type: 'website',
            url: `/dizi/${result.slug}`,
        }
    }
}

/**
 * @type {import('next/types').PageConfig}
 */
export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = false

/**
 * Main page component for dizi details
 * @param {Object} props - Component props
 * @param {Object} props.params - URL parameters
 * @returns {JSX.Element} Rendered page component
 */
export default async function DiziPage({ params }) {
    const page = params.slug[2] ? parseInt(params.slug[2]) : 1
    const result = pagesMetaData.find(f => {
        const current = f.slug
        const slug = params.slug[0]
        return current === slug
    })

    if (!result) {
        return null
    }

    const currentKeywordCounter = keywordsCounter.filter(f => 
        f.dizi === result.slug.replace('-dizi-sponsorlari', '')
    )

    const resultSimple = pagesData.filter((f) => 
        f.tag === result.slug.replace('-dizi-sponsorlari', '')
    )

    const { pageTitle } = result
    const paginatedData = paginate(resultSimple, page, 50)
    const pageCount = Math.ceil(resultSimple.length / 50)
    const diziSlug = deaccent(result.dizi).replaceAll(' ', '-').toLowerCase()

    // Fetch view data with error handling
    let userViewData = { data: [] }
    try {
        userViewData = await getViews({ table: 'dizisponsoru' })
    } catch (error) {
        console.error('Failed to fetch view data:', error)
    }

    return (
        <main>
            <SearchResultContainer 
                totalItems={resultSimple.length} 
                keywordsCounter={currentKeywordCounter} 
                data={paginatedData} 
                pageTitle={pageTitle} 
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
    )
}

/**
 * Paginates an array of items
 * @param {Array} array - Array to paginate
 * @param {number} page - Current page number
 * @param {number} pageSize - Items per page
 * @returns {Array} Paginated array slice
 */
function paginate(array, page, pageSize) {
    const adjustedPage = page - 1
    const startIndex = adjustedPage * pageSize
    const endIndex = startIndex + pageSize
    return array.slice(startIndex, endIndex)
}


export function generateStaticParams() {

    const pageCandidates = []
    for (let meta of pagesMetaData) {

       // const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'tag'], minMatchCharLength: 0, threshold: 0.3 })
        const { search,slug } = meta

        const resultSimple = pagesData.filter((f) => f.tag === slug.replace('-dizi-sponsorlari', ''))
        //let results = fuse.search(search)
        const pageCount = Math.ceil(resultSimple.length / 50)

        pageCandidates.push({ pageCount, slug: meta.slug })


    }

    const pages = flattenArrayByPageCount(pageCandidates)

    return pages.map((post) => {
        const { slug, page } = post
        if (page === 1) {
            return {
                slug: [slug]
            }
        }
        return {
            slug: [slug, 'sayfa', page.toString()]
        }

    })
}


function flattenArrayByPageCount(arrayOfObjects) {
    return arrayOfObjects.flatMap(obj => {
        const { slug, pageCount } = obj;
        return Array.from({ length: pageCount }, (_, index) => ({
            slug,
            page: index + 1
        }));
    });
}