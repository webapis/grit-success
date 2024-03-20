
import { promises as fs } from 'fs';

import Image from "../comp/Image";
import { Grid } from "@mui/material";
import { Container } from '@mui/material';
import path from 'path'
import Fuse from 'fuse.js'
import { createRequire } from "module";
//import Drawer from '../../home/components/drawer'
const require = createRequire(import.meta.url);


export async function generateMetadata({ params, searchParams }, parent) {

    const pages = await fs.readFile(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/pageMetaData.json'), 'utf8');
    const pagesMetaData = JSON.parse(pages);
    debugger
    const { pageTitle } = pagesMetaData.find(f => {
        const current = f.slug
        const slug = params.slug[0]
        const match = current === slug

        return match
    })


    return {
        title:pageTitle

    }
}



export default async function DiziPage({ params }) {

    const pages = await fs.readFile(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/pageMetaData.json'), 'utf8');
    const pagesMetaData = JSON.parse(pages);

    const data = await fs.readFile(path.join(process.cwd(), 'src/app/sponsor-kiyafeti/sponsorkiyafeti.json'), 'utf8');
    const pagesData = JSON.parse(data);
    debugger
    const metasearchResult = pagesMetaData.find(f => {
        const current = f.slug
        const slug = params.slug[1]
        const match = current === slug
        debugger
        return match
    })

    debugger

    if (metasearchResult) {

        const { pageTitle, search } = metasearchResult

        const fuse = new Fuse(pagesData, { keys: ['image', 'title', 'price', 'link', 'currency', 'color', 'gender', 'category', 'marka'], minMatchCharLength: 6 })
        debugger

        let results = fuse.search(search)


        return <Container >
            <Grid container gap={1}> {results.map((m, i) => <Grid item key={i} xs={5} sm={3} md={2}> <Image item={m.item} pageTitle={pageTitle} /></Grid>)}</Grid>

        </Container>

    } else {

        return <div>Loading...</div>
    }



}


