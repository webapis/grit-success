'use client'
import React from 'react';
import { Typography, Grid, Container } from '@mui/material';
import Diziview from '@/app/dizikiyafeti/comps/Diziview';
import data from '@/app/dizikiyafeti/page-data/dizikiyafetiMenu.json'
const arrayData = Object.entries(data)


export default function Application() {

    return <Container>

        <Typography variant='h5' textAlign='center' sx={{ marginTop: 2 }}>Türk dizilerinde giyilen marka kıyafetler</Typography>


        <Grid container gap={1} style={{display:'flex',justifyContent:'center'}}>
            {arrayData.map(m => {
                const title = m[0]
                const content = m[1]
                debugger
                return <Grid item xs={12} md={3}> <Diziview title={title} content={content} /></Grid>

            })}
        </Grid>









    </Container>

}


