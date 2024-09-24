import React from 'react';
import Image from "./Image";
import { Typography, Grid, Container, Box, Chip } from '@mui/material';
import SelectedDiziChip from './SelectedDiziChip';
import ClickableLink from '../../utils/firebase/ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';

export default function ImageContainer({ filteredData, pageTitle, userViewData }) {
  return (
    <Container component="main" maxWidth="lg">
      <Box component="section" my={2}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontSize: { 
              xs: '1.5rem', 
              sm: '2rem', 
              md: '2.5rem' 
            } 
          }}
        >
          {pageTitle}
        </Typography>
        <SelectedDiziChip category={pageTitle} />
      </Box>

      <Grid container spacing={2} component="section" aria-label="TV Series Images">
        {filteredData.map((item) => (
          <Grid item xs={12} md={6} key={item.objectID}>
            <article>
              <Box mb={1}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontSize: { 
                      xs: '1rem', 
                      sm: '1.25rem', 
                      md: '1.5rem' 
                    } 
                  }}
                >
                  {item.TVSeriesTitle} - Season {item.Season}, Episode {item.Episode}
                </Typography>
                <Grid container spacing={1}>
                  {['Date', 'Character', 'Actor'].map((label) => (
                    <Grid item key={label} xs={12} sm={4}>
                      <Chip
                        label={`${label}: ${item[label === 'Date' ? 'Date' : label === 'Character' ? 'CaracterName' : 'FullName']}`}
                        variant="outlined"
                        size="small"
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box position="relative">
                <Image
                  fotografUrl={`/dk-image/${item.ImageUrl}.jpg`}
                  alt={`${item.CaracterName} worn by ${item.FullName} in ${item.TVSeriesTitle}`}
                />
                <Box position="absolute" bottom={4} right={4}>
                  <ViewCount rootPath="dizikiyafeti" linkId={item.ProductLink} userViewData={userViewData} />
                </Box>
              </Box>

              <Box mt={1}>
                <ClickableLink
                  rootPath="dizikiyafeti"
                  brand={item.BrandTitle}
                  linkId={item.ProductLink}
                  title={item.Title.toLowerCase()}
                />
              </Box>
            </article>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}