// src/components/CompanyPage.js

import React from 'react';
import { Container, Typography, Box,Grid,Breadcrumbs,Link } from '@mui/material';
import TVSeriesThumbnail from './TVSeriesThumbnail';
import CompanyInfo from './CompanyInfo';
import TopNavigation from '@/app/components/TopNavigation';
const CompanyPage = ({ company,companyId }) => {
  return (
    <Container
      sx={{
        py: 4,
        marginTop: 1,
 
  
      }}
    >
      <TopNavigation selected={4}/>
      <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit"  href={`/turk-dizi/yapim-sirketleri`}>
    Yapım Şirketleri
  </Link>

  <Typography sx={{ color: 'text.primary' }}>{companyId}</Typography>
</Breadcrumbs>
      <Box >
      <CompanyInfo company={company} />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
        All TV Series
      </Typography>

      <Grid
       
       container
       >
         {company.tvSeries.map((series,i) => (
          <Grid item key={i} > <TVSeriesThumbnail key={series.id} series={series} /></Grid>
         ))}
       </Grid>
</Box>
<Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit"  href={`/turk-dizi/yapim-sirketleri`}>
    Yapım Şirketleri
  </Link>

  <Typography sx={{ color: 'text.primary' }}>{companyId}</Typography>
</Breadcrumbs>
    </Container>
  );
};

export default CompanyPage;
