
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SponsorView from '@/app/dizisponsoru/comp/SponsorView';
import data from '@/app/dizi/dizisponsoruMenu.json'
import PersistentDrawerLeft from '../components/drawer';
const arrayData = Object.entries(data)

const mappedData = arrayData.map(m => {
    const content = m[1]
    const href = `/dizi/${content.tag}-dizi-sponsorlari`
    const title = m[0]
    return { ...m, href, content, title }

})

export {mappedData}
export default function Application() {

    return <PersistentDrawerLeft data={mappedData} title="Dizi Sponsoru"><Container>

        <Typography variant='h4' textAlign='center' sx={{ marginTop: 0 }}>Dizi Sponsorları</Typography>

        <Grid container gap={1} style={{ display: 'flex', justifyContent: 'center' }}>
            {mappedData.sort((a, b) => b[1].toplamSponsor - a[1].toplamSponsor).map((m, i) => {
                return <Grid key={i} item xs={12} md={3}> <SponsorView {...m} /></Grid>
            })}
        </Grid>
    </Container>
    </PersistentDrawerLeft>
}

