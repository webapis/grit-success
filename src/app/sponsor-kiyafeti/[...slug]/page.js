//import Application from "../Application"
import { promises as fs } from 'fs';
//import Link from 'next/link';
import Image from "../comp/Image";
import { Box, Grid } from "@mui/material";
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
import colors from './keywords/color';
import brands from './keywords/marka'
import prices from './keywords/price'

import KeywordItem from '../comp/KeywordItem';
import PopupMenuColor from '../comp/popup-menu-color';
import mergedCategories from '../utils/mergedCategories.mjs'
import searchObject from "../utils/searchObject.mjs";
function findMatching(primaryArray, colorsArray) {
    // Filter the colorsArray to find colors that exist in the primaryArray
    const matchingColors = colorsArray.filter(color => primaryArray.includes(color));

    return matchingColors;
}

function findMatchingPrice(price, priceRange) {
    return priceRange.some(cv => {
        const start = parseInt(cv.split('-')[0])
        const end = parseInt(cv.split('-')[1])
        if (price >= start && price <= end) {
            return true
        }
        return false

    })
}


export async function generateMetadata({ params }) {

    const { slug } = params

    let gender = decodeURI(slug[0])
    let category = decodeURI(slug[1])



    return {

        title: 'Sponsor Kıyafeti-' + gender + ' ' + category

    }
}

export default async function SponsorKiyafetiPage({ params }) {
    debugger
    const { slug } = params

    const slugObj = mergedCategories.find(f => f.slug === decodeURI(slug[1]))
    debugger
    const rawData = await fs.readFile(process.cwd() + `/src/app/sponsor-kiyafeti/data/kadin/${decodeURI(slug[1])}-sponsorkiyafeti.json`, 'utf8');
    const data = JSON.parse(rawData)
    debugger
    const page = slug[slug.length - 1]

    const selectedKeyword = decodeURI(slug[slug.length - 3])
    debugger
    const initLoad = selectedKeyword.split('-').length === slugObj.keywords.length
    const positives = slugObj.db.length > 0 ? slugObj.db : slugObj.positives.flat()
    const selectedPositives = initLoad ? positives : slugObj.positives.find(f => f.includes(selectedKeyword))
   //console.log("slugObj",slugObj)
    debugger
    //const selectedPositives = slugObj.positives.filter(f=> )

    //const data = getData({ positives: positives,negatives:slugObj.negatives, exclude: slugObj.exclude })
    debugger
    const result = data.filter(f => searchObject({ ...f, ...slugObj.exclude }, positives).length > 0)//.map(m => { return { ...m, keywords: searchObject(m, slugObj.positives.flat()) } })
    const filteredData = result.filter(f => searchObject({ ...f, ...slugObj.exclude }, selectedPositives).length > 0)//.map(m => { return { ...m, keywords: searchObject(m, slugObj.positives.flat()) } })
    const pagesData = paginate(orderData(filteredData), page, 100)
    const pageCount = Math.ceil(filteredData.length / 100)

    return <>

        <TopNavigation selected={0} />

        <ProductCategoryChip category={slugObj.name} />
        <Container maxWidth sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <ProductCategoryChip category={pagesData[0].category} /> */}
            {/* <PopupMenuColor /> */}
        </Container>

        <Container maxWidth>
            <KeywordsTabContainer keywords={slugObj.keywords} rawData={result} slug={slug} />
        </Container>
        <Container maxWidth>

            <span style={{ color: '#5e5e5e', paddingLeft: 10 }}>
                {filteredData.length} adet
            </span>

        </Container>


        <Drawer slug={slug} > <Container maxWidth>

            {/* <GenderTabContainer value={genderIndex} /> */}

            <Grid container gap={1} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' } }}>
                {pagesData.map((m, i) => { return <Grid item key={i} > <Image matchingCategories={[...slugObj.keywords, ...slugObj.positives.flat(), ...slugObj.words]} {...m} subcat={''} /></Grid> })}</Grid>
            <PaginationContainer count={pageCount} page={parseInt(page)} url={`/sponsor-kiyafeti/kadin/${slug[1]}/${selectedKeyword}/sayfa/`} />
        </Container>
        </Drawer>
    </>
    //

}





