import SponsorKategoriView from './comp/SponsorKategoriView';
import Container from '@mui/material/Container'
import pagesData from '@/app/dizi-sponsor-kategori/page-data/keywordMetaData.json';
import Grid from '@mui/material/Grid'
import Drawer from './comp/drawer'
import Typography from '@mui/material/Typography'
import TopNavigation from '../components/TopNavigation';

export async function generateMetadata({ params }) {




    return {

        title: 'Dizi Sponsor Kategori'

    }






}

export default function SponsorKategori() {

    return <>
         <TopNavigation selected={3} />
    <Drawer> <Container>
   
        <Typography variant='h4' textAlign='center' sx={{ marginTop: 0 }}>Dizi Sponsor Kategoriler</Typography>
        <Grid gap={1} container sx={{ display: 'flex', justifyContent: 'center', marginTop: 0 }}>{pagesData.map(m => {

            return <Grid item xs={11} sm={3}>
                <SponsorKategoriView kategori={m.keywordTitle} keyword={m.keyword} />
            </Grid>

        })}</Grid></Container></Drawer>
        </> 
}


// export async function generateStaticParams() {
//     const file = await fs.readFile(process.cwd() + '/src/app/dizikiyafeti/meta/pageMetaData.json', 'utf8');
//     const data = JSON.parse(file);

//     return data.map((post) => ({
//         slug: post.slug,
//     }))
// }