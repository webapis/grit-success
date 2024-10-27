import { Grid,Typography } from '@mui/material';  // Import MUI's Grid component
import ProductDisplay from './ProductDisplay';

export default function ProductDisplayContainer({ brands,title }) {
  return (
    <Grid container spacing={2}> {/* Grid container for layout */}
<Grid item xs={12}>
<Typography variant='h5' textAlign='center' sx={{textTransform:'capitalize'}}>{title}</Typography>
</Grid>
      {brands.map((m, i) => {
    
        const product = m.children[0]; // Assume each brand has children
 
        return (
          <Grid item xs={6} sm={6} md={4} lg={2} key={i}> {/* Responsive grid item */}
            <ProductDisplay product={product} /> {/* Render your product */}
          </Grid>
        );
      })}
    </Grid>
  );
}
