
import React from 'react';
import Image from "./Image";

import { Typography,Chip,Grid, Container,Box } from '@mui/material';


export default function ImageContainer({ filteredData, pageTitle }) {
   debugger
  return   <Container>
      
        <Grid container gap={2} justifyContent="center"
        
        >
             <Typography variant='h4' textAlign="center" sx={{ padding: 5, marginTop:3, width:'100%' }}>{pageTitle}</Typography>
            {filteredData.map(m=>{return {...m.item}}).map((m, a) => {
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
    

    </Container>
    // return <Container>
    //     <Typography variant='h4' textAlign="center" sx={{ padding: 5 }}>{pageTitle}</Typography>
    //     <Grid container gap={2} justifyContent="center"
    //     >{filteredData.sort((a,b)=>b.episode-a.episode).map((m, a) => {
    //         const links = m.productLink.split(',')
    
    //         const title = m.productTitle
    //         debugger
    //         return <Grid item xs={12} lg={5} key={a} >
    //              <div style={{display:'flex',justifyContent:'space-around'}}>
    //              <Chip size='small' label={<Typography variant='caption' textAlign="center"  >{m.season}. sezon <span>{m.episode}. bölüm </span></Typography>}/> 
               
    //              <Typography variant='caption' textAlign="center"   sx={{opacity:0.7}}><span>{m.date} </span></Typography>
    //              </div>
       
    //             <div style={{marginTop:3, width:"100%"}}><Image fotografUrl={m.imageUrl} alt={m.alt}  /></div>
    //             <div style={{ width:'100%' }}>
    //                 { m.productLink.length>0 &&  title.split(',').map((m, i) => <div key={i} style={{ margin: 5 }}><span style={{ textTransform: "uppercase", fontWeight: 700 }}></span> <a href={`${links[i]}`} target='_blank' style={{ textTransform: 'capitalize',fontSize:16 }} rel="nofollow"> {m.toLowerCase()}</a> </div>)}
    //             </div>

    //         </Grid>
    //     })}</Grid>

    // </Container>
}




