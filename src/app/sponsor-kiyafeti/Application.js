//'use client'
import React from 'react';
import { promises as fs } from 'fs';
import path from 'path'
import { Typography, Grid, Container } from '@mui/material';
import SponsorKiyafetView from '@/app/sponsor-kiyafeti/comp/SponsorKiyafetView';

import { GenderTabContainer } from './[...slug]/page';
import Drawer from './comp/drawer'


debugger
export default async function Application({gender,value}) {
     const data = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/${gender}/sponsorkiyafetiMenu.json`), 'utf8');
     const pagesData = Object.entries(JSON.parse(data));
    return <Drawer> <Container>

        <Typography variant='h4' textAlign='center' sx={{ marginTop: 0 }}>Sponsor Kıyafeti</Typography>
        {/* <GenderTabContainer value={value} /> */}
        <Grid container gap={1} style={{ display: 'flex', justifyContent: 'center' }}>
            {pagesData.map((m, i) => {
                const topGroup = m[0]
                const categories = Object.entries(m[1])
                return categories.filter(f=>f[0]!=='diğer').filter(f=>f[1].total>20).sort((a,b)=>b[1].total-a[1].total).map(m => {
      
                    const catName = m[0]
                    const content = m[1]
                    return <Grid key={i} item xs={5} sm={3} md={2}> <SponsorKiyafetView group={topGroup} title={catName} content={content} /></Grid>
                })
            })}
        </Grid>
    </Container></Drawer>

}

