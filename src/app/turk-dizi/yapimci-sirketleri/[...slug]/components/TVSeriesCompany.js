import React from 'react';
import {
  Card,
  CardContent,
} from '@mui/material';
import CompanyInfo from './CompanyInfo'; // Import the CompanyInfo component
import TVSeriesList from './TVSeriesList';

const TVSeriesCompany = ({ company, displayedSeriesCount = 5 }) => {
  return (
    <Card sx={{ maxWidth: '100%', margin: 'auto', marginBottom: 4 }}>
      <CardContent>
        <CompanyInfo company={company} compact={true} />

        <TVSeriesList
          companyId={company.id}
          tvSeries={company.tvSeries}
          displayedSeriesCount={displayedSeriesCount}
        />
      </CardContent>
    </Card>
  );
};

export default TVSeriesCompany;