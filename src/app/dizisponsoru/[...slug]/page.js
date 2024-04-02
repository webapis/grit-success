
import { promises as fs } from 'fs';

import SearchResultContainer from '@/app/dizisponsoru/comp/SearchResultContainer';

import PaginationContainer from '@/app/dizisponsoru/comp/PaginationContainer';
import path from 'path'
import Fuse from 'fuse.js'
import keywordMetaData from '@/app/dizisponsoru/keywordMetaData.json';
import pagesMetaData from '@/app/dizi/pageMetadata.json';
import deaccent from './deaccent';

debugger

export async function generateMetadata({ params }) {
    const dizi = params.slug[0]
    const keyword = params.slug[1]
    const page = parseInt(params.slug[3])



    const keywordObj = keywordMetaData.find(f => f.keyword === keyword)
    debugger
    const pageObj = pagesMetaData.find(f => {

        const current = deaccent(f.dizi).replaceAll(' ', '-').toLowerCase()

        const slug = dizi
        const match = current === slug

        return match
    })


   
    return {

        title: pageObj.dizi + ' Dizisi ' +keywordObj.keywordTitle +' Sponsorları'

    }






}



export default async function DiziSponsoru({ params }) {
    debugger
    const dizi = params.slug[0]
    const keyword = params.slug[1]
    const page = parseInt(params.slug[3])


    const data = await fs.readFile(path.join(process.cwd(), 'src/app/dizi/dizisponsoru.json'), 'utf8');
    const pagesData = JSON.parse(data);

  


    const pageObj = pagesMetaData.find(f => {

        const current = deaccent(f.dizi).replaceAll(' ', '-').toLowerCase()

        const slug = dizi
        const match = current === slug

        return match
    })

    const keywordObj = keywordMetaData.find(f => f.keyword === keyword)

    debugger
    const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name','Acyklama'], minMatchCharLength: 3 })



 
    
   
    let results = fuse.search({ "$and": [{ "TVSeriesTitle": pageObj.dizi },keywordObj.or ] })
 
    debugger
    const paginatedData = paginate(results, page, 50)
    const pageCount = Math.ceil(results.length / 50)
    return <>
        <SearchResultContainer data={paginatedData} pageTitle={`${pageObj.dizi} Dizisi ${keywordObj.keywordTitle} Sponsorları`} dizi={dizi} page={page} keyword={keyword} />
        <PaginationContainer count={pageCount} page={page} url={`/dizisponsoru/${dizi}/${keyword}/page/`} />
    </>








}


function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}