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
      spacing={{ xs: 1, sm: 1, md: 3 }}
      sx={{ 
         padding: { xs: 0, sm: 0, md: 0 },
        maxWidth: '100%',
        margin: '0 auto'
      }}
    >
      <Grid item xs={12} sx={{ mb: 0 }}>
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
          lg={3} 
          key={product.id || index}
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
       
          }}
        > 
          <ProductDisplay product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
