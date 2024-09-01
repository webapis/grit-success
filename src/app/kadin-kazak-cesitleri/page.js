import BlogBox from "./components/blog/BlogBox"
import blogBoxData from './components/blog/blogBoxData'
import { Grid } from "@mui/material"
export default function KadinKazak(){

    return <Grid container spacing={1}>{blogBoxData.map(m=><Grid item><BlogBox {...m} /> </Grid>)}</Grid> 
}