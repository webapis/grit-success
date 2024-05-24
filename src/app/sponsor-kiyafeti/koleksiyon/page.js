import  Grid  from "@mui/material/Grid";
import mergedCategories from './utils/mergedCategories.mjs'
export default function KoleksiyonPage (){
return <div>
<Grid container>
    {mergedCategories.map(m=>{
     
        const keywordint =m.keywords.map((m,i)=>m).join('-') 
        return <Grid item xs={12}> <a href={`/sponsor-kiyafeti/koleksiyon/${m.slug}/${keywordint}/sayfa/1`}>{m.name}</a></Grid> })}
        </Grid>
</div>
}

function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}
