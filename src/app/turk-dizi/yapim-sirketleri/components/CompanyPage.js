// src/components/CompanyPage.js

import React from 'react';

import  Container  from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import TVSeriesThumbnail from './TVSeriesThumbnail';
import CompanyInfo from './CompanyInfo';

const CompanyPage = ({ company,companyId }) => {
  return (
    <Container
      sx={{
        py: 4,
        marginTop: 1,
      }}
    >
    
      <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit"  href={`/turk-dizi/yapim-sirketleri`}>
    Yapım Şirketleri
  </Link>

  <Typography sx={{ color: 'text.primary' }}>{companyId}</Typography>
</Breadcrumbs>
      <Box >
      <CompanyInfo company={company} />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
      Son TV Dizileri
      </Typography>

      <Grid
       
       container
       >
         {company.tvSeries.map((series,i) => (
          <Grid item key={i} xs={6} md={2}> <TVSeriesThumbnail key={series.id} series={series} /></Grid>
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
