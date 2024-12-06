import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CompanyInfo from './CompanyInfo';
import TVSeriesList from './TVSeriesList';

const TVSeriesCompany = ({ company, displayedSeriesCount = 5 }) => {
  return (
    <Box>

      <Card 
        elevation={2}
        sx={{ 
          maxWidth: '100%', 
          margin: 'auto', 
          marginBottom: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 8,
          },
          bgcolor: {
            light: '#fff',
            dark: 'rgba(255, 255, 255, 0.05)'
          }
        }}
      >
        <CardContent 
          sx={{ 
            padding: { xs: 2, sm: 3, md: 4 },
            '&:last-child': { paddingBottom: { xs: 2, sm: 3, md: 4 } }
          }}
        >
          <Box sx={{ mb: 3 }}>
            <CompanyInfo 
              company={company} 
              compact={true}
            />
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <TVSeriesList
            companyId={company.id}
            tvSeries={company.tvSeries}
            displayedSeriesCount={displayedSeriesCount}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TVSeriesCompany;