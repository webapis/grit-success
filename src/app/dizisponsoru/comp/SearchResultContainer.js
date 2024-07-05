
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import SearchResultItem from "./SearchResultItem"


import ChipContainer from "./ChipContainer";
import SelectedDiziChip from "./SelectedDiziChip";
import TopNavigation from "@/app/components/TopNavigation";
import { mappedData } from "../Application";
import PersistentDrawerLeft from "@/app/components/drawer";
import getViews from "@/app/utils/firebase/supabase";
export default async function SearchResultContainer({ data, pageTitle, dizi, keyword }) {
  const userViewData = await getViews({ table: 'dizisponsoru' })
  let mappedResult = data.map(m => {
    
    debugger
    const linkId = m.item.ProductLink
    const viewCount = userViewData['data'].find(f => f.href.includes(linkId))
   // console.log(linkId,userViewData['data'].map(m=>m.href))
    debugger
    return { ...m, viewCount: viewCount ? viewCount.count : 0 }
}).sort((a, b) => b.viewCount - a.viewCount)
  return <>
    <TopNavigation selected={2} />
    <PersistentDrawerLeft data={mappedData} title="Dizi Sponsoru"><Container>

      <SelectedDiziChip category={pageTitle} />
      <Grid container gap={1} justifyContent="center">
        <ChipContainer dizi={dizi} keyword={keyword} />
        {mappedResult.map((m, i) => <Grid item key={i} xs={12} md={5} > <SearchResultItem item={m.item} userViewData={userViewData} /></Grid>)}
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <ChipContainer dizi={dizi} keyword={keyword} />
      </Grid>
    </Container></PersistentDrawerLeft>
  </>
}
//