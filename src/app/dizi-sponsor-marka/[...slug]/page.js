
// import { promises as fs } from 'fs';

import SearchResultContainer from '../comp/SearchResultContainer';

import PaginationContainer from '@/app/dizi-sponsor-marka/comp/PaginationContainer';
// import path from 'path'
import Fuse from 'fuse.js'
import keywordMetaData from '@/app/dizi-sponsor-kategori/page-data/keywordMetaData.json';
import pagesData from '@/app/dizi-sponsor-kategori/page-data/sponsor-kategori.json';
import getViews from '@/app/utils/firebase/supabase';



export async function generateMetadata({ params }) {
    const kategori = params.slug[0]

    const keywordObj = keywordMetaData.find(f => {

        const current = f.keyword

        const slug = kategori
        const match = current === slug

        return match
    })

    return {

        title: keywordObj.keywordTitle + ' Dizi Sponsor Kategori'

    }


}



export default async function DiziSponsorKategori({ params }) {
    debugger
    const kategori = params.slug[0]

    const page = parseInt(params.slug[2])
    const userViewData = await getViews({table:'sponsorkategori'})
    console.log('page', page)

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


    let results = fuse.search(keywordObj.or)

    debugger
    const sortData = results.map(m => { return { ...m.item, duplicateTitles: m.item.duplicateTitles ? m.item.duplicateTitles : [m.item.TVSeriesTitle] } }).sort((a, b) => b.duplicateTitles.length - a.duplicateTitles.length)
    const paginatedData = paginate(sortData, page, 25)
    const pageCount = Math.ceil(sortData.length / 25)
    return <>
        <SearchResultContainer userViewData={userViewData} data={paginatedData} pageTitle={` Dizilerde ${keywordObj.keywordTitle} Sponsorları`} dizi={''} page={page} keyword={'keyword'} />
        <PaginationContainer count={pageCount} page={page} url={`/dizi-sponsor-hizmetleri/${keywordObj.keyword}/sayfa/`} />
    </>
}


function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}


export async function generateStaticParams() {

    const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'], minMatchCharLength: 5 })
    const pageCandidate = []
    for (let keywordObj of keywordMetaData) {



        let results = fuse.search(keywordObj.or)
   
        const sortData = results.map(m => { return { ...m.item, duplicateTitles: m.item.duplicateTitles ? m.item.duplicateTitles : [m.item.TVSeriesTitle] } }).sort((a, b) => b.duplicateTitles.length - a.duplicateTitles.length)

        const pageCount = Math.ceil(sortData.length / 25)
        pageCandidate.push({ keyword: keywordObj.keyword, pageCount })
     
    }
    const pages = flattenArrayByPageCount(pageCandidate)

    return pages.map((post) => {
        const { keyword,page } = post
    
        return {
            slug: [keyword, 'sayfa', page.toString()]
        }

    })
}


function flattenArrayByPageCount(arrayOfObjects) {
    return arrayOfObjects.flatMap(obj => {
        const { keyword, pageCount } = obj;
        return Array.from({ length: pageCount }, (_, index) => ({
            keyword,
            page: index + 1
        }));
    });
}