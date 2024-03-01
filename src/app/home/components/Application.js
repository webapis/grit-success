'use client'
import React from 'react';

import {

    SearchBox, Stats, CurrentRefinements
} from 'react-instantsearch';
import PersistentDrawerLeft from './drawer';
import AlgoliaProvider from './AlgoliaProvider'
import ImageContainer from './ImageContainer';
import { Box, Typography } from '@mui/material';

export default function Application() {



    return <AlgoliaProvider>
        <PersistentDrawerLeft>


            <Box>
                <Box sx={{ width: { xs: '100%', md: '50%' }, margin: '0 auto', marginTop: 0 }}>

                    <SearchBox searchAsYouType={false} placeholder='Dizi, Karakter, Oyuncu, Kıyafet...' />
                </Box>
                <Typography variant='h5' textAlign='center' sx={{marginTop:2}}>Türk dizilerinde giyilen marka kıyafetler</Typography>
                <Box sx={{ width: { xs: '100%', md: '50%' }, margin: '0 auto' }}>
                    <CurrentRefinements style={{ padding: 5 }} />
                    {/* <Stats style={{ margin: 5 }} /> */}




                    <ImageContainer />


                </Box>

            </Box>
        </PersistentDrawerLeft>
    </AlgoliaProvider>

}


