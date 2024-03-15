import extractSubdomain from './extractSubdomain'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import Link from 'next/link';
export default function SearchResultItem({ item }) {
    debugger
    const { Name:name, Website, Acyklama,TOTAL:count,TVSeriesTitle,Tag,brandTag } = item
    const imageName = brandTag ?brandTag: extractSubdomain(Website) 

    return <Card sx={{ width: '100%', border:'1px solid #bdbdbd', borderRadius:4 }} elevation={0}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{width:50,textAlign:'center',marginLeft:3, padding:5}}>
        <img
            component="img"
            alt={`${imageName} marka resmi`}
            width="60"
            height="80"
            style={{objectFit:'contain', borderRadius:5}}
            src={`/dizi/cover-image/${Tag}.jpg`}
            loading="lazy"
            
        />
        <span style={{fontSize:12}}>{TVSeriesTitle}</span>
        </div>
   
          <img
            component="img"
            alt={`${imageName} marka resmi`}
            width="200"
            height="100"
            style={{objectFit:'contain'}}
            src={`/dizi/marka/${imageName}.jpg`}
            loading="lazy"
        />
        </div>
    
        <CardContent>
            <Typography gutterBottom variant="h5" component={Link} href={Website} target='_blank'>
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
            <Button  endIcon={<OpenInNewIcon/>}  component={Link}  target='_blank' href={Website}>
                web sitesine git
           
            </Button>
        </CardActions>
    </Card>



}