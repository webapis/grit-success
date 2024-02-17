'use client'


import {

    SearchBox, InfiniteHits, Stats, CurrentRefinements, Hits
} from 'react-instantsearch';
import PersistentDrawerLeft from './drawer';
import AlgoliaProvider from './AlgoliaProvider'
import ImageContainer from './ImageContainer';
import { Box, Grid } from '@mui/material';

export default function Application(props) {



    return <AlgoliaProvider>
        <PersistentDrawerLeft>


            <Box>
                <Box sx={{ width: { xs: '100%', md: '50%' }, margin: '0 auto', marginTop: 3 }}>

                    <SearchBox searchAsYouType={false} placeholder='Kıyafet, Aksesuar, Takı...' />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '50%' }, margin: '0 auto' }}>
                    <CurrentRefinements style={{ padding: 5 }} />
                    <Stats style={{ margin: 5 }} />




                    <ImageContainer />


                </Box>

            </Box>
        </PersistentDrawerLeft>
    </AlgoliaProvider>

}


