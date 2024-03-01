import { Grid, Container,Typography } from "@mui/material"
import SearchResultItem from "../../../dizi-sponsoru/[...slug]/comp/SearchResultItem"

export default function SearchResultContainer({ items,pageTitle }) {

    return <Container>
          <Typography variant="h4" sx={{textAlign:"center"}}>{pageTitle}</Typography>
        <Grid container gap={1} justifyContent="center">
     
            {items.sort((a,b)=>b["TOTAL"]-a["TOTAL"]).map((m, i) => <Grid item key={i} xs={12} md={5} > <SearchResultItem item={m} /></Grid>)}
        </Grid>
    </Container>
}