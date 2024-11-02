

import Application from '../Application'
import SponsorGiyimDrawerContainer from '../components/drawer/SponsorGiyimDrawerContainer'


import genderData from '../components/genderData'



export  function generateMetadata({ params: { gender } }) {

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replaceAll('-',' ');
  
    return {
  
        title:   `${capitalize(decodeURI(gender))} | Dizi Sponsoru Giyim Markalar`
  
    }
  }
export default function SponsorGiyim(props) {
    const { params: { gender } } = props


    const selectedGender = genderData.find(f => f.urlGender === decodeURI(gender)).urlGender

    return <>
        <SponsorGiyimDrawerContainer title="Sponsor Giyim" selectedGender={selectedGender}>
            <Application {...props} selectedGender={selectedGender} />
        </SponsorGiyimDrawerContainer>


    </>
}


export async function generateStaticParams() {

    return genderData.map(m => { return  { gender: m.urlGender  } })
}