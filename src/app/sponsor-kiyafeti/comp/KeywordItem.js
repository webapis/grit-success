import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link';
import Typography from '@mui/material/Typography';


export default function KeywordItem({image,label,selected,nextUrl}) {

console.log('label',label)
  return (
    <Link href={nextUrl} style={{textDecoration:"none",}}>
    <Card sx={{ display: 'flex',backgroundColor:selected?"#e8f0fe":"white", color:selected?"#1A73E8":"black",padding:0.5,border:selected?"1px solid #1A73E8":"none",borderRadius:1} }>
      <img
        component="img"
        style={{ height:56}}
        src={`/dizi/keywords/${label}.jpg`}
        alt=""
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h7" >
           {label}
          </Typography>
        
        </CardContent>
    
      </Box>
  
    </Card>
    </Link>
  );
}
