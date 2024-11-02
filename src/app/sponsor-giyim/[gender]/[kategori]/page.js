import React from 'react';
import { Typography, List, ListItem, ListItemText, Link, Container } from '@mui/material';
import genderData from '../../components/genderData';
import SponsorGiyimDrawerContainer from '../../components/drawer/SponsorGiyimDrawerContainer';
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent';
import getNavigationData from '../../components/getNavigationData';

// Fetch navigation data asynchronously
const navigationData = await getNavigationData({ URI: 'data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json' });

const getCategoryData = (genderDecoded, kategoriDecoded) => {
  const mainCategory = navigationData.find(item => item.title === genderDecoded);
  if (!mainCategory) return null;

  const kategoriDecodedData = mainCategory.children.find(child => child.title === kategoriDecoded);
  if (!kategoriDecodedData) return null;

  return kategoriDecodedData;
};


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
  const genderDecodedData = getCategoryData(genderDecoded, kategoriDecoded);

  if (!genderDecodedData) {
    return <Typography variant="h6" color="error">Category not found</Typography>;
  }

  return (
    <SponsorGiyimDrawerContainer selectedGender={selectedGender}>
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
    </SponsorGiyimDrawerContainer>
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
