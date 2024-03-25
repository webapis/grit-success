'use client'
import React from 'react';
import { Typography, Grid, Container } from '@mui/material';
import SponsorView from '@/app/dizi-sponsoru/comp/SponsorView';
import data from '@/app/dizi/dizisponsoruMenu.json'
import Drawer from './comp/drawer'
const arrayData = Object.entries(data)


export default function Application() {

    return <Drawer><Container>

        <Typography variant='h4' textAlign='center' sx={{ marginTop: 0}}>Dizi Sponsorları</Typography>

        <Grid container gap={1} style={{display:'flex',justifyContent:'center'}}>
            {arrayData.sort((a,b)=> b[1].toplamSponsor-a[1].toplamSponsor).map((m,i) => {
                const title = m[0]
                const content = m[1]
                return <Grid key={i} item xs={12} md={3}> <SponsorView title={title} content={content} /></Grid>
            })}
        </Grid>
    </Container>
    </Drawer>
}

