// src/components/CompanyPage.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TVSeriesThumbnail from './TVSeriesThumbnail';
import CompanyInfo from './CompanyInfo';

const CompanyPage = ({ company }) => {
  return (
    <Container
      sx={{
        py: 4,
        marginTop: 12,
 
  
      }}
    >
      <Box >
      <CompanyInfo company={company} />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
        All TV Series
      </Typography>

{company.tvSeries.map((series) => (
        <TVSeriesThumbnail key={series.id} series={series} />
      ))}
</Box>
  
    </Container>
  );
};

export default CompanyPage;
