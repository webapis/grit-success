import Application from "../Application"
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
    let genderIndex=0
    switch(gender){
        case 'kadın':
            genderIndex= 0;
            break;
        case 'erkek':
            genderIndex= 1;
            break;
        case 'kiz-cocuk':
            genderIndex= 2;
            break;
        case 'erkek-cocuk':
            genderIndex= 3;
            break;
        case 'diğer':
            genderIndex= 4;
            break;
        case 'bebek':
            genderIndex= 5;
            break;

            default:
                genderIndex= 1;
              
    }

   console.log('slug',slug)
    console.log("gener", gender)
    console.log("category", category)
    console.log("page", page)

 //  

if(category==="undefined"){

    return<>
        <div style={{marginTop:70,display:'flex',justifyContent:'center'}}>
    <Tabs value={2}>
      <Tab label="Dizi Kıyafeti"  component ={Link} href="/"/>
      <Tab label="Dizi Sponsoru"  href="/dizi-sponsoru"/>
      <Tab label="Sponsor Kıyafeti" />
    </Tabs>
    </div>
    <Application gender={gender} value={genderIndex} />
    </> 
}else{
    const data = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/${gender}/${category}-sponsorkiyafeti.json`), 'utf8');
    const pagesData = JSON.parse(data)
    console.log("pageDataLength", pagesData.length)
 return <Container >
     <div style={{marginTop:70,display:'flex',justifyContent:'center'}}>
    <Tabs value={2}>
      <Tab label="Dizi Kıyafeti"  component ={Link} href="/"/>
      <Tab label="Dizi Sponsoru"  href="/dizi-sponsoru"/>
      <Tab label="Sponsor Kıyafeti" />
    </Tabs>
    </div>
    <GenderTabContainer value={genderIndex}/>
    <Grid container="true" gap={1} sx={{display:'flex',justifyContent:'center'}}> {pagesData.map((m, i) => <Grid item key={i} xs={5} sm={3} md={2}> <Image content={m} pageTitle={''} /></Grid>)}</Grid></Container>

}
}
   




export function GenderTabContainer ({value=0}){

    return    <Tabs value={value} centered sx={{marginBottom:1}}>
    <Tab label="Kadın"  component ={Link} href="/sponsor-kiyafeti"/>
    <Tab label="Erkek"  component ={Link} href="/sponsor-kiyafeti/erkek"/>
    <Tab label="Kız Çocuk"  component ={Link}  href="/sponsor-kiyafeti/kiz-cocuk" />
    <Tab label="Erkek Çocuk"  href="/dizi-sponsoru/erkek-cocuk"/>
    <Tab label="Diğer"  component ={Link}  href="/sponsor-kiyafeti/diğer"/>
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