
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import SearchResultItem from "./SearchResultItem"

import SelectedSponsorKategoriChip from './SelectedSponsorKategoriChip'
import TopNavigation from "@/app/components/TopNavigation";
import PersistentDrawerLeft from '@/app/components/drawer';
import { mappedNavData } from '../page';

export default function SearchResultContainer({ data, pageTitle,userViewData }) {

    let mappedResult = data.map(m => {
    
        debugger
        const linkId = m.Website
        const viewCount = userViewData['data'].find(f => f.href.includes(linkId))
       // console.log(linkId,userViewData['data'].map(m=>m.href).includes(linkId))
        debugger
        return { ...m, viewCount: viewCount ? viewCount.count : 0 }
    }).sort((a, b) => b.viewCount - a.viewCount)

    return <>
        <TopNavigation selected={3} />
        <PersistentDrawerLeft data={mappedNavData} title="Sponsor Kategori"><Container>
            <SelectedSponsorKategoriChip category={pageTitle} />
            <Grid container gap={1} justifyContent="center">

                {mappedResult.map((m, i) => <Grid item key={i} xs={12} md={5} > <SearchResultItem userViewData={userViewData} item={m} /></Grid>)}
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>

            </Grid>
        </Container></PersistentDrawerLeft>
    </>
}
//