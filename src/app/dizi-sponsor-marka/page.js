import SponsorKategoriView from './comp/SponsorKategoriView';
import Container from '@mui/material/Container'
import pagesData from '@/app/dizi-sponsor-marka/page-data/keywordMetaData.json';
import Grid from '@mui/material/Grid'

import PersistentDrawerLeft from '../components/drawer';
import Typography from '@mui/material/Typography'
import TopNavigation from '../components/TopNavigation';
import getViews from '../utils/firebase/supabase';


const mappedNavData = pagesData.map(m => {
    const href = `/dizi-sponsor-marka/${m.keyword}/sayfa/1`
    const title = m.keywordTitle
    return { ...m, href, title }
})

export { mappedNavData }
export async function generateMetadata({ params }) {


    return {

        title: 'Dizi Sponsor Hizmetleri'

    }

}


export default async function DiziSponsorMarka() {
    const userViewData = await getViews({ table: 'sponsorkategori-home' })
    return <>
        <TopNavigation selected={5} />
        <PersistentDrawerLeft data={mappedNavData} title="Sponsor Kategori"> <Container>

            <Typography variant='h4' textAlign='center' sx={{ marginTop: 0 }}>Dizi Sponsor Kategoriler</Typography>
            <Grid gap={1} container sx={{ display: 'flex', justifyContent: 'center', marginTop: 0 }}>{mappedNavData.map(m => {

                return <Grid item xs={11} sm={3}>
                    <SponsorKategoriView href={m.href} userViewData={userViewData} kategori={m.title} keyword={m.keyword} />
                </Grid>

            })}</Grid></Container></PersistentDrawerLeft>
    </>
}


// export async function generateStaticParams() {
//     const file = await fs.readFile(process.cwd() + '/src/app/dizikiyafeti/meta/pageMetaData.json', 'utf8');
//     const data = JSON.parse(file);

//     return data.map((post) => ({
//         slug: post.slug,
//     }))
// }