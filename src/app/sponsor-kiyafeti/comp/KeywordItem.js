import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link';
import Typography from '@mui/material/Typography';


export default function KeywordItem({image,label,slug,category,initialAllSelection,nextUrl}) {


  return (
    <Card sx={{ display: 'flex' }} component={Link} href={nextUrl}>
      <CardMedia
        component="img"
        sx={{ height:56}}
        image={image}
        alt=""
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h7">
           {label}
          </Typography>
        
        </CardContent>
    
      </Box>
  
    </Card>
  );
}
