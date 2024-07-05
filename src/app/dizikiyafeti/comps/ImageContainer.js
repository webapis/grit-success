

import React from 'react';
import Image from "./Image";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import SelectedDiziChip from './SelectedDiziChip';
import ClickableLink from '../../utils/firebase/ClickableLink';
import ViewCount from '../../utils/firebase/ViewCount';

export default function ImageContainer({ filteredData, pageTitle,userViewData }) {
 
    return <>

        <Container>

            <SelectedDiziChip category={pageTitle} />
            <Grid container gap={2} justifyContent="center"

            >

                {/* <Typography variant='h4' textAlign="center" sx={{  width:'100%' }}>{pageTitle}</Typography> */}
                {filteredData.map((m, a) => {
                    const links = m.ProductLink

                    const title = m.Title

                    return <Grid item xs={12} lg={5} key={m.objectID} >
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                            <Typography variant='caption' textAlign="center" sx={{ opacity: 0.7, textAlign: 'start' }}><span style={{ textDecoration: 'underline' }}>Dizi</span>: <span>{m.TVSeriesTitle} </span></Typography>
                            <Typography variant='caption' textAlign="center" sx={{ opacity: 0.7, textAlign: 'start' }}><span style={{ textDecoration: 'underline' }}>Sezon</span>: {m.Season} <span>Bölüm: {m.Episode} </span></Typography>
                            <Typography variant='caption' textAlign="center" sx={{ opacity: 0.7, textAlign: 'start' }}><span style={{ textDecoration: 'underline' }}>Tarih</span>: <span> {m.Date} </span></Typography>
                            <Typography variant='caption' textAlign="center" sx={{ opacity: 0.7, textAlign: 'start' }}><span style={{ textDecoration: 'underline' }}>Karakter</span>: <span> {m.CaracterName} </span></Typography>
                            <Typography variant='caption' textAlign="center" sx={{ opacity: 0.7, textAlign: 'start' }}><span style={{ textDecoration: 'underline' }}>Oyuncu</span>: <span>{m.FullName} </span></Typography>
                        </div>


                        <div style={{ marginTop: 3, width: "100%" }}><Image fotografUrl={m.ImageUrl} alt={m.alt} /></div>
                        <div style={{display:'flex', justifyContent:'end'}}>
                   
                        <ViewCount rootPath={"dizikiyafeti"} linkId={links} userViewData={userViewData}/>
                        </div>
                  
                        <div style={{ width: '100%', display:'flex' }}>
                            {<div style={{ margin: 5 }}>    <ClickableLink rootPath={"dizikiyafeti"} brand={m.BrandTitle} linkId={links} title={title.toLowerCase()} /> </div>}
                        
                        </div>

                    </Grid>
                })}</Grid>


        </Container>
    </>
}





