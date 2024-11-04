import { Suspense } from 'react';
import { Grid, Container, Box } from '@mui/material';
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
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          py: { xs: 1, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 3 }
        }}
      >
        <Grid
          container
          spacing={{ xs: 0, sm: 2, md: 3 }}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {filteredTabs.map((item) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              key={item.index}
            >
              <Suspense fallback={<LoadingCard />}>
                <GenderCard item={item} />
              </Suspense>
            </Grid>
          ))}
        </Grid>
      </Container>
    </GenderCardsWrapper>
  );
}