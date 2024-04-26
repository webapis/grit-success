//'use client'
import React from 'react';
import { promises as fs } from 'fs';
import path from 'path'
import { Typography, Grid, Container, Box } from '@mui/material';
import SponsorKiyafetView from '@/app/sponsor-kiyafeti/comp/SponsorKiyafetView';

import { GenderTabContainer } from './[...slug]/page';
import Drawer from './comp/drawer'



export default async function Application({gender,value}) {
     const data = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/${gender}/sponsorkiyafetiMenu.json`), 'utf8');
     const pagesData = Object.entries(JSON.parse(data));
    return <Drawer slug={[]}><Container maxWidth> <Box sx={{width:'50%'}}>

        <Typography variant='h4' textAlign='center' sx={{ marginBottom:2,marginTop:1 , fontSize:{ xs:20,sm:30} }}>Sponsor Kıyafeti- Kategori</Typography>
        {/* <GenderTabContainer value={value} /> */}
        <Grid container gap={1}  >
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
    </Box></Container></Drawer>

}

