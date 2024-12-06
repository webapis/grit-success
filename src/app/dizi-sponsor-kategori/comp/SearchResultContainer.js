
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import SearchResultItem from "./SearchResultItem"

import SelectedSponsorKategoriChip from './SelectedSponsorKategoriChip'
import TopNavigation from "@/app/components/TopNavigation";
import PersistentDrawerLeft from '@/app/components/drawer';
import { mappedNavData } from '../page';
import WebsiteInfoComponent from "./WebsiteInfoComponent";
export default function SearchResultContainer({ data, pageTitle,userViewData }) {

    let mappedResult = data.map(m => {
    
    
        const linkId = m.Website
        const viewCount = userViewData['data'].find(f => f.href.includes(linkId))
       // console.log(linkId,userViewData['data'].map(m=>m.href).includes(linkId))
      
        return { ...m, viewCount: viewCount ? viewCount.count : 0 }
    }).sort((a, b) => b.viewCount - a.viewCount)

    return <>
        {/* <TopNavigation selected={3} /> */}

            
    <Container sx={{ display:'flex',justifyContent:'center'}}>
    
            
    <Grid container spacing={1}  sx={{width:{xs:"100%", md:"50%"}}}>
            <Grid item xs={12}>
            <SelectedSponsorKategoriChip category={pageTitle} />
            </Grid>
        {mappedResult.map((m, i) => {
       
            return <Grid item key={i} xs={12} > <WebsiteInfoComponent userViewData={userViewData} data={m} /></Grid>
        })}
    </Grid>
 
</Container>

    </>
}
//