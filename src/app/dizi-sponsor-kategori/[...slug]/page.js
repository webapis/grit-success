
// import { promises as fs } from 'fs';

import SearchResultContainer from '@/app/dizi-sponsor-kategori/comp/SearchResultContainer';

import PaginationContainer from '@/app/dizi-sponsor-kategori/comp/PaginationContainer';
// import path from 'path'
import Fuse from 'fuse.js'
import keywordMetaData from '@/app/dizi-sponsor-kategori/page-data/keywordMeta.json';
import pagesData from '@/app/dizi-sponsor-kategori/page-data/sponsor-kategori.json';
import getViews from '@/app/utils/firebase/supabase';
import BreadcrumbsComponent from '@/app/components/BreadcrumbsComponent';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export  function generateMetadata({ params }) {
    const kategori = params.slug[0];
    const keywordObj = keywordMetaData.find(f => f.keyword === kategori);

    // Initialize Fuse instance
    const fuse = new Fuse(pagesData, {
        keys: ['ServiceName', 'Acyklama'],
        threshold: 0.0,
        findAllMatches: true
    });

    // Search for relevant items
    const results = fuse.search(keywordObj.keywordTitle);
debugger
    // Extract and process relevant data
    const relevantPages = results.map(result => result.item);
    const uniqueServices = [...new Set(relevantPages.map(page => page.ServiceName))];
    const uniqueBrands = [...new Set(relevantPages.map(page => page.Name))];
    const uniqueSeries = [...new Set(relevantPages.map(page => page.TVSeriesTitle))];

    // Generate keywords
    const keywords = [
        keywordObj.keywordTitle,
        "dizi sponsorları",
        ...uniqueServices,
        ...uniqueBrands,
        ...uniqueSeries,
        "tv dizileri",
        "marka sponsorluğu",
        "ürün yerleştirme"
    ].join(", ");
debugger
    // Generate description
    const description = `${keywordObj.keywordTitle} ile ilgili dizi sponsorları ve ürün yerleştirmeleri. ${uniqueServices.slice(0, 3).join(", ")} gibi hizmetler sunan ${uniqueBrands.slice(0, 3).join(", ")} gibi markalar ${uniqueSeries.slice(0, 3).join(", ")} gibi dizilerde yer alıyor. Dizi sponsorluğu örnekleri ve detaylı bilgiler.`;

    // Generate title
    const title = `${keywordObj.keywordTitle} Dizi Sponsorları ve Ürün Yerleştirmeleri`;

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}



export default async function DiziSponsorKategori({ params }) {

    const kategori = params.slug[0]

    const page = parseInt(params.slug[2])
    const userViewData = await getViews({table:'sponsorkategori'})
 

    // const data = await fs.readFile(path.join(process.cwd(), 'src/app/dizi/dizisponsoru.json'), 'utf8');
    // const pagesData = JSON.parse(data);




    const keywordObj = keywordMetaData.find(f => {

        const current = f.keyword

        const slug = kategori
        const match = current === slug

        return match
    })



   
    const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'Acyklama'],
        // minMatchCharLength: 5
        threshold:0.0,
        findAllMatches:true 
        })
debugger

    let results = fuse.search(keywordObj.keywordTitle)

    
    const sortData = results.map(m => { return { ...m.item, duplicateTitles: m.item.duplicateTitles ? m.item.duplicateTitles : [m.item.TVSeriesTitle] } }).sort((a, b) => b.duplicateTitles.length - a.duplicateTitles.length)
    const paginatedData = paginate(sortData, page, 50)
    const pageCount = Math.ceil(sortData.length / 50)
    return <Container maxWidth="xl">
  
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 3, 
            backgroundColor: 'background.paper',
            borderRadius: 2
          }}
        >
          <BreadcrumbsComponent
            items={[
              { label: 'Ana Sayfa', href: '/', icon: HomeIcon },
              { label: 'Dizi Sponsor Kategorileri', href: '/dizi-sponsor-kategori' },
              { label: `${keywordObj.keywordTitle} Sponsorları` }
            ]}
          />
        </Paper>
        <SearchResultContainer userViewData={userViewData} data={paginatedData} pageTitle={` Dizilerde ${keywordObj.keywordTitle} Sponsorları`} dizi={''} page={page} keyword={'keyword'} />
        <PaginationContainer count={pageCount} page={page} url={`/dizi-sponsor-kategori/${keywordObj.keyword}/sayfa/`} />
    </Container>
}


function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}



export async function generateStaticParams() {

    const fuse = new Fuse(pagesData, {  keys: ['ServiceName', 'Acyklama'],   threshold:0.0,
        findAllMatches:true  })
    const pageCandidate = []
    for (let keywordObj of keywordMetaData) {

        let results = fuse.search(keywordObj.keywordTitle)

   
        const sortData = results.map(m => { return { ...m.item, duplicateTitles: m.item.duplicateTitles ? m.item.duplicateTitles : [m.item.TVSeriesTitle] } }).sort((a, b) => b.duplicateTitles.length - a.duplicateTitles.length)

        const pageCount = Math.ceil(sortData.length / 50)
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