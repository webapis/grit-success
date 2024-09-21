import React from 'react';
import { Container, Typography } from '@mui/material';
import TopNavigation from '../components/TopNavigation';
import PersistentDrawerLeft from '../components/drawer';
import getViews from '../utils/firebase/supabase';
import NavList from './comp/NavList';
import pagesData from '@/app/dizi-sponsor-kategori/page-data/keywordMeta.json';
// Main page component
const mappedNavData = pagesData.map(m => {
    const href = `/dizi-sponsor-kategori/${m.keyword}/sayfa/1`
    const imageUrl =m.keyword
    const title = m.keywordTitle

    return { ...m, href, title }
})


export default function SponsorKategori() {

    
  return (
    <>
      <TopNavigation selected={3} />
      <PersistentDrawerLeft data={mappedNavData} title="Sponsor Kategori">
        <Container>
          <Typography variant='h4' textAlign='center' sx={{ marginTop: 2, marginBottom: 3 }}>
            Dizi Sponsor Kategoriler
          </Typography>
          <NavList
            items={mappedNavData}
       
          />
        </Container>
      </PersistentDrawerLeft>
    </>
  );
}

export { mappedNavData };

export async function generateMetadata({ params }) {
  return {
    title: 'Dizi Sponsor Kategori'
  };
}

// You'll need to implement this function to fetch user view data
// const getUserViewData = async () => {
//   return await getViews({ table: 'sponsorkategori-home' });
// };