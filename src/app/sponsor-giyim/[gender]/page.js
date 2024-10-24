
import Container from '@mui/material/Container'
import Application from '../Application'
import SponsorGiyimDrawer from '../components/drawer/SponsorGiyimDrawer'

import { data } from '../components/GenderCards'


export default function SponsorGiyim(props) {
    const { params: { gender } } = props
    debugger

    const selectedGender = data.find(f => f.urlGender === decodeURI(gender)).index
    debugger
    return <Container>
        <SponsorGiyimDrawer title="Sponsor Giyim" selectedGender={selectedGender}>
        <Application {...props} selectedGender={selectedGender} />
        </SponsorGiyimDrawer>
  

    </Container>
}