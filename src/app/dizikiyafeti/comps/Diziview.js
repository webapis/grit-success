import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//        image={`./dizi/cover-image/${title}.jpg`}
export default function Diziview({title ,content }) {
    const {ImageUrl}=content

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 170 }}
                image={ImageUrl}
                title={`${title} Dizi Kıyafetleri Oyuncuların Giydiği Kıyafetler.`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ textTransform: 'capitalize' }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ textTransform: 'capitalize' }}>
                    {title} Dizi Kıyafetleri Oyuncuların Giydiği Kıyafetler.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">sayfaya git</Button>
            </CardActions>
        </Card>
    );
}
