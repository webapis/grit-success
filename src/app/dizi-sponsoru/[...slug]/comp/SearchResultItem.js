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
    const { Name:name, Website, Acyklama,TOTAL:count } = item
    const imageName = Website ? extractSubdomain(Website) : ""
    return <Card sx={{ maxWidth: 345 }}>
        <div style={{display:'flex',alignItems:'start'}}>
        <img
            component="img"
            alt={`${imageName} marka resmi`}
            width="90"
            height="110"
            style={{objectFit:'contain'}}
            src={`/dizi/cover-image/yali-capkini.jpg`}
        />
          <img
            component="img"
            alt={`${imageName} marka resmi`}
            width="200"
            height="100"
            style={{objectFit:'contain'}}
            src={`/dizi/marka/${imageName}.jpg`}
        />
        </div>
    
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