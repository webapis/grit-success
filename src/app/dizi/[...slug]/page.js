
//import { promises as fs } from 'fs';

import SearchResultContainer from '../../dizisponsoru/comp/SearchResultContainer';

import PaginationContainer from '@/app/dizisponsoru/comp/PaginationContainer';
//import path from 'path'
import Fuse from 'fuse.js'
import pagesMetaData from '@/app/dizi/pageMetadata.json'
import pagesData from '@/app/dizi/dizisponsoru.json'
import deaccent from '@/app/dizisponsoru/[...slug]/deaccent';




export  function generateMetadata({ params }) {



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



export default async function DiziPage({ params }) {
    
    const page = params.slug[2] ? parseInt(params.slug[2]) : 1




    const result = pagesMetaData.find(f => {

        const current = f.slug
        const slug = params.slug[0]
        const match = current === slug

        return match
    })

    const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'tag'], minMatchCharLength: 4, threshold: 0.0  })




    if (result) {
        const { pageTitle, search } = result
        let results = fuse.search(search)
        const paginatedData = paginate(results, page, 50)
        const pageCount = Math.ceil(results.length / 50)
        
        return <> <SearchResultContainer data={paginatedData} pageTitle={pageTitle} dizi={deaccent(result.dizi).replaceAll(' ', '-').toLowerCase()} keyword="tum" />
            <PaginationContainer count={pageCount} page={page} url={`/dizi/${params.slug[0]}/sayfa/`} />
        </>
    } else {
        return <div>Loading....</div>
    }




}


function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}


export async function generateStaticParams() {

    const pageCandidates = []
    for (let meta of pagesMetaData) {

        const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'tag'],  minMatchCharLength: 0, threshold: 0.3 })
        const { search } = meta
        let results = fuse.search(search)
        const pageCount = Math.ceil(results.length / 25)

        pageCandidates.push({ pageCount, slug: meta.slug })

 
    }

    const pages = flattenArrayByPageCount(pageCandidates)

    return pages.map((post) => {
        const { slug, page } = post
        if(page===1){
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