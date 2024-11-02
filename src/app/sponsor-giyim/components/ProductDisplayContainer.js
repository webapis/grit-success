import { Grid,Typography } from '@mui/material';  // Import MUI's Grid component
import ProductDisplay from './ProductDisplay';
import SelectedProductCategoryChip from './SelectedProductCategoryChip';
export default function ProductDisplayContainer({ brands,title, selectedGender }) {
  return (
    <Grid container spacing={2}> {/* Grid container for layout */}
<Grid item xs={12}>

<SelectedProductCategoryChip selectedGender={selectedGender} category={title}/>
</Grid>
      {brands.map(m=>{return {...m,product:m.children[0]}}).sort((a,b)=>b.product.isLinkCandidate-a.product.isLinkCandidate).map(({product}, i) => {
    
       // const product = m.children[0]; // Assume each brand has children
 
        return (
          <Grid item xs={6} sm={6} md={4} lg={2} key={i}> {/* Responsive grid item */}
            <ProductDisplay product={product} /> {/* Render your product */}
          </Grid>
        );
      })}
    </Grid>
  );
}
