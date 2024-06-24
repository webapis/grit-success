
import { promises as fs } from 'fs';
import { Container } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import path from 'path'
import orderData from "./orderData";
import PaginationContainer from "../comp/PaginationContainer";

import TopNavigation from "@/app/components/TopNavigation";
import ProductCategoryChip from "./ProductCategoryChip";
import KeywordItem from '../comp/KeywordItem';
import mergedCategories from '../utils/mergedCategories.mjs'
import searchObject from "../utils/searchObject.mjs";
import ProductContainer from '../comp/ProductContainer';
import { mappedNavData } from '../Application';
import PersistentDrawerLeft from '@/app/components/drawer';



export  function generateMetadata({ params }) {

    const { slug } = params

    let gender = decodeURI(slug[0])
    let category = decodeURI(slug[2])

    return {

        title: 'Sponsor Kıyafeti-' + gender + ' ' + category.replaceAll('-', ' ')

    }
}

export default async function SponsorKiyafetiPage({ params }) {
    debugger
    // const isDev = process.env.NODE_ENV === 'development';
    const { slug } = params
    debugger
    const slugObj = mergedCategories.find(f => f.slug === decodeURI(slug[1]))
    const selectedKeyword = decodeURI(slug[slug.length - 3])
    debugger
    const initLoad = selectedKeyword.split('-').length === slugObj.keywords.length
    const positives = slugObj.db.length > 0 ? slugObj.db : slugObj.positives.flat()
    const selectedPositives = initLoad ? positives : slugObj.positives.find(f => f.includes(selectedKeyword))
    debugger

    let data = null

    const rawData = await fs.readFile(process.cwd() + `/src/app/sponsor-kiyafeti/data/kadin/${decodeURI(slug[1])}-sponsorkiyafeti.json`, 'utf8');
    data = JSON.parse(rawData)




    const page = slug[slug.length - 1]



    debugger

    debugger
    const result = data//.filter(f => searchObject({ ...f, ...slugObj.exclude }, positives).length > 0)//.map(m => { return { ...m, keywords: searchObject(m, slugObj.positives.flat()) } })
    const filteredData =result.filter(f => searchObject({ ...f, ...slugObj.exclude }, selectedPositives).length > 0)//.map(m => { return { ...m, keywords: searchObject(m, slugObj.positives.flat()) } })
    const pagesData = paginate(orderData(filteredData), page, 100)
    const pageCount = Math.ceil(filteredData.length / 100)

    return <>

        <TopNavigation selected={0} />

        <ProductCategoryChip category={slugObj.name} />
        <Container maxWidth sx={{ display: 'flex', justifyContent: 'space-between' }}>
       
        </Container>

        <Container maxWidth>
            <KeywordsTabContainer keywords={slugObj.keywords} rawData={result} slug={slug} />
        </Container>
        <Container maxWidth>

            <span style={{ color: '#5e5e5e', paddingLeft: 10 }}>
                {filteredData.length} adet
            </span>

        </Container>


        <PersistentDrawerLeft data={mappedNavData} title="Sponsor Kıyafeti"> <Container maxWidth>
            <ProductContainer data={pagesData} slugObj={slugObj} />
            <PaginationContainer count={pageCount} page={parseInt(page)} url={`/sponsor-kiyafeti/kadin/${slug[1]}/${selectedKeyword}/sayfa/`} />
        </Container>
        </PersistentDrawerLeft>
    </>


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

    const keywordsWithImg = []
    for (let k of keywords) {
        const obj = rawData.find(f => f.subcat === k)
        if (obj) {
            keywordsWithImg.push({ imageUrl: obj.image[0], keyword: k })
        }
    }


    return <Tabs value={value} sx={{ marginBottom: 0 }} variant="scrollable" scrollButtons allowScrollButtonsMobile>
        {keywordsWithImg.map((m, i) => { return { ...m, id: decodeURI(slug[2]) === m.keyword ? 0 : i + 1 } }).sort((a, b) => a.id - b.id).map((m, i) => <Tab key={i} label={<KeywordItem imageUrl={m.imageUrl} keyword={m.keyword} selected={decodeURI(slug[2]) === m.keyword} href={`/sponsor-kiyafeti/kadin/${slug[1]}/${decodeURI(slug[2]) === m.keyword ? keywords.sort().map((m, i) => m).join('-') : m.keyword}/sayfa/1`} />} />)}
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



export async function generateStaticParams() {
    const sponsorkiyafetiMenuRaw = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/kadin/sponsorkiyafetiMenu.json`), 'utf8');

    const objData = JSON.parse(sponsorkiyafetiMenuRaw)
    const pageCandidates = []

    for (let category of objData) {


        const exclude = category.exclude
        const slug = category.slug
        const keywords = category.keywords

        const data = await fs.readFile(path.join(process.cwd(), `src/app/sponsor-kiyafeti/data/kadin/${slug}-sponsorkiyafeti.json`), 'utf8');
        const rawData = orderData(JSON.parse(data)).filter(f => !f.error)

        const categories = [keywords, ...keywords.map(m => [m])]


        for (let matchingKeywords of categories) {

            const filteredData = rawData.filter(f => searchObject({ ...f, exclude }, matchingKeywords).length > 0)

            const pageCount = Math.ceil(filteredData.length / 100)

            pageCandidates.push({ category: slug, pageCount, keInit: matchingKeywords.sort().map((m, i) => m).join('-') })

        }


    }
    const pages = flattenArrayByPageCount(pageCandidates)


    return pages.map((content) => {
        const { category, keInit, page } = content

        return {
            slug: ['kadin', category, keInit, 'sayfa', page.toString()]
        }
    })
}


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




