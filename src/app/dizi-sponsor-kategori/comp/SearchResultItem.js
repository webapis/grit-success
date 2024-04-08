import extractSubdomain from './extractSubdomain'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { Grid,Chip } from '@mui/material';
export default function SearchResultItem({ item }) {
    debugger
    const { Name:name, Website, Acyklama,TOTAL:count,TVSeriesTitle,tag,brandTag,ServiceName,h3 } = item

    const imageName = brandTag ?brandTag: extractSubdomain(Website) 

    return <Card sx={{ width: '100%', border:'1px solid #bdbdbd', borderRadius:4 }} elevation={0}>
    
<div container gap={0} style={{display:'flex',justifyContent:'space-between',width:'100%'}}>



      


<img
            component="img"
            alt={`${imageName} marka resmi`}
        
            height="100"
          
            src={`/dizi/marka/${imageName}.jpg`}
            loading="lazy"
        />

</div>
      
    
<CardContent>
        <span style={{marginLeft:10}}><span style={{opacity:0.7}}>Dizi:</span> {TVSeriesTitle}</span>
        
        </CardContent> 
        <CardContent>
        <Typography gutterBottom variant="h5" component='div'>
           <span style={{opacity:0.5}}>Sponsor:</span>  {name}
            </Typography>
        <Typography gutterBottom variant="body" component='div' style={{textTransform:'lowercase'}}>
             {ServiceName&& ServiceName.trim().replaceAll(',',' ').split(' ').filter(f=>f).map((m,i)=>{return <Chip key={i} size='small' label={m} style={{marginLeft:1}}/>})}
            </Typography>
       
            <Typography gutterBottom variant="caption" component='div' style={{fontWeight:700}}>
             {h3}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {Acyklama}
            </Typography>
      
        </CardContent>
        <CardActions>
            <Button  endIcon={<OpenInNewIcon/>}  component={Link}   href={Website}>
               sponsor web sitesine git
           
            </Button>
        </CardActions>
    </Card>



}