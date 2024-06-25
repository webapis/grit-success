import extractSubdomain from './extractSubdomain'
import Image from './Image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import ClickableLink from '../../utils/firebase/ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';

import Chip from '@mui/material/Chip';
export default function SearchResultItem({ item,userViewData }) {
    const { Name: name, Website, Acyklama, TVSeriesTitle, tag, brandTag, ServiceName, h3 } = item
    const imageName = brandTag ? brandTag : extractSubdomain(Website)
    return <Card sx={{ width: '100%', border: '1px solid #bdbdbd', borderRadius: 4 }} elevation={0}>

        <div container gap={0} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>

            <Image
                component="img"
                alt={`${TVSeriesTitle} dizi resmi`}

                height="100"

                src={item.Tag}
                loading="lazy"

            />

            <Image
                component="img"
                alt={`${name} marka resmi`}

                height="100"

                src={`/dizi/marka/${imageName}.jpg`}
                loading="lazy"
            />

        </div>


        <CardContent>
            <span style={{ marginLeft: 10 }}><span style={{ opacity: 0.7 }}>Dizi:</span> {TVSeriesTitle}</span>

        </CardContent>
        <CardContent>
            <Typography gutterBottom variant="h5" component='div'>
                <span style={{ opacity: 0.5 }}>Sponsor:</span>  {name}
            </Typography>
            <Typography gutterBottom variant="body" component='div' style={{ textTransform: 'lowercase' }}>
                {ServiceName && ServiceName.trim().replaceAll(',', ' ').split(' ').filter(f => f).map((m, i) => { return <Chip key={i} size='small' label={m} style={{ marginLeft: 1 }} /> })}
            </Typography>

            <Typography gutterBottom variant="caption" component='div' style={{ fontWeight: 700 }}>
                {h3}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {Acyklama}
            </Typography>
            <ViewCount rootPath={"dizisponsoru"} linkId={Website} userViewData={userViewData} />
        </CardContent>
        <CardActions>

            <ClickableLink rootPath={"dizisponsoru"} clickable={1} title={"sponsor web sitesine git"} linkId={Website} />
        </CardActions>
    </Card>



}