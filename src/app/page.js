

import Application from "./sponsor-giyim/Application"
import TopNavigation from "./components/TopNavigation"
import  Container  from "@mui/material/Container"
export async function generateMetadata() {

  return {
    title: 'Sponsor Kiyafeti',

  }
}

export default async function Home(props) {


  return <Container>    <TopNavigation selected={0}/>
    <Application {...props} gender="kadin"/>
</Container>

}