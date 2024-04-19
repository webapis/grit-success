import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';


export default function KeywordItem({image,label}) {


  return (
    <Card sx={{ display: 'flex' }}>
            <CardMedia
        component="img"
        sx={{ height:56}}
        image={image}
        alt="Live from space album cover"
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
