
import React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import category from '@/app/sponsor-kiyafeti/comp/category'
import deaccent from '@/app/sponsor-kiyafeti/comp/deaccent'

import SponsorKiyafetView from '@/app/sponsor-kiyafeti/comp/SponsorKiyafetView';

import PersistentDrawerLeft from '../components/drawer';
import data from '@/app/sponsor-kiyafeti/data/kadin/sponsorkiyafetiMenu.json';

const navData = Object.values(data);



const mappedNavData = navData.map(m => {
    const imageUrl = category[deaccent(m.name.replaceAll(',', '-').replaceAll(' ', '')).toLowerCase()]

    const slug = m.slug
    const keywords = m.keywords
    const keywordint = keywords.sort().map((m, i) => m).join('-')
    const title = m.name
    const href = `/sponsor-kiyafeti/kadin/${slug}/${keywordint}/sayfa/1`
    return { ...m, href, title, imageUrl, href }
})

export {mappedNavData}
export default async function Application() {

    debugger
    return <PersistentDrawerLeft data={mappedNavData} title="Sponsor Kıyafeti"><Container>

        <Typography variant="body1" gutterBottom sx={{ marginBottom: 2, marginTop: 1 }}>Sponsor Kıyafeti- Kategori</Typography>
     
        <Grid container gap={1} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' } }}>
            {mappedNavData.map((m, i) => {
                return <Grid key={i} item xs={5} sm={3} md={2}> <SponsorKiyafetView {...m} /></Grid>
            })}
        </Grid>
    </Container></PersistentDrawerLeft>

}

