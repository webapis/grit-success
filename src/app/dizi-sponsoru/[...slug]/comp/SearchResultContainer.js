import { Grid, Container,Box,Button } from "@mui/material"
import SearchResultItem from "./SearchResultItem"

export default function SearchResultContainer({data}) {


    return <Container>
        <Grid container gap={1} justifyContent="center">
            {data.map((m, i) => <Grid item key={i} xs={12} md={5} > <SearchResultItem item={m.item} /></Grid>)}
        </Grid>
        <Box sx={{display:'flex',justifyContent:'center',marginTop:5}}>
    
        </Box>
    </Container>
}
//      {hits.sort((a,b)=>b["TOTAL"]-a["TOTAL"]).map((m, i) => <Grid item key={i} xs={12} md={5} > <SearchResultItem item={m} /></Grid>)}