


import SearchResultContainer from '../../dizisponsoru/comp/SearchResultContainer';

import PaginationContainer from '@/app/dizisponsoru/comp/PaginationContainer';

import pagesMetaData from '@/app/dizi/pageMetadata.json'
import keywordMetaData from '@/app/dizisponsoru/keywordMetaData.json';
import pagesData from '@/app/dizi/dizisponsoru.json'
import deaccent from '@/app/dizisponsoru/[...slug]/deaccent';
import { countItemsByKeyword } from '@/app/dizisponsoru/[...slug]/page';


const keywordsCounter = countItemsByKeyword({ pagesMetaData, keywordMetaData })
export function generateMetadata({ params }) {

    const result = pagesMetaData.find(f => {
        const current = f.slug
        const slug = params.slug[0]
        const match = current === slug

        return match
    })
    if (result) {
        const { pageTitle } = result
        return {

            title: pageTitle

        }
    } else {

        return {

            title: 'Dizi sponsoru'

        }
    }


}



export default function DiziPage({ params }) {

    const page = params.slug[2] ? parseInt(params.slug[2]) : 1


    const result = pagesMetaData.find(f => {

        const current = f.slug
        const slug = params.slug[0]
        const match = current === slug

        return match
    })
debugger
    const currentKeywordCounter = keywordsCounter.filter(f => f.dizi === result.slug.replace('-dizi-sponsorlari', ''))

    const resultSimple = pagesData.filter((f) => f.tag === result.slug.replace('-dizi-sponsorlari', ''))


        const { pageTitle } = result

        const paginatedData = paginate(resultSimple, page, 50)
        const pageCount = Math.ceil(resultSimple.length / 50)

        return <> <SearchResultContainer totalItems={resultSimple.length} keywordsCounter={currentKeywordCounter} data={paginatedData} pageTitle={pageTitle} dizi={deaccent(result.dizi).replaceAll(' ', '-').toLowerCase()} keyword="tum" />
            <PaginationContainer count={pageCount} page={page} url={`/dizi/${params.slug[0]}/sayfa/`} />
        </>
 




}


function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
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