import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import Link from 'next/link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
export default function RootComponent({title , url}) {
  

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 170 }}
                image={url}
                title={`${title} Dizi Kıyafetleri Oyuncuların Giydiği Kıyafetler.`}
            />

            <CardContent>
                <Box  style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
                <Typography  variant="h5" component="div" style={{ textTransform: 'capitalize' }}>
                    {title}
                </Typography>
            
                </Box>
         
                <Typography variant="body2" color="text.secondary" style={{ textTransform: 'capitalize' }}>
                    {title} Dizi Kıyafetleri Oyuncuların Giydiği Kıyafetler.
                </Typography>
            </CardContent>
            <CardActions>
                <Button endIcon={<OpenInNewIcon/>} size="small" component='a' href={url} >sayfaya git</Button>
            </CardActions>
        </Card>
    );
}
