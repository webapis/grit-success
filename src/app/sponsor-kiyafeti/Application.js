//'use client'
import React from 'react';
import { Typography, Grid, Container } from '@mui/material';
import SponsorKiyafetView from '@/app/sponsor-kiyafeti/comp/SponsorKiyafetView';
import data from '@/app/sponsor-kiyafeti/sponsorkiyafetiMenu.json'
import Drawer from './comp/drawer'
const arrayData = Object.entries(data)

debugger
export default function Application() {

    return <Drawer> <Container>

        <Typography variant='h4' textAlign='center' sx={{ marginTop: 0 }}>Sponsor Kıyafet</Typography>

        <Grid container gap={1} style={{ display: 'flex', justifyContent: 'center' }}>
            {arrayData.map((m, i) => {
                const topGroup = m[0]
                const categories = Object.entries(m[1])
                return categories.map(m => {
                            const catName = m[0]
                            const content = m[1]
                            return <Grid key={i} item xs={12} md={3}> <SponsorKiyafetView group={topGroup} title={catName} content={content} /></Grid>

                        })
                   
               

                debugger
                // return <Grid key={i} item xs={12} md={3}> <SponsorKiyafetView title={title} content={content} /></Grid>
            })}
        </Grid>
    </Container></Drawer>

}
