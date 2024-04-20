//import Application from "../Application"
import { promises as fs } from 'fs';
import Link from 'next/link';
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
import searchObject from '../utils/searchObject';
import KeywordItem from '../comp/KeywordItem';
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

    const { slug } = params
    debugger
    let gender = decodeURI(slug[0])
    let category = decodeURI(slug[1])
    let page = parseInt(decodeURI([...slug].reverse()[0]))
    //categoryIndex
    const selectedKeywords = [...slug].reverse()[2]
    const categoryIndex = category.split('-').map((m, i) => { return { index: i.toString(), category: m } })
    const matchingCategories = categoryIndex.filter(f => selectedKeywords.includes(f.index))

    //colors
    let urlColors = Object.keys(colors)


    const matchingColors = findMatching(slug.map(m => decodeURI(m)), urlColors)
    //marka 
    let urlBrands = Object.keys(brands)
    const matchingBrands = findMatching(slug.map(m => decodeURI(m)), urlBrands)
    //price
    let urlPrice = Object.keys(prices)
    const matchingPrices = findMatching(slug.map(m => decodeURI(m)), urlPrice)


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
    const rawData = orderData(JSON.parse(data)).filter(f => !f.error)
    const filteredByUrlData = rawData.filter((obj, i) => {
        let object = {}

        if (matchingCategories.length === 1) {
            object = { ...obj, category: "", pageTitle: "", duplicateTitles: "", pageUrl: "" }
        } else {
            object = obj
        }

        if (searchObject(object, matchingCategories.map(m => m.category))) {
            return true
        } else {
            return false
        }

    }).filter(f => matchingColors.length > 0 ? searchObject(f, matchingColors) : true).filter(f => matchingBrands.length > 0 ? searchObject(f, matchingBrands.map(m => m.replaceAll('-', ' '))) : true).filter(f => matchingPrices.length > 0 ? findMatchingPrice(f.price, matchingPrices) : true)

    let colorFacet = extractFacet(filteredByUrlData, colors)
    let brandFacet = extractFacet(filteredByUrlData, brands)
    let priceFacet = extractPriceFacet(filteredByUrlData, prices)

    debugger
    const pagesData = paginate(orderData(filteredByUrlData), page, 100)
    const pageCount = Math.ceil(filteredByUrlData.length / 100)
    debugger

    return <>
 <Box sx={{width:"100%"}}>
 <TopNavigation selected={0} />
 </Box>
 <Box sx={{width:"100%"}}>
 <KeywordsTabContainer category={category} rawData={rawData} slug={slug} />
    </Box>
    
       
        <Drawer colors={colorFacet} slug={slug} brands={brandFacet} prices={priceFacet}> <Container>
            <ProductCategoryChip category={rawData[0].category} />
            {/* <GenderTabContainer value={genderIndex} /> */}
        
            <Grid container gap={1} sx={{ display: 'flex', justifyContent: 'center' }}> {pagesData.map((m, i) => <Grid item key={i} > <Image matchingCategories={matchingCategories} {...m} pageTitle={''} /></Grid>)}</Grid>
            <PaginationContainer count={pageCount} page={page} url={`/sponsor-kiyafeti/${gender}/${category}/1/sayfa/`} />
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

export function KeywordsTabContainer({ value = 1000, category, rawData, slug }) {
    const selectedKeywords = [...slug].reverse()[2]
    const categoryIndex = category.split('-').map((m, i) => i.toString()).join('')
    const initialAllSelection = selectedKeywords === categoryIndex

    return <Container sx={{ display: 'flex', justifyContent: "center" }}> <Tabs value={value} sx={{ marginBottom: 1 }} variant="scrollable" scrollButtons allowScrollButtonsMobile>

        {category.split('-').map(m => {


            const imageUrl = rawData.find(r => {
                const obj = {...r, category: '' }
                return searchObject(obj, [m])
            })
            if(!imageUrl){
                console.log('m-',m, imageUrl)
            }
            if (imageUrl) {
                return { image: imageUrl.image[0], label: m }
            }
            return null


        }).filter((f, i) => f).map((m, i) => {
            const keywordIndex = [...slug].reverse()[2]
            const removeUrl = keywordIndex === i.toString() ? categoryIndex : i.toString()
            const reversedUrl = [...slug].reverse()
            reversedUrl[2] = removeUrl
            const nextUrl = '/sponsor-kiyafeti/' + reversedUrl.reverse().join('/')

            return <Tab key={m} label={<KeywordItem selected={selectedKeywords === i.toString()} nextUrl={nextUrl} initialAllSelection={initialAllSelection} image={m.image} label={m.label} slug={slug} category={category} />} />
        })
        }

    </Tabs></Container>
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



export async function generateStaticParams() {
    const data = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/kadin/sponsorkiyafetiMenu.json`), 'utf8');

    const objData = Object.values(JSON.parse(data)).map(m => Object.keys(m)).flat().map(d => deaccent(d).toLowerCase().replaceAll(' ', '-').replaceAll(',', ''))


    return objData.map((category) => {


        return {
            slug: ['kadin', category, 'sayfa', '1']
        }

    })
}




