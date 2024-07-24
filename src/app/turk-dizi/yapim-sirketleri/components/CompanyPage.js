'use client';
import React from 'react';
import {
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import TVSeriesThumbnail from './TVSeriesThumbnail';
import CompanyInfo from './CompanyInfo';

const CompanyPage = ({ company }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
debugger
  return (
    <Container maxWidth="lg" sx={{ py: 4, marginTop:12 }}>
      <CompanyInfo company={company} compact={false} />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
        All TV Series
      </Typography>
      <Grid container spacing={3}>
        {company.tvSeries.map((series) => {
    
      return   <Grid item key={series.id} xs={6} sm={4} md={3} lg={2}>
        <TVSeriesThumbnail series={series} isMobile={isMobile} />
      </Grid>
     
        
})}
      </Grid>
    </Container>
  );
};

export default CompanyPage;