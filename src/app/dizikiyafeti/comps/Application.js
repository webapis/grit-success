
import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Diziview from '@/app/dizikiyafeti/comps/Diziview';
import data from '@/app/dizikiyafeti/page-data/dizikiyafetiMenu.json'

import PersistentDrawerLeft from '@/app/components/drawer';
const arrayData = Object.entries(data)



const mappedNavData = arrayData.map(m => {
    const title = m[0]
    const content = m[1]
    const href = `/dizikiyafeti/${content.tag}-dizi-kiyafetleri`
    return { ...m, title, content, href }
})

export {mappedNavData}
export default function Application() {

    return <PersistentDrawerLeft data={mappedNavData} title="Dizi Kıyafeti"> <Container>
        <Typography variant='h4' textAlign='center' sx={{ marginTop: 0 }}>Dizi kıyafetleri</Typography>
        <Grid container gap={1} style={{ display: 'flex', justifyContent: 'center' }}>
            {mappedNavData.sort((a, b) => b[1].Time - a[1].Time).map((m, i) => {

                return <Grid key={i} item xs={12} md={3}> <Diziview {...m} /></Grid>

            })}
        </Grid>
    </Container>
    </PersistentDrawerLeft>
}


