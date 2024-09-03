import BlogBox from "./components/blog/BlogBox"
import blogBoxData from './components/blog/blogBoxData'
import { Grid, Container, Typography } from "@mui/material"
import PersistentDrawerLeft from "./components/AppBarComp"


export async function generateMetadata({ params: { slug } }) {


    return {
        title: "kazak yaka çeşitleri",
        description: "Kazak çeşitleri, Kazak yaka çeşitleri",
     

    }
}
export default function KadinKazak() {

    return <PersistentDrawerLeft> <Container sx={{ marginTop: 3 }}><Typography variant="h4" >Kazak Çeşitleri</Typography> <Grid container spacing={1} >{blogBoxData.map(m => <Grid item xs={12}><BlogBox {...m} /> </Grid>)}</Grid> </Container></PersistentDrawerLeft>
}