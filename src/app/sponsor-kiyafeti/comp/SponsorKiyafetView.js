import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
export default function SponsorKiyafetView({title ,content,group }) {
    debugger
    const {image}=content

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 170 }}
                image={image[0]}
                title={`${title} Dizi Sponsorları.`}
            />

            <CardContent>
                <Box  style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
           
                <Typography  variant="h5" component="div" style={{ textTransform: 'capitalize' }}>
                    {title}
                </Typography>
                <Typography  variant="caption" component="div" style={{ textTransform: 'capitalize', opacity:0.5 }}>
                    {group}
                </Typography>
                </Box>
{/*          
                <Typography variant="body2" color="text.secondary" style={{ textTransform: 'capitalize' }}>
                    {title} Dizi Sponsorları.
                </Typography> */}
             
            </CardContent>
            <CardActions>
                <Button endIcon={  <OpenInNewIcon/>} component={Link} href={''} target='_blank'>
                sayfaya git
                  
                </Button>
               
            </CardActions>
        </Card>
    );
}
