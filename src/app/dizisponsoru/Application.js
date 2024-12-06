import React, { cache } from 'react';
import { 
  Grid, 
  Typography, 
  Container, 
  Box
} from '@mui/material';
import SponsorView from '@/app/dizisponsoru/comp/SponsorView';
import data from '@/app/dizi/dizisponsoruMenu.json';
import PersistentDrawerLeft from '../components/drawer';
import getViews from '../utils/firebase/supabase';

// Memoize data processing
const processSponsorData = cache(() => {
  const arrayData = Object.entries(data);
  return arrayData
    .map(([title, content]) => ({
      content,
      href: `/dizi/${content.tag}-dizi-sponsorlari`,
      title
    }))
    .sort((a, b) => new Date(b.content.StartDate) - new Date(a.content.StartDate));
});

// Memoize SponsorView to prevent unnecessary re-renders
const MemoizedSponsorView = React.memo(SponsorView);

export async function generateMetadata() {
  return {
    title: 'Türk Dizi Sponsorları',
    description: 'Türk dizilerinin sponsorları ve detayları'
  };
}

export default async function Application() {
  // Memoized data processing
  const mappedData = processSponsorData();
  
  // Cached view data
  const userViewData = await getViews({ table: 'dizisponsoru-home' });

  return (
 
      <>
        <Box
          sx={{
            py: { xs: 2, md: 4 },
            px: { xs: 1, md: 2 }
          }}
        >
          {/* Header */}
          <Typography 
            sx={{
              textAlign: 'center',
              mb: { xs: 2, md: 2 },
              fontSize: { xs: '1.75rem', md: '2.125rem' },
              fontWeight: 600
            }}
          >
            Türk Dizi Sponsorları
          </Typography>

          {/* Grid Layout */}
          <Grid 
            container 
            spacing={{ xs: 2, md: 3 }}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {mappedData.map((item, index) => (
              <Grid 
                item 
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item.content.tag || index}
                sx={{
                  display: 'flex',
                  alignItems: 'stretch'
                }}
              >
                <Box sx={{ 
                  width: '100%',
                  display: 'flex',
                  '& > *': { // Make SponsorView fill the container
                    flex: 1
                  }
                }}>
                  <MemoizedSponsorView
                    userViewData={userViewData}
                    {...item}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </>

  );
}

// Export mapped data if needed elsewhere
export { processSponsorData };