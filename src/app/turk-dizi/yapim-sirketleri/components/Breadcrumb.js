import React from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';

const Breadcrumb = ({ company }) => {
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

        <Link 
          href="/turk-dizi"
          style={{
            color: 'inherit',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Türk Dizileri
        </Link>
        
        <Link 
          href="/turk-dizi/yapim-sirketleri"
          style={{
            color: 'inherit',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Yapım Şirketleri
        </Link>

        <Typography 
          sx={{ 
            color: 'text.primary',
            fontWeight: 500 
          }}
        >
          {company.name}
        </Typography>
      </MuiBreadcrumbs>
    </Paper>
  );
};

export default Breadcrumb; 