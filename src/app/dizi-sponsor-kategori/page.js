import SponsorKategoriView from './comp/SponsorKategoriView';
import Container from '@mui/material/Container'
import pagesData from '@/app/dizi-sponsor-kategori/page-data/keywordMetaData.json';
import Grid from '@mui/material/Grid'

export default function SponsorKategori() {

    return <Container><Grid  gap={1} container sx={{display:'flex',justifyContent:'center'}}>{pagesData.map(m => {
        
        return <Grid item xs={2} sm={3}>
        <SponsorKategoriView kategori={m.keywordTitle} keyword={m.keyword}/>
         </Grid>

    })}</Grid></Container> 
}