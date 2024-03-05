
'use client'
import React, {useState} from 'react';
import Image from "./Image";
import {useInfiniteHits } from 'react-instantsearch';
import { Typography,Grid, Container, Box,LinearProgress } from '@mui/material';
import { Button } from '@mui/material';
export default function ImageContainer() {
    const { hits,showMore,isLastPage  } = useInfiniteHits();
  const {load,setLoad}=useState(false)

  function handleClickMore (){
    showMore()
    setLoad(true)

  }
    return <Container>
      
        <Grid container gap={2} justifyContent="center"
        >{hits.map((m, a) => {
            const links = m.ProductLink
    
            const title = m.Title
   
            return <Grid item xs={12} lg={5} key={m.objectID} >
                 <div style={{display:'flex', flexDirection:'column',justifyContent:'start'}}>
                 <Typography variant='caption' textAlign="center"   sx={{opacity:0.7,textAlign:'start'}}><span style={{textDecoration:'underline'}}>Dizi</span>: <span>{m.TVSeriesTitle} </span></Typography>
                 <Typography variant='caption' textAlign="center"   sx={{opacity:0.7,textAlign:'start'}}><span style={{textDecoration:'underline'}}>Sezon</span>: {m.Season} <span>Bölüm: {m.Episode} </span></Typography>
                 <Typography variant='caption' textAlign="center"   sx={{opacity:0.7,textAlign:'start'}}><span style={{textDecoration:'underline'}}>Tarih</span>: <span> {m.Date} </span></Typography>
                 <Typography variant='caption' textAlign="center"   sx={{opacity:0.7,textAlign:'start'}}><span style={{textDecoration:'underline'}}>Karakter</span>: <span> {m.CaracterName} </span></Typography>
                 <Typography variant='caption' textAlign="center"   sx={{opacity:0.7,textAlign:'start'}}><span style={{textDecoration:'underline'}}>Oyuncu</span>: <span>{m.FullName} </span></Typography>
                 </div>
              
          
                <div style={{marginTop:3, width:"100%"}}><Image fotografUrl={m.ImageUrl} alt={m.alt}  /></div>
                <div style={{ width:'100%' }}>
                    { <div  style={{ margin: 5 }}><span style={{ textTransform: "uppercase", fontWeight: 700 }}>{m.BrandTitle}</span> <a href={`${links}`} target='_blank' style={{ textTransform: 'capitalize',fontSize:16 }} rel="nofollow"> {title.toLowerCase()}</a> </div>}
                </div>

            </Grid>
        })}</Grid>
        <Box sx={{display:'flex',justifyContent:'center',marginTop:5}}>
            {load ? <LinearProgress/>:  <Button variant='outlined' onClick={handleClickMore} disabled={isLastPage}>
        Fazla Göster
      </Button>}
      

        </Box>

    </Container>
}




