import React from 'react';
import { Typography, List, ListItem, ListItemText, Link, Container, Box } from '@mui/material';
import genderData from '../../components/genderData';
import BreadcrumbsComponent from '@/app/components/BreadcrumbsComponent';
import getNavigationData from '../../components/getNavigationData';
import {
    Checkroom,
    Palette,
    Style,
    LocalMall,
    Category
} from '@mui/icons-material';

// Fetch navigation data asynchronously
const navigationData = await getNavigationData({ URI: 'data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json' });

const getCategoryData = (genderDecoded, kategoriDecoded) => {
  const mainCategory = navigationData.find(item => item.title.toLowerCase() === genderDecoded.toLowerCase());
  if (!mainCategory) return null;

  const kategoriDecodedData = mainCategory.children.find(child => child.title === kategoriDecoded);
  if (!kategoriDecodedData) return null;

  return kategoriDecodedData;
};

function getIconComponent(title) {
    const lowercaseTitle = title.toLowerCase();
    
    if (lowercaseTitle.includes('elbise')) return <Checkroom />;
    if (lowercaseTitle.includes('renk')) return <Palette />;
    if (lowercaseTitle.includes('stil')) return <Style />;
    if (lowercaseTitle.includes('çanta')) return <LocalMall />;
    
    return <Category />;
}

export  function generateMetadata({ params: { gender, kategori } }) {




  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replaceAll('-',' ');


  return {

      title:   `${capitalize(decodeURI(gender))} | ${capitalize(decodeURI(kategori))} | Dizi Sponsoru Giyim Markalar`

  }
}

export default function Page({ params: { gender, kategori} }) {
  const genderDecoded = decodeURI(gender);
  const kategoriDecoded = decodeURI(kategori).replace('-', ' ').toLowerCase();
  const selectedGender = genderData.find(f => f.urlGender === genderDecoded)?.urlGender;
  debugger
  const genderDecodedData = getCategoryData(genderDecoded.replace('-', ' '), kategoriDecoded);

  if (!genderDecodedData) {
    return <Typography variant="h6" color="error">Category not found</Typography>;
  }

  return (
  
      <Container maxWidth="md" sx={{ py: 4 }}>
        <BreadcrumbsComponent urlPath={`/sponsor-giyim/${genderDecoded}/${kategoriDecoded}`} />

        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
          {genderDecodedData.title}
        </Typography>

        <List sx={{ mt: 3 }}>
          {genderDecodedData.children.map((child) => (
            <ListItem key={child.uid} disablePadding sx={{ mb: 1 }}>
              <Link 
                href={`/sponsor-giyim/${genderDecoded}/${genderDecodedData.title.replace(' ', '-')}/${child.title.replace(' ', '-')}/${child.uid}`} 
                underline="hover" 
                color="primary"
                sx={{ display: 'flex', width: '100%', textDecoration: 'none' }}
              >
                <Box sx={{
                  minWidth: { xs: 24, sm: 28 },
                  mr: { xs: 1.5, sm: 2 },
                  color: 'primary.main',
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {getIconComponent(child.title)}
                </Box>
                <ListItemText 
                  primary={child.title} 
                  secondary={`${child.childrenLength} marka`} 
                  primaryTypographyProps={{ fontWeight: 'medium' }} 
                  secondaryTypographyProps={{ color: 'textSecondary' }}
                />
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
   
  );
}

export async function generateStaticParams() {
  const datas = await getNavigationData({ URI: 'data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json' });
  const paramCandidates = [];

  datas.forEach(currentNav => {
    const gender = currentNav.title.replace(' ', '-').toLowerCase();
    currentNav.children.forEach(child => {
      const kategori = child.title.replace(' ', '-').toLowerCase();
      const id = child.uid;
      paramCandidates.push({ gender, kategori, id });
    });
  });

  return paramCandidates;
}
