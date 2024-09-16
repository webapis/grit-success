
import React from 'react';
import {
  Card,
  CardContent,

} from '@mui/material';
import CompanyInfo from './CompanyInfo';
import TVSeriesList from './TVSeriesList';

const TVSeriesCompany = ({ company, displayedSeriesCount = 5 }) => {



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
          compact={true}
        />
        
        <TVSeriesList
          companyId={company.id}
          tvSeries={company.tvSeries}
          displayedSeriesCount={4}
        />
      </CardContent>
    </Card>
  );
};

export default TVSeriesCompany;