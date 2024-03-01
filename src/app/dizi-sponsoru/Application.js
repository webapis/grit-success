'use client'
import React from 'react';

import {

    SearchBox, Stats, CurrentRefinements
} from 'react-instantsearch';
import PersistentDrawerLeft from './drawer';
import AlgoliaProvider from './AlgoliaProvider'
import SearchResultContainer from './[...slug]/comp/SearchResultContainer';

import { Box, Grid, Typography } from '@mui/material';

export default function Application({initialUiState}) {



    return <AlgoliaProvider initialUiState={initialUiState}>
        <PersistentDrawerLeft>


            <Box>
                <Box sx={{ width: { xs: '100%', md: '50%' }, margin: '0 auto', marginTop: 0 }}>

                    <SearchBox searchAsYouType={false} placeholder='Dizi, Sponsor, Sponsorluk...' />
                </Box>
                <Typography variant='h5' textAlign='center' sx={{marginTop:2}}>Türk dizilerin sponsor markaları</Typography>
                <Box sx={{ width: { xs: '100%', md: '50%' }, margin: '0 auto' }}>
                    <CurrentRefinements style={{ padding: 5 }} />
                    {/* <Stats style={{ margin: 5 }} /> */}




          <SearchResultContainer /> 


                </Box>

            </Box>
        </PersistentDrawerLeft>
    </AlgoliaProvider>

}


