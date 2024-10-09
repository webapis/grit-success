import React from 'react';
import { Card, CardContent, CardMedia, Button } from '@mui/material';

const ProductDisplay = ({ product }) => {


  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', marginTop: 2 }}>
      <CardMedia
        component="img"
        image={product.image[0]}
        alt={product.h4}
      />
      <CardContent>
        <Button 
          size="small" 
          color="primary" 
          href={product.pageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
        {product.h5}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDisplay;