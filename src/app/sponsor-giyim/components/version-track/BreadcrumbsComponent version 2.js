/*
in BreadcrumbsComponent if 

isMixed is true then find the sengment that comes before last segment. this segmetn should not be navigable .
*/
import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const BreadcrumbsComponent = ({ urlPath }) => {
  // Split the URL into segments
  const segments = urlPath.split('/');

  return (
    <div style={{ margin: '20px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link 
          href="/" 
          color="inherit" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center'
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
        </Link>
        {segments.map((segment, index) => {
          // Remove the leading slash if it exists
          const cleanSegment = segment.startsWith('/') ? segment.slice(1) : segment;
          const path = segments.slice(0, index + 1).join('/').replace(' ', '-');
          const isLastSegment = index === segments.length - 1;
          const isMixed = /[a-zA-Z]/.test(cleanSegment) && /\d/.test(cleanSegment);

          return isLastSegment && isMixed ? null : (
            isLastSegment ? (
              <Typography key={index} color="textPrimary">{cleanSegment}</Typography>
            ) : (
              <Link key={index} href={path} color="inherit">
                {cleanSegment}
              </Link>
            )
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;