
import Container from '@mui/material/Container'
import Application from '../Application'
import SponsorGiyimDrawerContainer from '../components/drawer/SponsorGiyimDrawerContainer'


import genderData from '../components/genderData'

export default function SponsorGiyim(props) {
    const { params: { gender } } = props

debugger
    const selectedGender = genderData.find(f => f.urlGender === decodeURI(gender)).index

    return <Container>
        <SponsorGiyimDrawerContainer title="Sponsor Giyim" selectedGender={selectedGender}>
        <Application {...props} selectedGender={selectedGender} />
        </SponsorGiyimDrawerContainer>
  

    </Container>
}