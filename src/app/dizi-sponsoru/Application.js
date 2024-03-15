'use client'
import React from 'react';
import { Typography, Grid, Container } from '@mui/material';
import SponsorView from '@/app/dizi-sponsoru/[...slug]/comp/SponsorView';
import data from '@/app/dizi-sponsoru/page-data/dizisponsoruMenu.json'
//import Drawer from './drawer/index'
const arrayData = Object.entries(data)


export default function Application() {

    return <Container >

        <Typography variant='h4' textAlign='center' sx={{ marginTop: 2 }}>Dizi Sponsorları</Typography>


        <Grid container gap={1} style={{display:'flex',justifyContent:'center'}}>
            {arrayData.sort((a,b)=> b[1].toplamSponsor-a[1].toplamSponsor).map((m,i) => {
                const title = m[0]
                const content = m[1]
                return <Grid key={i} item xs={12} md={3}> <SponsorView title={title} content={content} /></Grid>

            })}
        </Grid>




    </Container>
  
}

