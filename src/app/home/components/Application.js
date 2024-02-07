'use client'


import {

    SearchBox, InfiniteHits
} from 'react-instantsearch';
import PersistentDrawerLeft from './drawer';
import AlgoliaProvider from './AlgoliaProvider'
import ListItem from './ListItem';
import { Box } from '@mui/material';

export default function Application() {


    return <AlgoliaProvider>
        <PersistentDrawerLeft>

      
    <Box>
        <Box sx={{ width: { xs: '100%', md: '50%' }, margin: '0 auto', marginTop: 3, marginBottom: 3 }}>

            <SearchBox searchAsYouType={false} placeholder='Kıyafet, Aksesuar, Takı...' />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' }, margin: '0 auto' }}>
     
            <InfiniteHits hitComponent={ListItem} showPrevious={false} />
       
        </Box>

    </Box>
    </PersistentDrawerLeft>
    </AlgoliaProvider>
         
}


