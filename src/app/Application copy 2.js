'use client'

import algoliasearch from 'algoliasearch/lite';
import {
  
    SearchBox,RefinementList,InfiniteHits
} from 'react-instantsearch';

const searchClient = algoliasearch("7JF244QSZZ", '9c4018bdcedb542cb7a0c9e5453aa7b0');
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import ListItem from './home/components/ListItem';
import { Box } from '@mui/material';

export default  function Application({query}) {


    return <InstantSearchNext indexName="brand" searchClient={searchClient} routing initialUiState={{query}}>
        <Box sx={{width:{xs:'100%', md:'50%'},margin:'0 auto',marginTop:3, marginBottom:3 }}>
        <SearchBox searchAsYouType={false}/>
        </Box>

        {/* other widgets */}
        
        <Box sx={{width:{xs:'100%', md:'50%'},margin:'0 auto' }}>
        <InfiniteHits hitComponent={ListItem}/>
        </Box>
  
    </InstantSearchNext>
}


