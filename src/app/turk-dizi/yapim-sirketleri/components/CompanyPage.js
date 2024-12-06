// src/components/CompanyPage.js

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MovieIcon from '@mui/icons-material/Movie';

import TVSeriesThumbnail from './TVSeriesThumbnail';
import CompanyInfo from './CompanyInfo';
import BreadcrumbsComponent from '@/app/components/BreadcrumbsComponent';

const CompanyPage = ({ company, companyId }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumb Section */}
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
            { label: 'Yapım Şirketleri', href: '/turk-dizi/yapim-sirketleri' },
            { label: company.name || companyId }
          ]}
        />
      </Paper>

      {/* Main Content */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper'
        }}
      >
        {/* Company Info Section */}
        <Box sx={{ mb: 4 }}>
          <CompanyInfo company={company} />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* TV Series Section */}
        <Box>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 3,
              fontWeight: 600
            }}
          >
            <MovieIcon color="primary" />
            Son TV Dizileri
            <Typography 
              component="span" 
              variant="body2" 
              sx={{ 
                ml: 2,
                backgroundColor: 'primary.main',
                color: 'white',
                px: 1.5,
                py: 0.5,
                borderRadius: 10,
              }}
            >
              {company.tvSeries.length}
            </Typography>
          </Typography>

          <Grid
            container
            spacing={2}
            sx={{
              '& .MuiGrid-item': {
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }
            }}
          >
            {company.tvSeries.map((series, i) => (
              <Grid item key={i} xs={6} sm={4} md={3} lg={2}>
                <TVSeriesThumbnail series={series} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CompanyPage;
