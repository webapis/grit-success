
// import { promises as fs } from 'fs';

import SearchResultContainer from '@/app/dizisponsoru/comp/SearchResultContainer';

import PaginationContainer from '@/app/dizisponsoru/comp/PaginationContainer';
// import path from 'path'
import Fuse from 'fuse.js'
import keywordMetaData from '@/app/dizisponsoru/keywordMetaData.json';
import pagesMetaData from '@/app/dizi/pageMetadata.json';
import pagesData from '@/app/dizi/dizisponsoru.json';
import deaccent from './deaccent';
import keywords from '@/app/sponsor-kiyafeti/comp/keywords';

debugger

export async function generateMetadata({ params }) {
    const dizi = params.slug[0]
    const keyword = params.slug[1]

    const keywordObj = keywordMetaData.find(f => f.keyword === keyword)
    debugger
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



export default async function DiziSponsoru({ params }) {
    debugger
    const dizi = params.slug[0]
    const keyword = params.slug[1]
    const page = parseInt(params.slug[3])


    




    const pageObj = pagesMetaData.find(f => {

        const current = deaccent(f.dizi).replaceAll(' ', '-').toLowerCase()

        const slug = dizi
        const match = current === slug

        return match
    })

    const keywordObj = keywordMetaData.find(f => f.keyword === keyword)

    debugger
    const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'],   useExtendedSearch: true,
        threshold: 0.0,
        minMatchCharLength: 3,
        ignoreLocation: true,
        findAllMatches: true,
        ignoreFieldNorm: true})






    let results = keywordObj.or ? fuse.search({ "$and": [{ "TVSeriesTitle": pageObj.dizi }, keywordObj.or] }) : fuse.search({ "$and": [{ "TVSeriesTitle": pageObj.dizi }] })

    debugger
    const paginatedData = paginate(results, page, 50)
    const pageCount = Math.ceil(results.length / 50)
    return <>




        <SearchResultContainer data={paginatedData} pageTitle={`${pageObj.dizi} Dizisi ${keywordObj.keywordTitle} Sponsorları`} dizi={dizi} page={page} keyword={keyword} />

        <PaginationContainer count={pageCount} page={page} url={`/dizisponsoru/${dizi}/${keyword}/sayfa/`} />
    </>








}


export async function generateStaticParams(props) {

    const pageCantidates = []
debugger

const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'], minMatchCharLength: 4 })


    for (let pageObj of pagesMetaData) {
   
        for (let keywordObj of keywordMetaData) {

            let results = keywordObj.or ? fuse.search({ "$and": [{ "TVSeriesTitle": pageObj.dizi }, keywordObj.or] }) : fuse.search({ "$and": [{ "TVSeriesTitle": pageObj.dizi }] })

        
        
            const pageCount = Math.ceil(results.length / 50)

            pageCantidates.push({dizi:pageObj.dizi,keyword:keywordObj.keyword,pageCount})
       

        }

    }
const pages = flattenArrayByPageCount(pageCantidates)
    debugger
    return pages.map((post) => {
        debugger
        const { dizi, keyword,page } = post
        debugger
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