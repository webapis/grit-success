import  Grid  from "@mui/material/Grid";
import koleksiyon from "@/app/sponsor-kiyafeti/koleksiyon/meta-data/koleksiyon.json";
export default function KoleksiyonPage (){
return <div>
<Grid container>
    {koleksiyon.map(m=>{
        debugger
        return <Grid item xs={12}> <a href={`/sponsor-kiyafeti/koleksiyon/${m.slug}/sayfa/1`}>{m.name}</a></Grid> })}
        </Grid>
</div>
}



function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}
