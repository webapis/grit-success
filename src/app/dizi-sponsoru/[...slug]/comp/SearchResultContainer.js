import { Grid, Container,Box,Typography } from "@mui/material"
import SearchResultItem from "./SearchResultItem"
import Drawer from './drawer'
export default function SearchResultContainer({data,pageTitle}) {


    return <Drawer><Container>
          <Typography variant='h4' textAlign='center' sx={{ margin:2,marginTop:7 }}>{pageTitle}</Typography>
        <Grid container gap={1} justifyContent="center">
            {data.map((m, i) => <Grid item key={i} xs={12} md={5} > <SearchResultItem item={m.item} /></Grid>)}
        </Grid>
        <Box sx={{display:'flex',justifyContent:'center',marginTop:5}}>
    
        </Box>
    </Container></Drawer>
}
