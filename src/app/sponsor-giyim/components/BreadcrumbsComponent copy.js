import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

const BreadcrumbsComponent = ({ urlPath }) => {
  // Split the URL into segments
  const segments = urlPath.split('/');

  return (
    <div style={{ margin: '20px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        {segments.map((segment, index) => {
          const path = segments.slice(0, index + 1).join('/').replace(' ', '-');
          const isLastSegment = index === segments.length - 1;
          const isMixed = /[a-zA-Z]/.test(segment) && /\d/.test(segment); // Check if segment contains both letters and numbers

          return isLastSegment && isMixed ? null : (
            isLastSegment ? (
              <Typography key={index} color="textPrimary">{segment}</Typography>
            ) : (
              <Link key={index} href={`${path}`} color="inherit">
                {segment}
              </Link>
            )
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;