import React from 'react';
import { 
  Grid, 
  Typography, 
  Container, 
  Box,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import SponsorView from '@/app/dizisponsoru/comp/SponsorView';
import data from '@/app/dizi/dizisponsoruMenu.json';
import PersistentDrawerLeft from '../components/drawer';
import getViews from '../utils/firebase/supabase';

// Process data outside component
const arrayData = Object.entries(data);
const mappedData = arrayData
  .map(([title, content]) => ({
    content,
    href: `/dizi/${content.tag}-dizi-sponsorlari`,
    title
  }))
  .sort((a, b) => new Date(b.content.StartDate) - new Date(a.content.StartDate));

export { mappedData };

export default async function Application() {
  const userViewData = await getViews({ table: 'dizisponsoru-home' });

  return (
    <PersistentDrawerLeft data={mappedData} title="Dizi Sponsoru">
      <Container maxWidth="xl">
        <Box
          sx={{
            py: { xs: 2, md: 4 },
            px: { xs: 1, md: 2 }
          }}
        >
          {/* Header */}
          <Typography 
            variant="h6" 
            component="h6"
            sx={{
              textAlign: 'center',
              mb: { xs: 2, md: 4 },
              fontSize: { xs: '1.75rem', md: '2.125rem' },
              fontWeight: 600
            }}
          >
            Dizi Sponsorları
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
                  <SponsorView
                    userViewData={userViewData}
                    {...item}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </PersistentDrawerLeft>
  );
}