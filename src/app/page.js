

import SponsorGiyimDrawerContainer from "./sponsor-giyim/components/drawer/SponsorGiyimDrawerContainer"
import GenderCards from "./sponsor-giyim/components/gender-card/GenderCards"
import TopNavigation from "./components/TopNavigation"
export  function generateMetadata() {

  return {
    title: 'Dizi Sponsoru Giyim Makralar',

  }
}

export default  function Home(props) {


  return <>
    <TopNavigation selected={0} />
    <SponsorGiyimDrawerContainer selectedGender={'kadın'}>

      <GenderCards />
    </SponsorGiyimDrawerContainer>

  </>

}