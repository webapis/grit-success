import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';

import deaccent from './deaccent';

export default function SponsorKiyafetView({title ,content,group }) {
    
    const {image,category,gender,total}=content

    return (
        <Card sx={{ maxWidth: 345,textDecoration:'none' }} component={Link} href={`/sponsor-kiyafeti/${deaccent( gender).toLowerCase().replaceAll(' ','-').replaceAll(',','')}/${deaccent(category).toLowerCase().replaceAll(' ','-').replaceAll(',','')}/sayfa/1`} >
            <CardMedia
                sx={{ height: {xs:200,sm:250,md:300}, width:'auto',objectFit:'contain' }}
                image={image[0]}
                title={`${title} Dizi Sponsorları.`}
            />

            <CardContent>
                <Box  style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
       
    
           
            <Typography  variant="h5" component="div" sx={{ textTransform: 'capitalize',fontSize:{xs:16,md:16},width: {xs:200,sm:250,md:300} }}>
                    {title} 
                </Typography>
       
        
            <Typography  variant="caption" component="div" style={{ textTransform: 'capitalize', opacity:0.5,textAlign:'end' }}>
                {total} adet
                </Typography> 
         
         
                </Box>
            </CardContent>
      
        </Card>
    );
}
