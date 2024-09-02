import BlogBox from "./components/blog/BlogBox"
import blogBoxData from './components/blog/blogBoxData'
import { Grid, Container } from "@mui/material"
export default function KadinKazak(){

    return <Container> <Grid container spacing={1}>{blogBoxData.map(m=><Grid item xs={12}><BlogBox {...m} /> </Grid>)}</Grid> </Container>
}