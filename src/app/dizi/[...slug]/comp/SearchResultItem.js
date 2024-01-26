import extractSubdomain from '../../../utils/extractSubdomain'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
export default function SearchResultItem({ item }) {
    const { "Row Labels": name, Website, ServiceName, Acyklama,"Count of EpisodeNumber":count } = item
    const imageName = Website ? extractSubdomain(Website) : ""
    return <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            alt="green iguana"
            width="200"
            image={`/dizi/marka/${imageName}.jpg`}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {Acyklama}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{marginTop:2,textAlign:'end',fontStyle:"italic"}}>
             Bu marka {count} bölümde sponsor oldu.
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton component={Link} variant="contained" target='_blank' href={Website}>
                web sitesine git
                <OpenInNewIcon />
            </IconButton>
        </CardActions>
    </Card>



}