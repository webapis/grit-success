
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

import TVSeriesThumbnail from './TVSeriesThumbnail';

const TVSeriesList = ({ companyId, tvSeries, displayedSeriesCount = 4 }) => {

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant={true ? "subtitle1" : "h6"} gutterBottom sx={{ mt: 2, mb: 2 }}>
        Son TV Dizileri
      </Typography>
  
      
        <Grid
        spacing={1}
        container
        sx={{display:'flex',justifyContent:{xs:'center',md:'start'}}}
        >
          {tvSeries.slice(0, displayedSeriesCount).map((series,i) => (
           <Grid item key={i} xs={6} md={2}> <TVSeriesThumbnail key={series.id} series={series} isMobile={true} /></Grid>
          ))}
        </Grid>
      
 
      {tvSeries.length > displayedSeriesCount && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: 2,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-1px',
              left: '10%',
              right: '10%',
              height: '1px',
              bgcolor: 'divider',
            },
          }}
        >
          <Link href={`/turk-dizi/yapim-sirketleri/${companyId}`} passHref legacyBehavior>
            <Button
              component="a"
              variant="text"
              color="primary"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'none',
                  bgcolor: 'transparent',
                },
                fontSize: '0.9rem',
                fontWeight: 'medium',
                pt: 2,
              }}
            >
              Daha fazla göster
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default TVSeriesList;