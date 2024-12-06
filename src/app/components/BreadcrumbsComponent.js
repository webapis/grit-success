import React from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';

const BreadcrumbsComponent = ({ urlPath }) => {
  const segments = urlPath.split('/').filter(Boolean);

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        mb: 3, 
        backgroundColor: 'background.paper',
        borderRadius: 2
      }}
    >
      <MuiBreadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-ol': {
            alignItems: 'center',
          },
          '& .MuiBreadcrumbs-li': {
            display: 'flex',
            alignItems: 'center',
          }
        }}
      >
        <Link 
          href="/" 
          style={{
            color: 'inherit',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Ana Sayfa
        </Link>
        {segments.map((segment, index) => {
          const cleanSegment = segment.replace(/-/g, ' ');
          const path = `/${segments.slice(0, index + 1).join('/')}`;
          const isLastSegment = index === segments.length - 1;

          if (/[a-zA-Z]/.test(segment) && /\d/.test(segment)) {
            return null;
          }

          return isLastSegment ? (
            <Typography 
              key={index} 
              sx={{ 
                color: 'text.primary',
                fontWeight: 500 
              }}
            >
              {cleanSegment}
            </Typography>
          ) : (
            <Link 
              key={index} 
              href={path} 
              style={{
                color: 'inherit',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {cleanSegment}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Paper>
  );
};

export default BreadcrumbsComponent;