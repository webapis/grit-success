import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ClickableLink from '../../utils/firebase/ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';
export default function SponsorKategoriView({ kategori, total, keyword, userViewData, href }) {


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 170 }}
                image={`${process.env.NEXT_PUBLIC_IMG_HOST}/dizi/sponsor-kategori/${keyword}.jpg`}
                title={`${kategori} Dizi sponsoru`}
            />

            <CardContent>
                <Box style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div" style={{ textTransform: 'capitalize' }}>
                        {kategori}{total}
                    </Typography>

                </Box>

                <Typography variant="body2" color="text.secondary" style={{ textTransform: 'capitalize' }}>
                    {kategori} Dizi Sponsorları.
                </Typography>
                <ViewCount rootPath={"sponsorkategori-home"} linkId={href} userViewData={userViewData} />
            </CardContent>
            <CardActions>
                <ClickableLink rootPath={"sponsorkategori-home"} clickable={1} title={"sayfaya git"} linkId={href} />
            </CardActions>
        </Card>
    );
}
