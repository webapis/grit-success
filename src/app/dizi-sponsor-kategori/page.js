import React from 'react';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import BreadcrumbsComponent from '@/app/components/BreadcrumbsComponent';
import HomeIcon from '@mui/icons-material/Home';
import NavList from './comp/NavList';
import pagesData from '@/app/dizi-sponsor-kategori/page-data/keywordMeta.json';

// Pre-compute mapped data outside component
const mappedNavData = pagesData.map(m => ({
  ...m,
  href: `/dizi-sponsor-kategori/${m.keyword}/sayfa/1`,
  imageUrl: `/dizi/sponsor-kategori/${m.keyword}.jpg`,
  title: m.keywordTitle
}));

export function generateMetadata() {
  return {
    title: 'Türk Dizi Sponsor Kategoriler',
    description: 'Türk dizilerinde yer alan sponsorların kategorileştirilmiş listesi. En güncel dizi sponsorları ve markalar hakkında detaylı bilgiler.',
    openGraph: {
      title: 'Türk Dizi Sponsor Kategoriler',
      description: 'Türk dizilerinde yer alan sponsorların kategorileştirilmiş listesi',
      type: 'website',
      siteName: 'Dizi Sponsor',
      locale: 'tr_TR',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function SponsorKategori() {
  return (
    <main>
      <Container>
        <Paper
          component="section"
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
              { label: 'Dizi Sponsor Kategorileri' }
            ]}
          />
        </Paper>
      </Container>
      
      <Container 
        component="section"
        sx={{ 
          width: { xs: '100%', md: '50%' },
          transition: 'width 0.3s ease-in-out'
        }}
      >
        <Typography 
          variant='h1' 
          component="h1"
          textAlign='center' 
          sx={{ 
            marginTop: 2, 
            marginBottom: 3,
            fontSize: { xs: '1.75rem', md: '2.125rem' },
            fontWeight: 500
          }}
        >
          Dizi Sponsor Kategorileri
        </Typography>
        
        <NavList items={mappedNavData} />
      </Container>
    </main>
  );
}

export { mappedNavData };


// You'll need to implement this function to fetch user view data
// const getUserViewData = async () => {
//   return await getViews({ table: 'sponsorkategori-home' });
// };