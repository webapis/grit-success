
import SearchResultContainer from '@/app/dizisponsoru/comp/SearchResultContainer';
import PaginationContainer from '@/app/dizisponsoru/comp/PaginationContainer';
import Fuse from 'fuse.js'
import keywordMetaData from '@/app/dizisponsoru/keywordMetaData.json';
import pagesMetaData from '@/app/dizi/pageMetadata.json';
import pagesData from '@/app/dizi/dizisponsoru.json';
import deaccent from './deaccent';

const keywordsCounter = countItemsByKeyword({ pagesMetaData, keywordMetaData })

export function generateMetadata({ params }) {
    const dizi = params.slug[0]
    const keyword = params.slug[1]

    const keywordObj = keywordMetaData.find(f => f.keyword === keyword)

    const pageObj = pagesMetaData.find(f => {

        const current = deaccent(f.dizi).replaceAll(' ', '-').toLowerCase()

        const slug = dizi
        const match = current === slug

        return match
    })
    return {

        title: pageObj.dizi + ' Dizisi ' + keywordObj.keywordTitle + ' Sponsorları'

    }

}



export default function DiziSponsoru({ params }) {

    const dizi = params.slug[0]
    const keyword = params.slug[1]
    const currentKeywordCounter = keywordsCounter.filter(f => f.dizi === dizi)
    debugger
    const page = parseInt(params.slug[3])

    const pageObj = pagesMetaData.find(f => {

        const current = deaccent(f.dizi).replaceAll(' ', '-').toLowerCase()

        const slug = dizi
        const match = current === slug

        return match
    })

    const keywordObj = keywordMetaData.find(f => f.keyword === keyword)
    debugger


    const resultSimple = pagesData.filter((f) => f.tag === pageObj.slug.replace('-dizi-sponsorlari', ''))
    const fuse = new Fuse(resultSimple, {
        keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama']
        , minMatchCharLength: 4, threshold: 0.0
    })

    let results = keywordObj.or ? fuse.search({ "$and": [keywordObj.or] }).map(m => { return { ...m.item } }) : resultSimple
    const paginatedData = paginate(results, page, 50)
    const pageCount = Math.ceil(results.length / 50)
    return <>

        <SearchResultContainer totalItems={resultSimple.length} keywordsCounter={currentKeywordCounter} data={paginatedData} pageTitle={`${pageObj.dizi} Dizisi ${keywordObj.keywordTitle} Sponsorları`} dizi={dizi} page={page} keyword={keyword} />

        <PaginationContainer count={pageCount} page={page} url={`/dizisponsoru/${dizi}/${keyword}/sayfa/`} />
    </>


}


export function generateStaticParams(props) {

    const pageCantidates = []


    for (let pageObj of pagesMetaData) {

        for (let keywordObj of keywordMetaData) {

            const resultSimple = pagesData.filter((f) => f.tag === pageObj.slug.replace('-dizi-sponsorlari', ''))
            const fuse = new Fuse(resultSimple, {
                keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama']
                , minMatchCharLength: 4, threshold: 0.0
            })
            let results = keywordObj.or ? fuse.search({ "$and": [keywordObj.or] }).map(m => { return { ...m.item } }) : resultSimple
            const pageCount = Math.ceil(results.length / 50)

            pageCantidates.push({ dizi: pageObj.dizi, keyword: keywordObj.keyword, pageCount })


        }

    }
    const pages = flattenArrayByPageCount(pageCantidates)

    return pages.map((post) => {

        const { dizi, keyword, page } = post

        return {
            slug: [deaccent(dizi).toLowerCase().replaceAll(' ', '-'), keyword, 'sayfa', page.toString()]
        }

    })
}

function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}


function flattenArrayByPageCount(arrayOfObjects) {
    return arrayOfObjects.flatMap(obj => {
        const { dizi, pageCount, keyword } = obj;
        return Array.from({ length: pageCount }, (_, index) => ({
            dizi,
            keyword,
            page: index + 1
        }));
    });
}


 export function countItemsByKeyword({ pagesMetaData, keywordMetaData }) {

    const candidateKeywords = []


    for (let pageObj of pagesMetaData) {

        for (let keywordObj of keywordMetaData) {

            const resultSimple = pagesData.filter((f) => f.tag === pageObj.slug.replace('-dizi-sponsorlari', ''))
            const fuse = new Fuse(resultSimple, {
                keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama']
                , minMatchCharLength: 4, threshold: 0.0
            })
            let results = keywordObj.or ? fuse.search({ "$and": [keywordObj.or] }).map(m => { return { ...m.item } }) : resultSimple


            candidateKeywords.push({ dizi: pageObj.slug.replace('-dizi-sponsorlari', ''), keyword: keywordObj.keyword, count: results.length,keywordTitle:keywordObj.keywordTitle })


        }

    }

    return candidateKeywords
}