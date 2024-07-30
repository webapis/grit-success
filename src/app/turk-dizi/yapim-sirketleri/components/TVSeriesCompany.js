'use client'
import React from 'react';
import {
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CompanyInfo from './CompanyInfo';
import TVSeriesList from './TVSeriesList';

const TVSeriesCompany = ({ company, displayedSeriesCount = 5 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const getDisplayedSeriesCount = () => {
    if (isMobile) return 2;
    if (isTablet) return 3;
    return displayedSeriesCount;
  };

  return (
    <Card 
      sx={{ 
        maxWidth: '100%', 
        margin: 'auto', 
        marginBottom: { xs: 2, sm: 3, md: 4 },
        boxShadow: { xs: 0, sm: 1 },
      }}
    >
      <CardContent sx={{ padding: { xs: 1, sm: 2, md: 3 } }}>
        <CompanyInfo 
          company={company} 
          compact={isMobile || isTablet}
        />
        
        <TVSeriesList
          companyId={company.id}
          tvSeries={company.tvSeries}
          displayedSeriesCount={getDisplayedSeriesCount()}
        />
      </CardContent>
    </Card>
  );
};

export default TVSeriesCompany;