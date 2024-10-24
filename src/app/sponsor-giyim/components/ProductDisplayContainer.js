import { Grid } from '@mui/material';  // Import MUI's Grid component
import ProductDisplay from './ProductDisplay';

export default function ProductDisplayContainer({ brands }) {
  return (
    <Grid container spacing={2}> {/* Grid container for layout */}

      {brands.map((m, i) => {
    
        const product = m.children[0]; // Assume each brand has children
      
        return (
          <Grid item xs={12} sm={6} md={4} lg={2} key={i}> {/* Responsive grid item */}
            <ProductDisplay product={product} /> {/* Render your product */}
          </Grid>
        );
      })}
    </Grid>
  );
}
