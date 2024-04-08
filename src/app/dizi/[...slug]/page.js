
// import { promises as fs } from 'fs';

import SearchResultContainer from '../../dizisponsoru/comp/SearchResultContainer';

import PaginationContainer from '@/app/dizisponsoru/comp/PaginationContainer';
// import path from 'path'
import Fuse from 'fuse.js'
import pagesMetaData from '@/app/dizi/pageMetadata.json'
import pagesData from '@/app/dizi/dizisponsoru.json'
import deaccent from '@/app/dizisponsoru/[...slug]/deaccent';




export async function generateMetadata({ params }) {


    // const pages = await fs.readFile(path.join(process.cwd(), 'src/app/dizi/pageMetadata.json'), 'utf8');
    // const pagesData = JSON.parse(pages);
    debugger
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
    } else{

        return {

            title: 'Dizi sponsoru'

        }
    }








}



export default async function DiziPage({ params }) {
    const page = params.slug[2] ? parseInt(params.slug[2]) : 1
    // const pages = await fs.readFile(path.join(process.cwd(), 'src/app/dizi/pageMetadata.json'), 'utf8');
    // const pagesMetaData = JSON.parse(pages);
    // const data = await fs.readFile(path.join(process.cwd(), 'src/app/dizi/dizisponsoru.json'), 'utf8');
    // const pagesData = JSON.parse(data);


    console.log('params', params)


    const result = pagesMetaData.find(f => {

        const current = f.slug
        const slug = params.slug[0]
        const match = current === slug

        return match
    })

    const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name'], minMatchCharLength: 6 })




    if (result) {
        const { pageTitle, search } = result
        let results = fuse.search(search)

        const paginatedData = paginate(results, page, 50)
        const pageCount = Math.ceil(results.length / 50)
        return <> <SearchResultContainer data={paginatedData} pageTitle={pageTitle} dizi={deaccent(result.dizi).replaceAll(' ', '-').toLowerCase()} keyword="tum" />
            <PaginationContainer count={pageCount} page={page} url={`/dizi/${params.slug[0]}/page/`} />
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