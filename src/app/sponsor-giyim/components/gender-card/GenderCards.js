import { Suspense } from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import { getFilteredTabs } from './utils';
import dynamic from 'next/dynamic';
import genderData from '../genderData';
import { LoadingCard } from './LoadingCard';

const GenderCard = dynamic(() => import('./GenderCard.client'), {
  ssr: true,
});

const GenderCardsWrapper = dynamic(() => import('./GenderCardsWrapper.client'), {
  ssr: true,
});

const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'dev';

export default function GenderCards() {
  const filteredTabs = getFilteredTabs(genderData, isDevelopment);

  return (
    <GenderCardsWrapper>
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: { xs: 0, sm: 2 },
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          mb: 4
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 3, sm: 4, md: 5 },
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >


          {/* Cards Grid */}
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {filteredTabs.map((item) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={item.index}
                sx={{
                  display: 'flex',
                }}
              >
                <Suspense fallback={<LoadingCard />}>
                  <Box
                    sx={{
                      width: '100%',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <GenderCard item={item} />
                  </Box>
                </Suspense>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </GenderCardsWrapper>
  );
}