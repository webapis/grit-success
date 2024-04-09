
// import { promises as fs } from 'fs';

 import SearchResultContainer from '@/app/dizi-sponsor-kategori/comp/SearchResultContainer';

 import PaginationContainer from '@/app/dizi-sponsor-kategori/comp/PaginationContainer';
// import path from 'path'
import Fuse from 'fuse.js'
import keywordMetaData from '@/app/dizi-sponsor-kategori/page-data/keywordMetaData.json';
import pagesData from '@/app/dizi-sponsor-kategori/page-data/sponsor-kategori.json';



debugger

export async function generateMetadata({ params }) {
    const kategori = params.slug[0]

    const keywordObj = keywordMetaData.find(f => {

        const current = f.keyword

        const slug = kategori
        const match = current === slug

        return match
    })



    return {

        title: keywordObj.keywordTitle +' Dizi Sponsorları'

    }






}



export default async function DiziSponsorKategori({ params }) {
    debugger
    const kategori = params.slug[0]

    const page = parseInt(params.slug[2])

    console.log('page',page)

    // const data = await fs.readFile(path.join(process.cwd(), 'src/app/dizi/dizisponsoru.json'), 'utf8');
    // const pagesData = JSON.parse(data);

    debugger


    const keywordObj = keywordMetaData.find(f => {

        const current = f.keyword

        const slug = kategori
        const match = current === slug

        return match
    })



    debugger
    const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'], minMatchCharLength: 5 })


    let results = fuse.search(keywordObj.or )

    debugger
    const paginatedData = paginate(results, page, 50)
    const pageCount = Math.ceil(results.length / 50)

    return <>
        <SearchResultContainer data={paginatedData} pageTitle={` Dizilerde ${keywordObj.keywordTitle} Sponsorları`} dizi={''} page={page} keyword={'keyword'} />
        <PaginationContainer count={pageCount} page={page} url={`/dizi-sponsor-kategori/${keywordObj.keyword}/sayfa/`} />
    </>
}


function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}