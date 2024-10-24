


import TopNavigation from "./components/TopNavigation"
import  Container  from "@mui/material/Container"
import GenderCards from "./sponsor-giyim/components/GenderCards"
import SponsorGiyimDrawer from "./sponsor-giyim/components/drawer/SponsorGiyimDrawer"
export async function generateMetadata() {

  return {
    title: 'Sponsor Kiyafeti',

  }
}

export default async function Home(props) {


  return <Container> 
    <SponsorGiyimDrawer selectedGender={0}>
    <TopNavigation selected={0}/>
    <GenderCards/>
    </SponsorGiyimDrawer>

</Container>

}