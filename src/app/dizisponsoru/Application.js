
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SponsorView from '@/app/dizisponsoru/comp/SponsorView';
import data from '@/app/dizi/dizisponsoruMenu.json'
import PersistentDrawerLeft from '../components/drawer';
import getViews from '../utils/firebase/supabase';
const arrayData = Object.entries(data)

const mappedData = arrayData.map(m => {
    const content = m[1]
    const href = `/dizi/${content.tag}-dizi-sponsorlari`
    const title = m[0]
    debugger
    return { ...m, href, content, title }

}).sort((a, b) => new Date(b[1].StartDate) - new Date(a[1].StartDate))
debugger
export {mappedData}
export default async  function Application() {
    const userViewData = await getViews({table:'dizisponsoru-home'})

    return <PersistentDrawerLeft data={mappedData} title="Dizi Sponsoru"><Container>

        <Typography variant='h4' textAlign='center' sx={{ marginTop: 0 }}>Dizi Sponsorları</Typography>

        <Grid container gap={1} style={{ display: 'flex', justifyContent: 'center' }}>
            {mappedData.map((m, i) => {
                return <Grid key={i} item xs={12} md={3}> <SponsorView  userViewData={userViewData} {...m} /></Grid>
            })}
        </Grid>
    </Container>
    </PersistentDrawerLeft>
}

