import { Grid, Container, Typography } from "@mui/material"
import SearchResultItem from "./SearchResultItem"
import Drawer from './drawer'
import Chip from '@mui/material/Chip';

import Link from "next/link";
export default function SearchResultContainer({ data, pageTitle,dizi,page,keyword }) {

console.log('dizi',dizi)
    return <Drawer><Container>
        <Typography variant='h4' textAlign='center' sx={{ margin: 2, marginTop: 9 }}>{pageTitle}</Typography>

        <Grid container gap={1} justifyContent="center">
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>
                {/* <Grid container gap={1} sx={{display:'flex',justifyContent:'center'}}>
                    <Chip component={Grid} item label="kıyafet" variant={keyword==='kiyafet'?'filled':'outlined'} color={keyword==='kiyafet'?'primary':'secondary'} component={Link} href={`/dizi-sponsoru/${dizi}/kiyafet/page/1`}/>
                    <Chip component={Grid} item  label="kadın kıyafeti" variant={keyword==='kadin-kiyafeti'?'filled':'outlined'} color={keyword==='kadin-kiyafeti'?'primary':'secondary'}  component={Link} href={`/dizi-sponsoru/${dizi}/kadin-kiyafeti/page/1`}/>
                    <Chip component={Grid} item  label="erkek kıyafeti" variant={keyword==='erkek-kiyafeti'?'filled':'outlined'} color={keyword==='erkek-kiyafeti'?'primary':'secondary'}  component={Link} href={`/dizi-sponsoru/${dizi}/erkek-kiyafeti/page/1`}/>
                    <Chip component={Grid} item  label="takı,mücevher" variant={keyword==='taki-mujevher'?'filled':'outlined'} color={keyword==='taki-mujevher'?'primary':'secondary'}  component={Link} href={`/dizi-sponsoru/${dizi}/taki-mujevher/page/1`}/>
                    <Chip component={Grid} item  label="mobilya" variant={keyword==='mobilya'?'filled':'outlined'} color={keyword==='mobilya'?'primary':'secondary'} component={Link} href={`/dizi-sponsoru/${dizi}/mobilya/page/1`}/>
                   
                </Grid> */}
            </Grid>
            {data.map((m, i) => <Grid item key={i} xs={12} md={5} > <SearchResultItem item={m.item} /></Grid>)}
        </Grid>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',marginTop:3}}>
        {/* <Grid container gap={1} sx={{display:'flex',justifyContent:'center'}}>
                    <Chip component={Grid} item label="kıyafet" variant={keyword==='kiyafet'?'filled':'outlined'} color={keyword==='kiyafet'?'primary':'secondary'} component={Link} href={`/dizi-sponsoru/${dizi}/kiyafet/page/1`}/>
                    <Chip component={Grid} item  label="kadın kıyafeti" variant={keyword==='kadin-kiyafeti'?'filled':'outlined'} color={keyword==='kadin-kiyafeti'?'primary':'secondary'}  component={Link} href={`/dizi-sponsoru/${dizi}/kadin-kiyafeti/page/1`}/>
                    <Chip component={Grid} item  label="erkek kıyafeti" variant={keyword==='erkek-kiyafeti'?'filled':'outlined'} color={keyword==='erkek-kiyafeti'?'primary':'secondary'}  component={Link} href={`/dizi-sponsoru/${dizi}/erkek-kiyafeti/page/1`}/>
                    <Chip component={Grid} item  label="takı,mücevher" variant={keyword==='taki-mujevher'?'filled':'outlined'} color={keyword==='taki-mujevher'?'primary':'secondary'}  component={Link} href={`/dizi-sponsoru/${dizi}/taki-mujevher/page/1`}/>
                    <Chip component={Grid} item  label="mobilya" variant={keyword==='mobilya'?'filled':'outlined'} color={keyword==='mobilya'?'primary':'secondary'} component={Link} href={`/dizi-sponsoru/${dizi}/mobilya/page/1`}/>
                   
                </Grid> */}
            </Grid>
    </Container></Drawer>
}
