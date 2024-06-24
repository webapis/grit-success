
import  Container  from "@mui/material/Container"
import  Grid from "@mui/material/Grid"
import SearchResultItem from "./SearchResultItem"


import ChipContainer from "./ChipContainer";
import SelectedDiziChip from "./SelectedDiziChip";
import TopNavigation from "@/app/components/TopNavigation";
import { mappedData } from "../Application";
import PersistentDrawerLeft from "@/app/components/drawer";
export default function SearchResultContainer({ data, pageTitle,dizi,keyword }) {


    return <>
      <TopNavigation selected={2}/>
  <PersistentDrawerLeft data={mappedData} title="Dizi Sponsoru"><Container>
     
        <SelectedDiziChip category={pageTitle}/>
        <Grid container gap={1} justifyContent="center">
          <ChipContainer dizi={dizi} keyword={keyword}/>
            {data.map((m, i) => <Grid item key={i} xs={12} md={5} > <SearchResultItem item={m.item} /></Grid>)}
        </Grid>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',marginTop:3}}>
        <ChipContainer dizi={dizi} keyword={keyword}/>
            </Grid>
    </Container></PersistentDrawerLeft>
    </>
}
//