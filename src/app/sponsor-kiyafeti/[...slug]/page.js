
import { promises as fs } from 'fs';
import Link from 'next/link';
import Image from "../comp/Image";
import { Grid } from "@mui/material";
import { Container } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import path from 'path'
import Fuse from 'fuse.js'

export default async function DiziPage({ params }) {

    const { slug } = params

    let gender = decodeURI(slug[0])
    let category = decodeURI(slug[1])

    let page = decodeURI(slug[2])

    const data = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/${gender}/${category}-sponsorkiyafeti.json`), 'utf8');
    const pagesData = JSON.parse(data);
   
    console.log("gener", gender)
    console.log("category", category)
    console.log("page", page)

    console.log("pageDataLength", pagesData.length)


    return <>
    <TabContainer/>
    <Grid container="true" gap={1}> {pagesData.map((m, i) => <Grid item key={i} xs={5} sm={3} md={2}> <Image content={m} pageTitle={''} /></Grid>)}</Grid></>

}




function TabContainer (){

    return    <Tabs value={2}>
    <Tab label="Kadın"  component ={Link} href="/"/>
    <Tab label="Erkek"  href="/dizi-sponsoru"/>
    <Tab label="Kız Çocuk" />
    <Tab label="Erkek Çocuk" />
    <Tab label="Diğer" />
  </Tabs>
}








/*

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
        title: pageTitle

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


        return <Container><Grid container gap={1}> {results.map((m, i) => <Grid item key={i} xs={5} sm={3} md={2}> <Image item={m.item} pageTitle={pageTitle} /></Grid>)}</Grid></Container>

    } else {

        return <div>Loading...</div>
    }



}












*/