
import { promises as fs } from 'fs';
import Grid from "@mui/material/Grid";
//import koleksiyon from "@/app/sponsor-kiyafeti/koleksiyon/meta-data/koleksiyon.json";
import mergedCategories from '../utils/mergedCategories.mjs'
import searchObject from "../utils/searchObject.mjs";
import Image from "./comp/Image";
import orderData from "../../[...slug]/orderData";
import PaginationContainer from "../../comp/PaginationContainer";
import getData from '../utils/getData.mjs';
export default async function SlugForKoleksiyon(props) {
    const { params: { slug } } = props
    const slugObj = mergedCategories.find(f => f.slug === decodeURI(slug[0]))
      const rawData = await fs.readFile(process.cwd() + `/src/app/sponsor-kiyafeti/koleksiyon/data/kadin/${decodeURI(slug[0])}.json`, 'utf8');
    const data =JSON.parse(rawData)
    debugger
    const page = slug[slug.length - 1]

    const selectedKeyword = decodeURI(slug[slug.length - 3])
    const initLoad = selectedKeyword.split('-').length === slugObj.keywords.length
    const positives = slugObj.db.length > 0 ? slugObj.db : slugObj.positives.flat()
    const selectedPositives = initLoad ? positives : slugObj.positives.find(f => f.includes(selectedKeyword))
    console.log('slugObj.db', slugObj.db)
    debugger
    //const selectedPositives = slugObj.positives.filter(f=> )

    //const data = getData({ positives: positives,negatives:slugObj.negatives, exclude: slugObj.exclude })
    debugger
    const result = data.filter(f => searchObject({ ...f, ...slugObj.exclude }, selectedPositives).length > 0).map(m => { return { ...m, keywords: searchObject(m, slugObj.positives.flat()) } })
    const pagesData = paginate(orderData(result), page, 100)
    const pageCount = Math.ceil(result.length / 100)
    debugger
    return <Grid container gap={1} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' } }}>
        <Grid item xs={12}>
            {slugObj.keywords.map((m, i) => <a href={`/sponsor-kiyafeti/koleksiyon/${slug[0]}/${m}/sayfa/1`} style={{ marginRight: 5 }}>{m}</a>)}
        </Grid>
        <Grid item xs={12}>{result.length}</Grid>
        {pagesData.map((m, i) => { return <Grid item key={i} > <Image matchingCategories={[...slugObj.keywords, ...slugObj.positives.flat(), ...slugObj.words]} {...m} subcat={''} /></Grid> })}
        <Grid item xs={12}>
            <PaginationContainer count={pageCount} page={page} url={`/sponsor-kiyafeti/koleksiyon/${slug[1]}/${selectedKeyword}/sayfa/`} />
        </Grid>
    </Grid>
}

function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}