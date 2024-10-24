
import Container from '@mui/material/Container'
import Application from '../Application'
import SponsorGiyimDrawer from '../components/drawer/SponsorGiyimDrawer'


import genderData from '../components/genderData'

export default function SponsorGiyim(props) {
    const { params: { gender } } = props

debugger
    const selectedGender = genderData.find(f => f.urlGender === decodeURI(gender)).index

    return <Container>
        <SponsorGiyimDrawer title="Sponsor Giyim" selectedGender={selectedGender}>
        <Application {...props} selectedGender={selectedGender} />
        </SponsorGiyimDrawer>
  

    </Container>
}