import Link from "next/link";
import { Grid, Container, Typography,Tabs,Tab } from "@mui/material"
import SearchResultItem from "./SearchResultItem"
import Drawer from './drawer'
import SelectedSponsorKategoriChip from './SelectedSponsorKategoriChip'
import TopNavigation from "@/app/components/TopNavigation";


export default function SearchResultContainer({ data, pageTitle,dizi,keyword }) {


    return <Drawer><Container>
    

       <TopNavigation selected={3}/>
           
  
        <SelectedSponsorKategoriChip category={pageTitle}/>
        <Grid container gap={1} justifyContent="center">
  
            {data.map((m, i) => <Grid item key={i} xs={12} md={5} > <SearchResultItem item={m.item} /></Grid>)}
        </Grid>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',marginTop:3}}>
  
            </Grid>
    </Container></Drawer>
}
//