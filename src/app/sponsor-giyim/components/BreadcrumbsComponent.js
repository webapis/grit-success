// BreadcrumbsComponent.js
import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

const BreadcrumbsComponent = ({ urlPath }) => {
  // Split the URL into segments
  const segments = urlPath.split('/');

  return (
    <div style={{ margin: '20px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        {segments.map((segment, index) => {
          const path = segments.slice(0, index + 1).join('/');
          return index === segments.length - 1 ? (
            <Typography key={index} color="textPrimary">{segment}</Typography>
          ) : (
            <Link key={index} href={`/${path}`} color="inherit">
              {segment}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;