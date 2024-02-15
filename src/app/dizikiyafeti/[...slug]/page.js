
import { promises as fs } from 'fs';
import Link from 'next/link';
import ImageContainer from '../comps/ImageContainer';
import { Container, Stack, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';



export async function generateMetadata({ params, searchParams }, parent) {

    const pages = await fs.readFile(process.cwd() + '/src/app/dizikiyafeti/meta/pageMetaData.json', 'utf8');
    const pagesData = JSON.parse(pages);
    const { title } = pagesData.find(f => {
        const current = f.slug[0]
        const slug = params.slug[0]
        const match = current === slug

        return match
    })
    return {
        title

    }
}



export default async function DiziPage({ params }) {

    const pages = await fs.readFile(process.cwd() + '/src/app/dizikiyafeti/meta/pageMetaData.json', 'utf8');
    const pagesData = JSON.parse(pages);

    const { slug, title, nextpages } = pagesData.find(f => {
        const current = f.slug[0]
        const slug = params.slug[0]
        const match = current === slug

        return match
    })

    const data = await fs.readFile(process.cwd() + `/src/app/dizikiyafeti/page-data/${slug[0]}.json`, 'utf8');
    const dataObj = JSON.parse(data)

    debugger



    return <div>
        <Container >

            <ImageContainer filteredData={dataObj} pageTitle={title} />
            <Grid sx={{ paddingTop: 5, paddingBottom: 5 }} container justifyContent="center">
                {nextpages.length>0 && nextpages.map((m, i) => <Grid item key={i}> <Button size="small"   component={Link} href={`/${m.slug}`} startIcon={<SearchIcon />} variant='secondary' sx={{ fontSize: 16, textTransform: "lowercase", backgroundColor: "#eeeeee", margin: 1, borderRadius: 7, padding:2, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>{m.title}</Button> </Grid>)}
            </Grid>

        </Container>
     
    </div>

}


export async function generateStaticParams() {
    const file = await fs.readFile(process.cwd() + '/src/app/dizikiyafeti/meta/pageMetaData.json', 'utf8');
    const data = JSON.parse(file);

    return data.map((post) => ({
        slug: post.slug,
    }))
}