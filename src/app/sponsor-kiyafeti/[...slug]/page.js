//import Application from "../Application"
import { promises as fs } from 'fs';
import Link from 'next/link';
import Image from "../comp/Image";
import { Grid } from "@mui/material";
import { Container } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import path from 'path'

import orderData from "./orderData";
import PaginationContainer from "../comp/PaginationContainer";
import Drawer from '../comp/drawer'
import TopNavigation from "@/app/components/TopNavigation";
import ProductCategoryChip from "./ProductCategoryChip";
import deaccent from '../comp/deaccent';

export async function generateMetadata({ params }) {

    const { slug } = params

    let gender = decodeURI(slug[0])
    let category = decodeURI(slug[1])


    return {

        title: 'Sponsor Kıyafeti-' + gender + ' ' + category

    }






}

export default async function DiziPage({ params }) {

    const { slug } = params

    let gender = decodeURI(slug[0])
    let category = decodeURI(slug[1])
    let page = parseInt(decodeURI(slug[3]))
    let genderIndex = 0
    switch (gender) {
        case 'kadin':
            genderIndex = 0;
            break;
        case 'erkek':
            genderIndex = 1;
            break;
        case 'kiz-cocuk':
            genderIndex = 2;
            break;
        case 'erkek-cocuk':
            genderIndex = 3;
            break;
        case 'diğer':
            genderIndex = 4;
            break;
        case 'bebek':
            genderIndex = 5;
            break;

        default:
            genderIndex = 1;

    }




        const data = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/${gender}/${category}-sponsorkiyafeti.json`), 'utf8');
        const rawData = orderData(JSON.parse(data)).filter(f=>!f.error)
debugger
        const pagesData = paginate(rawData, page, 100)
        const pageCount = Math.ceil(rawData.length / 100)
debugger
        return <>
            <TopNavigation selected={0} />
            <Drawer> <Container>

                <ProductCategoryChip category={rawData[0].category} />
                {/* <GenderTabContainer value={genderIndex} /> */}
                <Grid container gap={1} sx={{ display: 'flex', justifyContent: 'center' }}> {pagesData.map((m, i) => <Grid item key={i} > <Image {...m} pageTitle={''} /></Grid>)}</Grid>
                <PaginationContainer count={pageCount} page={page} url={`/sponsor-kiyafeti/${gender}/${category}/sayfa/`} />
            </Container>
            </Drawer>
        </>


}





export function GenderTabContainer({ value = 0 }) {

    return <Container sx={{ display: 'flex', justifyContent: "center" }}> <Tabs value={value} sx={{ marginBottom: 1 }} variant="scrollable" scrollButtons allowScrollButtonsMobile>
        <Tab label="Kadın" component={Link} href="/sponsor-kiyafeti" />
        <Tab label="Erkek" component={Link} href="/sponsor-kiyafeti/erkek" />
        {/* <Tab label="Kız Çocuk" component={Link} href="/sponsor-kiyafeti/kiz-cocuk" />
        <Tab label="Erkek Çocuk" href="/dizi-sponsoru/erkek-cocuk" />
        <Tab label="Diğer" component={Link} href="/sponsor-kiyafeti/diğer" /> */}
    </Tabs></Container>
}



function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}









export async function generateStaticParams() {
    const data = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/kadin/sponsorkiyafetiMenu.json`), 'utf8');

    const objData = Object.values(JSON.parse(data)).map(m=>Object.keys(m)).flat().map(d=>deaccent(d).toLowerCase().replaceAll(' ','-').replaceAll(',',''))


    return objData.map((category) => {
     
 
      return {
        slug: ['kadin',category,'sayfa','1']
      }
      
    })
}




