import BlogBox from "./components/blog/BlogBox"
import blogBoxData from './components/blog/blogBoxData'
import { Grid, Container, Typography } from "@mui/material"
import PersistentDrawerLeft from "./components/AppBarComp"


export async function generateMetadata() {


    return {
        title: "kazak yaka çeşitleri",
        description: "Salaş kazak, Baklava Desenli Kazak, Crop kazak ve diğer kazakların  çeşitleri, Kazak yaka çeşitleri, Kazak örnekleri",
        keywords:"Balıkçı Yaka Kazak, Bisiklet Yaka Kazak, Şal Yaka Kazak, Polo Yaka Kazak, V Yaka Kazak, Aran Kazak, Kazak Yelek, Ajurlu Kazak"
     

    }
}
export default function KadinKazak() {

    return <PersistentDrawerLeft> <Container sx={{ marginTop: 3 }}><Typography variant="h4" >Kazak Çeşitleri</Typography> <Grid container spacing={1} >{blogBoxData.map((m,i) => <Grid item xs={12} key={i}><BlogBox {...m} /> </Grid>)}</Grid> </Container></PersistentDrawerLeft>
}






// export async function generateStaticParams() {




//     return [{ slug: ["kadin-kazak-cesitleri"] }]
  
  
  
  
//   }