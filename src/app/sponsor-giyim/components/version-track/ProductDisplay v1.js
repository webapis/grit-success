
'use client'
/**
 * React component for displaying product information in a card layout.
 * Utilizes Material-UI components like Card, CardContent, CardMedia, Button, Typography, and Box.
 * Applies conditional border styles based on the product being a link candidate.
 * Supports hover effects for scaling and box-shadow changes.
 * Allows users to learn more about the product by clicking a button that opens the product page in a new tab.
 * @param {Object} product - The product object containing details like id, img, h4, h5, description, pageURL, and isLinkCandidate.
 * @returns {JSX.Element} A styled card displaying the product information.
 */
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ProductDisplay = React.memo(({ product }) => {
  const isDevEnvironment = process.env.NEXT_PUBLIC_ENV === 'dev';
  const borderStyle = {
    border: `1px solid ${product.isLinkCandidate ? 'lightgreen' : 'red'}`,

  };

  const bStyle = {
    borderStyle: isDevEnvironment ? 'solid' : 'none'
  }

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
        },
        ...borderStyle, // Apply conditional border style
        ...bStyle
      }}
      elevation={3}
      role="region"
      aria-labelledby={`product-${product.id}`}
    >
      <CardMedia
        component="img"
        image={product.img}
        alt={product.h4}
        loading="lazy"
        sx={{
          height: 200,
          objectFit: 'cover',
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      />
      <CardContent>
        <Box sx={{ mb: 2 }}>
     
          {isDevEnvironment && <Typography variant="caption" color="text.secondary">
            {product.h4}
          </Typography>}
          {isDevEnvironment && <Typography variant="caption" color="text.secondary">
            {product.title}
          </Typography>}

        </Box>
        <Link href={product.pageURL} passHref target='_blank'>
          <Button
            endIcon={<OpenInNewIcon />}
            size="small"
            color="primary"
            fullWidth
            aria-label={`Learn more about ${product.h4}`}
            sx={{
              textTransform: 'lowercase',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              '&:hover': {
                backgroundColor: 'primary.dark',
                color: 'white'
              },
              '&:focus': {
                outline: '2px solid blue',
              },
              transition: 'background-color 0.3s',
            }}
          >
            {getMainDomain(product.pageURL)}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
});

export default ProductDisplay;

function getMainDomain(url) {
  // Remove protocol and get the hostname
  const hostname = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
      // Remove everything after the first slash
      .split('/')[0];
  
  // Match the main domain pattern
  const matches = hostname.match(/([^.]+\.(?:\w{2,3}\.\w{2}|\w{2,}))$/);
  return matches ? matches[1] : hostname;
}
