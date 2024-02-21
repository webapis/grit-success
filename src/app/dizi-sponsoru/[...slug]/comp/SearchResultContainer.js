import { Grid, Container,Typography } from "@mui/material"
import SearchResultItem from "./SearchResultItem"

export default function SearchResultContainer({ items,pageTitle,coverimage }) {

    return <Container>
        <Grid container gap={1} justifyContent="center">
            <Grid item xs={12}>
            <Typography variant="h2" sx={{textAlign:"center"}}>{pageTitle}</Typography>
                </Grid>
        <Grid item xs={12} sx={{textAlign:"center"}}>

            <img src={`/dizi/cover-image/${coverimage}`} alt={pageTitle}/>
        </Grid>
            {items.sort((a,b)=>b["TOTAL"]-a["TOTAL"]).map((m, i) => <Grid item key={i}> <SearchResultItem item={m} /></Grid>)}
        </Grid>
    </Container>
}