


import TopNavigation from "./components/TopNavigation"

import GenderCards from "./sponsor-giyim/components/GenderCards"
import SponsorGiyimDrawerContainer from "./sponsor-giyim/components/drawer/SponsorGiyimDrawerContainer"

export async function generateMetadata() {

  return {
    title: 'Sponsor Kiyafeti',

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