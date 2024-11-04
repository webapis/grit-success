


import TopNavigation from "./components/TopNavigation"

import GenderCards from "./sponsor-giyim/components/gender-card/GenderCards"
import SponsorGiyimDrawerContainer from "./sponsor-giyim/components/drawer/SponsorGiyimDrawerContainer"

export async function generateMetadata() {

  return {
    title: 'Dizi Sponsoru Giyim Makralar',

  }
}

export default async function Home(props) {


  return <>
    <TopNavigation selected={0} />
    <SponsorGiyimDrawerContainer selectedGender={'kadın'}>

      <GenderCards />
    </SponsorGiyimDrawerContainer>

  </>

}