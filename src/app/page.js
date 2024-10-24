


import TopNavigation from "./components/TopNavigation"
import Container from "@mui/material/Container"
import GenderCards from "./sponsor-giyim/components/GenderCards"
import SponsorGiyimDrawerContainer from "./sponsor-giyim/components/drawer/SponsorGiyimDrawerContainer"
import getNavigationData from "./sponsor-giyim/components/getNavigationData"
export async function generateMetadata() {

  return {
    title: 'Sponsor Kiyafeti',

  }
}

export default async function Home(props) {


  return <Container>
    <SponsorGiyimDrawerContainer selectedGender={0}>
      <TopNavigation selected={0} />
      <GenderCards />
    </SponsorGiyimDrawerContainer>

  </Container>

}