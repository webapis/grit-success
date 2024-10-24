
import Container from '@mui/material/Container'
import Application from "./Application"
import SponsorGiyimDrawer from './components/drawer/SponsorGiyimDrawer'

debugger
export default function SponsorGiyim(props) {

    debugger
    return <Container>
        <SponsorGiyimDrawer selectedGender={0}>
            <Application {...props} selectedGender={0} />
        </SponsorGiyimDrawer>
    </Container>
}

