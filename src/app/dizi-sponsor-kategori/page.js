import React from 'react';
import Container from  '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TopNavigation from '../components/TopNavigation';
import PersistentDrawerLeft from '../components/drawer';
//import getViews from '../utils/firebase/supabase';
//import Grid from '@mui/material/Grid';
import NavList from './comp/NavList';
import pagesData from '@/app/dizi-sponsor-kategori/page-data/keywordMeta.json';
// Main page component
const mappedNavData = pagesData.map(m => {
   // console.log('m.keyword',m.keyword)
    const href = `/dizi-sponsor-kategori/${m.keyword}/sayfa/1`
    const imageUrl =`/dizi/sponsor-kategori/${m.keyword}.jpg`
    const title = m.keywordTitle

    return { ...m, href, title,imageUrl }
})
export  function generateMetadata() {

  return {
    title: 'Türk Dizi Sponsor Kategoriler',
    description: 'Türk dizilerinde yer alan sponsorların kategorileştirilmiş listesi. En güncel dizi sponsorları ve markalar hakkında detaylı bilgiler.',
    openGraph: {
      title: 'Türk Dizi Sponsor Kategoriler',
      description: 'Türk dizilerinde yer alan sponsorların kategorileştirilmiş listesi',
      type: 'website',
    }
  }
}

export default function SponsorKategori() {

    
  return (
    <>
      {/* <TopNavigation selected={3} /> */}

        <Container sx={{width:{xs:'100%',md:'50%'}}}>
          <Typography variant='h4' textAlign='center' sx={{ marginTop: 2, marginBottom: 3 }}>
            Dizi Sponsor Kategorileri
          </Typography>
          <NavList
            items={mappedNavData}
          />
        </Container>

    </>
  );
}

export { mappedNavData };


// You'll need to implement this function to fetch user view data
// const getUserViewData = async () => {
//   return await getViews({ table: 'sponsorkategori-home' });
// };