import { Grid,Typography } from '@mui/material';  // Import MUI's Grid component
import ProductDisplay from './ProductDisplay';
import SelectedProductCategoryChip from './SelectedProductCategoryChip';
import { useMemo } from 'react';

export default function ProductDisplayContainer({ brands, title, selectedGender }) {
  // Memoize the transformed and sorted brands array
  const sortedProducts = useMemo(() => {
    return brands
      .map(brand => ({
        ...brand,
        product: brand.children[0]
      }))
      .sort((a, b) => b.product.isLinkCandidate - a.product.isLinkCandidate);
  }, [brands]);

  return (
    <Grid 
      container 
      spacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ 
        padding: { xs: 1, sm: 2, md: 3 },
        maxWidth: '100%',
        margin: '0 auto'
      }}
    >
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 2,
            fontWeight: 500,
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          {title}
        </Typography>
        <SelectedProductCategoryChip 
          selectedGender={selectedGender} 
          category={title}
        />
      </Grid>

      {sortedProducts.map(({ product }, index) => (
        <Grid 
          item 
          xs={6} 
          sm={4} 
          md={3} 
          lg={2} 
          key={product.id || index}
          sx={{ 
            display: 'flex',
            justifyContent: 'center'
          }}
        > 
          <ProductDisplay product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
