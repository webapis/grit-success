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
    const { Name:name, Website, Acyklama,TOTAL:count,TVSeriesTitle,Tag,brandTag,ServiceName,h3 } = item
    const imageName = brandTag ?brandTag: extractSubdomain(Website) 

    return <Card sx={{ width: '100%', border:'1px solid #bdbdbd', borderRadius:4 }} elevation={0}>
    
<Grid container gap={1} style={{display:'flex',justifyContent:'space-between'}}>
<Grid item xs={4}>
<img
            component="img"
            alt={`${imageName} marka resmi`}
           
            height="80"
            style={{objectFit:'contain', borderRadius:5,width:'100%'}}
            src={`/dizi/cover-image/${Tag}.jpg`}
            loading="lazy"
            
        />
        <span style={{fontSize:12}}>Dizi: {TVSeriesTitle}</span>
</Grid>
<Grid item xs={7}>
<img
            component="img"
            alt={`${imageName} marka resmi`}
        
            height="100"
            style={{objectFit:'contain',width:'100%',borderLeft:'1px solid #bdbdbd',borderBottom:'1px solid #bdbdbd', borderRadius:4}}
            src={`/dizi/marka/${imageName}.jpg`}
            loading="lazy"
        />
</Grid>
</Grid>
      
    
    
        <CardContent>
        <Typography gutterBottom variant="body" component='div' style={{textTransform:'lowercase'}}>
             {ServiceName&& ServiceName.trim().replaceAll(',',' ').split(' ').filter(f=>f).map((m,i)=>{return <Chip key={i} size='small' label={m} style={{marginLeft:1}}/>})}
            </Typography>
            <Typography gutterBottom variant="h5" component='div'>
             {name}
            </Typography>
            <Typography gutterBottom variant="caption" component='div' style={{fontWeight:700}}>
             {h3}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {Acyklama}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary" sx={{marginTop:2,textAlign:'end',fontStyle:"italic"}}>
             Bu marka {count} bölümde sponsor oldu.
            </Typography> */}
        </CardContent>
        <CardActions>
            <Button  endIcon={<OpenInNewIcon/>}  component={Link}  target='_blank' href={Website}>
               sponsor web sitesine git
           
            </Button>
        </CardActions>
    </Card>



}