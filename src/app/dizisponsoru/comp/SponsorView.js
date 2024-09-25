import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ClickableLink from '../../utils/firebase/ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';
export default function SponsorView({title ,content,href,userViewData }) {

    const {tag,toplamSponsor,Tag,Year}=content

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 170 }}
                image={`/dizi-image/${Tag}.jpg`}
                title={`${title} Dizi Sponsorları.`}
            />

            <CardContent>
                <Box  style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
                <Typography  variant="h5" component="div" style={{ textTransform: 'capitalize' }}>
                    {title}
                </Typography>
                <Typography  variant="body" component="div" style={{ textTransform: 'capitalize' }}>
                    {Year}
                </Typography>
                </Box>
         
                <Typography variant="body2" color="text.secondary" style={{ textTransform: 'capitalize' }}>
                    {title} Dizi Sponsorları.
                </Typography>
                <Typography  variant="caption" color="text.secondary" component="div" style={{ textTransform: 'capitalize',marginTop:4 }}>
                   Sponsor sayısı: {toplamSponsor}
                </Typography>
                <ViewCount rootPath={"dizisponsoru-home"} linkId={href} userViewData={userViewData} />
            </CardContent>
            <CardActions>
    
                <ClickableLink rootPath={"dizisponsoru-home"} clickable={1} title={"sayfaya git"} linkId={href} />
            </CardActions>
        </Card>
    );
}
