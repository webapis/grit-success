import { Grid, Container,Box,Button } from "@mui/material"
import SearchResultItem from "./SearchResultItem"
import {useInfiniteHits } from 'react-instantsearch';
export default function SearchResultContainer({ items,pageTitle,coverimage }) {
    const { hits,showMore,isLastPage  } = useInfiniteHits();
    console.log('hits',hits)
    return <Container>
        <Grid container gap={1} justifyContent="center">
           
     
            {hits.sort((a,b)=>b["TOTAL"]-a["TOTAL"]).map((m, i) => <Grid item key={i} xs={12} md={5} > <SearchResultItem item={m} /></Grid>)}
        </Grid>
        <Box sx={{display:'flex',justifyContent:'center',marginTop:5}}>
        <Button variant='outlined' onClick={showMore} disabled={isLastPage}>
        Fazla Göster
      </Button>

        </Box>
    </Container>
}