'use client'


import {

    SearchBox, InfiniteHits
} from 'react-instantsearch';


import ListItem from './home/components/ListItem';
import { Box } from '@mui/material';

export default function Application() {


    return <Box>
        <Box sx={{ width: { xs: '100%', md: '50%' }, margin: '0 auto', marginTop: 3, marginBottom: 3 }}>

            <SearchBox searchAsYouType={false} />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' }, margin: '0 auto' }}>
            <InfiniteHits hitComponent={ListItem} showPrevious={false} />
        </Box>

    </Box>
}


