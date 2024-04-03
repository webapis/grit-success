import Link from "next/link";
import { Grid, Container, Typography,Tabs,Tab } from "@mui/material"
import SearchResultItem from "./SearchResultItem"
import Drawer from './drawer'

import ChipContainer from "./ChipContainer";
import SelectedDiziChip from "./SelectedDiziChip";
export default function SearchResultContainer({ data, pageTitle,dizi,keyword }) {


    return <Drawer><Container>
         <div style={{display:'flex',justifyContent:'center'}}>

         <Tabs value={1}sx={{ marginTop: 9}}>
                    <Tab label="Dizi Kıyafeti" component={Link} href="/" />
                    <Tab label="Dizi Sponsoru"  />
                    <Tab label="Sponsor Kıyafeti" component={Link} href="/sponsor-kiyafeti" />
                </Tabs>
         </div>
           
        {/* <Typography variant='h4' textAlign='center' sx={{ margin: 2 }}>{pageTitle}</Typography> */}
        <SelectedDiziChip category={pageTitle}/>
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