import { Grid, Container, Typography } from "@mui/material"
import SearchResultItem from "./SearchResultItem"
import Drawer from './drawer'

import ChipContainer from "./ChipContainer";

export default function SearchResultContainer({ data, pageTitle,dizi,keyword }) {


    return <Drawer><Container>
        <Typography variant='h4' textAlign='center' sx={{ margin: 2, marginTop: 9 }}>{pageTitle}</Typography>

        <Grid container gap={1} justifyContent="center">
          <ChipContainer dizi={dizi} keyword={keyword}/>
            {data.map((m, i) => <Grid item key={i} xs={12} md={5} > <SearchResultItem item={m.item} /></Grid>)}
        </Grid>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',marginTop:3}}>
        <ChipContainer dizi={dizi} keyword={keyword}/>
            </Grid>
    </Container></Drawer>
}
//