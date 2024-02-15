'use client'
import React from 'react';
import Image from "./Image";
import ImageList from '@mui/material/ImageList';
import { Typography, Box,Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
//import Masonry from '@mui/lab/Masonry';

export default function ImageContainer({ filteredData, pageTitle }) {

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const tablet = useMediaQuery(theme.breakpoints.up('sm'));
 
  
    const width = mobile ? 350 : tablet ? 350 : 100
    const columns = mobile ? 1 : tablet ? 3 : 3


   
    return <Box >
        <Typography variant='h4' textAlign="center" sx={{ padding: 5 }}>{pageTitle}</Typography>
        <ImageList cols={1} spacing={2}
        >{filteredData.sort((a,b)=>b.bölüm-a.bölüm).map((m, a) => {
            const links = m.link.split(',')
            const marka = m.marka
            const title = m.title
            return <div key={a} style={{margin:"0 auto"}}>
                 
                 <Chip size='small' label={<Typography variant='caption' textAlign="center"  >{m.sezon}. sezon <span>{m.bölüm}. bölüm </span></Typography>}/>
                <div style={{marginTop:2, width:"100%"}}><Image fotografUrl={m.fotografUrl} alt={m.alt}  /></div>
                <div style={{ width }}>
                    {title.split(',').map((m, i) => <div key={i} style={{ margin: 5 }}><span style={{ textTransform: "uppercase", fontWeight: 700 }}>{marka[i]}:</span> <a href={`${links[i]}`} target='_blank' style={{ textTransform: 'capitalize',fontSize:16 }} rel="nofollow"> {m.toLowerCase()}</a> </div>)}
                </div>

            </div>
        })}</ImageList>

    </Box>
}




