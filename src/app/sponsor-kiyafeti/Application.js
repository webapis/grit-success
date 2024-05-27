//'use client'
import React from 'react';
import { promises as fs } from 'fs';
import path from 'path'
import  Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import  Container from '@mui/material/Container';
import category from '@/app/sponsor-kiyafeti/comp/category'
import deaccent from '@/app/sponsor-kiyafeti/comp/deaccent'
//import Box from '@mui/material/Box';
import SponsorKiyafetView from '@/app/sponsor-kiyafeti/comp/SponsorKiyafetView';

//import { GenderTabContainer } from './[...slug]/page';
import Drawer from './comp/drawer'

export default async function Application({gender,value}) {
     const data = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/${gender}/sponsorkiyafetiMenu.json`), 'utf8');
     const pagesData = Object.values(JSON.parse(data));
     debugger
    return <Drawer slug={[]}><Container> 

        <Typography variant="body1" gutterBottom  sx={{ marginBottom:2,marginTop:1 }}>Sponsor Kıyafeti- Kategori</Typography>
        {/* <GenderTabContainer value={value} /> */}
        <Grid container gap={1} sx={{ display: 'flex', justifyContent:{xs:'center',md:'start'} }}>
            {pagesData.filter(f=>f.total>50).map((m, i) => {
                    const catName = m.name
                 
                    const imageUrl = category[deaccent(catName.replaceAll(',','-').replaceAll(' ','')).toLowerCase()]
                    const total=m.total
                    const slug=m.slug
           console.log(deaccent(catName.replaceAll(',','-').replaceAll(' ','')).toLowerCase())
                return <Grid key={i} item xs={5} sm={3} md={2}> <SponsorKiyafetView slug={slug} keywords={m.keywords}  title={catName} total={total} imageUrl={imageUrl} /></Grid>
                
            })}
        </Grid>
    </Container></Drawer>

}

