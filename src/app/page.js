

//import Application from "../app/home/components/Application"
import TopNavigation from "./components/TopNavigation";
import RootComponent from "./root/RootComponent";
import pagesData from '@/app/root/category.json'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
export async function generateMetadata() {

  return {
    title: 'Dizi Kıyafetleri',

  }

}

export default async function Home(props) {

  return <>
    <TopNavigation selected={1000} />
    <Container>
      <Grid gap={1} container sx={{ display: 'flex', justifyContent: 'center' }}>
        {pagesData.map((m) => <Grid item xs={5}> <RootComponent title={m.title} url={m.url} /> </Grid>)}
      </Grid>
    </Container>
  </>

}


