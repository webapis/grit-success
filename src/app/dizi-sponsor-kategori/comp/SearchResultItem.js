import extractSubdomain from './extractSubdomain'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Chip from '@mui/material/Chip';

import ClickableLink from '../../utils/firebase/ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';
export default function SearchResultItem({ item,userViewData }) {


    debugger
    const { Name: name, Website, Acyklama, TOTAL: count, TVSeriesTitle, tag, brandTag, ServiceName, h3, duplicateTitles } = item

    const imageName = brandTag ? brandTag : extractSubdomain(Website)

    return <Card sx={{ width: '100%', border: '1px solid #bdbdbd', borderRadius: 4 }} elevation={0}>

        <div container gap={0} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

            <img
                component="img"
                alt={`${imageName} marka resmi`}

                height="100"
                style={{ maxWidth: 250 }}
                src={`${process.env.NEXT_PUBLIC_IMG_HOST}/dizi/marka/${imageName}.jpg`}
                loading="lazy"
            />

        </div>


        <CardContent>

        </CardContent>
        <CardContent>
            <Typography gutterBottom variant="h5" component='div'>
                <span style={{ opacity: 0.5 }}></span>  {name}
            </Typography>
            <Typography gutterBottom variant="body" component='div' style={{ textTransform: 'lowercase' }}>
                {ServiceName && ServiceName.trim().replaceAll(',', ' ').split(' ').filter(f => f).map((m, i) => { return <Chip key={i} size='small' label={m} style={{ marginLeft: 1, textTransform: 'capitalize' }} /> })}
            </Typography>
            <Typography gutterBottom variant="caption" component='div' style={{ fontWeight: 700 }}>
                {h3}
            </Typography>

            <Typography variant="body1" color="text.secondary">
                {Acyklama}
            </Typography>

        </CardContent>
        <CardContent >
            <Typography variant="body" color="text.secondary" sx={{ textAlign: 'end', width: '100%' }}>Sponsor olduğu diziler: {' '}</Typography>
            <Typography variant="body" color="text.secondary" sx={{ textAlign: 'end' }}> {duplicateTitles ? duplicateTitles.filter(f => f).map((m, i) => { return <Chip key={i} size='small' label={m} style={{ marginLeft: 1 }} /> }) : <Chip size='small' label={TVSeriesTitle} sx={{ marginLeft: 1, textTransform: 'capitalize' }} />} </Typography>
            <ViewCount rootPath={"sponsorkategori"} linkId={Website} userViewData={userViewData}/>
        </CardContent>
        <CardActions>


            <ClickableLink rootPath={"sponsorkategori"} clickable={1} title={"sponsor web sitesine git"} linkId={Website} />
        </CardActions>
    </Card>



}