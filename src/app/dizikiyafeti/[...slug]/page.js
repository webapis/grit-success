
import { promises as fs } from 'fs';
import MiniSearch from 'minisearch'
import ImageContainer from '../comps/ImageContainer';
import { Container, Stack, Grid } from '@mui/material';
import path from 'path'
import Fuse from 'fuse.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);


export async function generateMetadata({ params, searchParams }, parent) {

    const pages = await fs.readFile(path.join(process.cwd(), 'src/app/dizikiyafeti/meta/pageMetaData.json'), 'utf8');
    const pagesData = JSON.parse(pages);
    debugger
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

    const pages = await fs.readFile(path.join(process.cwd(), 'src/app/dizikiyafeti/meta/pageMetaData.json'),'utf8');
    const pagesMetaData = JSON.parse(pages);

    const data = await fs.readFile(path.join(process.cwd(), 'src/app/dizikiyafeti/page-data/dizikiyafeti.json'),'utf8');
    const pagesData = JSON.parse(data);
debugger
    const { slug, title, nextpages, algoliaQuery } = pagesMetaData.find(f => {
        const current = f.slug[0]
        const slug = params.slug[0]
        const match = current === slug

        return match
    })
    const fuse = new Fuse(pagesData,{keys:['FullName','CaracterName','TVSeriesTitle','tag'], minMatchCharLength: 6})
debugger

    let results = fuse.search(algoliaQuery)
    debugger
    // const query = algoliaQuery
    // const { hits } = await index.search(query, { hitsPerPage: 200 })
    // const filename =c.slug[0]

    // const data = await fs.readFile(process.cwd() + `/src/app/dizikiyafeti/page-data/${slug[0]}.json`, 'utf8');
    // const dataObj = JSON.parse(data)
    debugger
    return <div>
        <Container >
            <ImageContainer filteredData={results} pageTitle={title} />
            <Grid sx={{ paddingTop: 5, paddingBottom: 5 }} container justifyContent="center">
                {/* {nextpages.length>0 && nextpages.map((m, i) => <Grid item key={i}> <Button size="small"   component={Link} href={`/${m.slug}`} startIcon={<SearchIcon />} variant='secondary' sx={{ fontSize: 16, textTransform: "lowercase", backgroundColor: "#eeeeee", margin: 1, borderRadius: 7, padding:2, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>{m.title}</Button> </Grid>)} */}
            </Grid>
        </Container>

    </div>

}


// export async function generateStaticParams() {
//     const file = await fs.readFile(process.cwd() + '/src/app/dizikiyafeti/meta/pageMetaData.json', 'utf8');
//     const data = JSON.parse(file);

//     return data.map((post) => ({
//         slug: post.slug,
//     }))
// }