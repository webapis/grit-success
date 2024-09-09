import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ClickableLink from '../../utils/firebase/ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';
export default function Diziview({title ,content,href,userViewData }) {
    const {ImageUrl,Date,tag}=content

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 170 }}
                image={`https://ik.imagekit.io/occchd2yc/dk-image/${ImageUrl}.jpg`}
                title={`${title} Dizi Kıyafetleri Oyuncuların Giydiği Kıyafetler.`}
            />

            <CardContent>
                <Box  style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
                <Typography  variant="h5" component="div" style={{ textTransform: 'capitalize' }}>
                    {title}
                </Typography>
                <Typography  variant="caption" display="block" style={{textAlign:'end',opacity:0.5}} >
                    {Date}
                </Typography>
                </Box>
         
                <Typography variant="body2" color="text.secondary" style={{ textTransform: 'capitalize' }}>
                    {title} Dizi Kıyafetleri Oyuncuların Giydiği Kıyafetler.
                </Typography>

                <ViewCount rootPath={"dizikiyafeti-home"} linkId={href} userViewData={userViewData} />
            </CardContent>
            <CardActions>
          
                <ClickableLink rootPath={"dizikiyafeti-home"} clickable={1} title={"sayfaya git"} linkId={href} />
            </CardActions>
        </Card>
    );
}