export function GenderTabContainer({ value = 0 }) {

    return <Container sx={{ display: 'flex', justifyContent: "center" }}> <Tabs value={value} sx={{ marginBottom: 1 }} variant="scrollable" scrollButtons allowScrollButtonsMobile>
        <Tab label="Kadın" component='a' href="/sponsor-kiyafeti" />
        <Tab label="Erkek" component='a' href="/sponsor-kiyafeti/erkek" />
        {/* <Tab label="Kız Çocuk" component={Link} href="/sponsor-kiyafeti/kiz-cocuk" />
        <Tab label="Erkek Çocuk" href="/dizi-sponsoru/erkek-cocuk" />
        <Tab label="Diğer" component={Link} href="/sponsor-kiyafeti/diğer" /> */}
    </Tabs></Container>
}

export function KeywordsTabContainer({ value = 1000, keywords, rawData, slug }) {
console.log("keywords",keywords)
    const keywordsWithImg =[]
    for (let k of keywords){
        const obj = rawData.find(f=> f.subcat===k)
        if(obj){
            keywordsWithImg.push({imageUrl:obj.image[0],keyword:k})
        }
    }
    // keywords.map((m,i)=>m).join('-') 
   
    return <Tabs value={value} sx={{ marginBottom: 0 }} variant="scrollable" scrollButtons allowScrollButtonsMobile>
        {keywordsWithImg.map((m, i) => <Tab key={i} label={<KeywordItem imageUrl={m.imageUrl} keyword={m.keyword} selected={decodeURI(slug[2]) ===m.keyword} href={`/sponsor-kiyafeti/kadin/${slug[1]}/${decodeURI(slug[2]) ===m.keyword?keywords.map((m,i)=>m).join('-') :  m.keyword}/sayfa/1`} />} />)}
    </Tabs>
}

function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}



function extractFacet(rawData, facetCandidate) {
    return rawData.reduce((total, currentValue, currentIndex, arr) => {

        for (let facet in total) {

            const currentFacet = total[facet]
            const obj = { ...currentValue, category: "" }
            const exists = searchObject(obj, [facet.replaceAll('-', ' ')])

            if (exists) {

                const next = currentFacet.total + 1

                return { ...total, [facet]: { ...currentFacet, total: next } }
            } else {

                // return {...total}
            }

        }
        return total

    }, facetCandidate)

}

function extractPriceFacet(rawData, facetCandidate) {
    return rawData.reduce((total, currentValue, currentIndex, arr) => {

        for (let facet in total) {
            const start = facet.split('-')[0]
            const end = facet.split('-')[1]

            const currentFacet = total[facet]
            const price = currentValue.price
            const exists = (price >= start && price <= end)

            if (exists) {

                const next = currentFacet.total + 1

                return { ...total, [facet]: { ...currentFacet, total: next } }
            } else {

                // return {...total}
            }

        }
        return total

    }, facetCandidate)

}



// export async function generateStaticParams() {
//     const sponsorkiyafetiMenuRaw = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/kadin/sponsorkiyafetiMenu.json`), 'utf8');

//     const objData = Object.values(JSON.parse(sponsorkiyafetiMenuRaw)).map(m => Object.keys(m)).flat().map(d => deaccent(d).toLowerCase().replaceAll(' ', '-').replaceAll(',', ''))
//     const pageCandidates =[]

//     for(let category of objData){
//         const data = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/kadin/${category}-sponsorkiyafeti.json`), 'utf8');
//         const rawData = orderData(JSON.parse(data)).filter(f => !f.error)
//       const  categories = [category.split('-'),...category.split('-').map(m=>[m])]

// for(let matchingCategories of categories){

//     const filteredByUrlData = rawData.filter((obj, i) => {
//         let object = {}

//         if (matchingCategories.length === 1) {
//             object = { ...obj, category: "", pageTitle: "", duplicateTitles: "", pageUrl: "" }
//         } else {
//             object = obj
//         }

//         if (searchObject(object, matchingCategories)) {
//             return true
//         } else {
//             return false
//         }

//     })
//     const pageCount = Math.ceil(filteredByUrlData.length / 100)
// pageCandidates.push({category,pageCount,keInit: category.split('-').length===matchingCategories.length? matchingCategories.map((m, i) => i.toString()).join(''):category.split('-').indexOf(matchingCategories[0]).toString() })


// }


//     }
//     const pages =flattenArrayByPageCount(pageCandidates)


//     return pages.map((content) => {
//      const {category,keInit,page}=content

//         return {
//             slug: ['kadin', category, keInit, 'sayfa', page.toString()]
//         }
//     })
// }


function flattenArrayByPageCount(arrayOfObjects) {
    return arrayOfObjects.flatMap(obj => {
        const { category, pageCount, keInit } = obj;
        return Array.from({ length: pageCount }, (_, index) => ({
            category: category,
            keInit,
            page: index + 1
        }));
    });
}




