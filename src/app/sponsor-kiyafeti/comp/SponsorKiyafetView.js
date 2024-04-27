import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';

import deaccent from './deaccent';

export default function SponsorKiyafetView({title ,content,group, imageUrl }) {

    
    const {category,gender,total}=content
const keywordint =category.split(',').map((m,i)=>i.toString()).join('') 

    return (
        <Card sx={{ maxWidth: 345,textDecoration:'none' }} component={Link} href={`/sponsor-kiyafeti/${deaccent( gender).toLowerCase().replaceAll(' ','-').replaceAll(',','')}/${deaccent(category).toLowerCase().replaceAll(' ','-').replaceAll(',','')}/${keywordint}/sayfa/1`}  prefetch={true}>
            <CardMedia
                sx={{ height: {xs:200,sm:250,md:250}, width:'auto',objectFit:'contain', borderRadius:2 }}
                image={'https://ik.imagekit.io/mumrjdehaou/' +imageUrl}
                title={`${title} Dizi Sponsorları.`}
            />

            <CardContent>
                <Box  style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
       
    
           
            <Typography  variant="body2" gutterBottom component="div" sx={{ textTransform: 'capitalize', fontFamily:'inherit',width: {xs:200,sm:250,md:200} }}>
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
