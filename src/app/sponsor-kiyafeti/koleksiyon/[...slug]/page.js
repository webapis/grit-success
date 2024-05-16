
import Grid from "@mui/material/Grid";
import koleksiyon from "@/app/sponsor-kiyafeti/koleksiyon/meta-data/koleksiyon.json";
import getData from "../utils/getData";
import searchObject from "../utils/searchObject";
import Image from "./comp/Image";
import orderData from "../../[...slug]/orderData";
import PaginationContainer from "../../comp/PaginationContainer";
export default function SlugForKoleksiyon(props) {
    const { params: { slug } } = props
    const slugObj = koleksiyon.find(f => f.slug === slug[0])
    const data = getData()
    const result = data.filter(f => searchObject(f, slugObj.positives))
    const page = slug[slug.length - 1]

    const pagesData = paginate(orderData(result), page, 100)
    const pageCount = Math.ceil(result.length / 100)
    debugger
    return <Grid container gap={1} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' } }}>
        <Grid item xs={12}>{result.length}</Grid>
        {pagesData.map((m, i) => { return <Grid item key={i} > <Image matchingCategories={[]} {...m} subcat={''} /></Grid> })}
        <Grid item xs={12}>
            <PaginationContainer count={pageCount} page={page} url={`/sponsor-kiyafeti/sponsor-kiyafeti/koleksiyon/${slug[0]}/sayfa/`} />
        </Grid>
    </Grid>
}

function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}