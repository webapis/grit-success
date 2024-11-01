
//before outlining container isLinkCandidate
/*
object passed as a props to ProductDisplay has a property named  isLinkCandidate. if isLinkCandidate is flase 
i want draw a thin visible border with a red color if isLinkCandidate is true this border's color should be
light green. also this border should be visible only if process.env.NEXT_PUBLIC_ENV === 'dev'
*/
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Using React.memo for performance optimization
const ProductDisplay = React.memo(({ product }) => {
  return (
    <Card 
      sx={{
        maxWidth: 345,
        margin: 'auto',
        marginTop: 3,
        boxShadow: 3,
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        }
      }}
      elevation={3}
      role="region" // Improve accessibility
      aria-labelledby={`product-${product.id}`} // Dynamic ID for better accessibility
    >
      <CardMedia
        component="img"
        image={product.img}
        alt={product.h4}
        loading="lazy" // Lazy load the image for better performance
        sx={{
          height: 200,
          objectFit: 'cover',
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      />
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography id={`product-${product.id}`} variant="h6" component="h2" gutterBottom>
            {/* {product.h4} */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </Box>
        <Link href={product.pageURL} passHref target='_blank'>
          <Button 
           endIcon={<OpenInNewIcon/>}
            size="small"
            color="primary" 
    
            fullWidth
            aria-label={`Learn more about ${product.h4}`}
            sx={{
              textTransform:'lowercase',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              '&:hover': {
                backgroundColor: 'primary.dark',
                color:'white'
              },
              '&:focus': {
                outline: '2px solid blue', // Visible focus state
              },
              transition: 'background-color 0.3s',
            }} 
          >
            {product.h5.replace('www.','')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
});

export default ProductDisplay;
