'use client'
import React from 'react';
import { Typography, Grid, Container } from '@mui/material';
import Diziview from '@/app/dizikiyafeti/comps/Diziview';
import data from '@/app/dizikiyafeti/page-data/dizikiyafetiMenu.json'
import Drawer from './drawer/index'
const arrayData = Object.entries(data)


export default function Application() {

    return <Drawer> <Container >

        <Typography variant='h4' textAlign='center' sx={{ marginTop: 2 }}>Dizi kıyafetleri</Typography>


        <Grid container gap={1} style={{display:'flex',justifyContent:'center'}}>
            {arrayData.sort((a,b)=>b[1].Time-a[1].Time).map((m,i) => {
                const title = m[0]
                const content = m[1]
           
                return <Grid key={i} item xs={12} md={3}> <Diziview title={title} content={content} /></Grid>

            })}
        </Grid>









    </Container>
    </Drawer>
}


