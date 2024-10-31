
import Container from '@mui/material/Container'
import Application from "./Application"
import SponsorGiyimDrawerContainer from './components/drawer/SponsorGiyimDrawerContainer'

debugger
export default function SponsorGiyim(props) {

    debugger
    return <Container>
        <SponsorGiyimDrawerContainer selectedGender={'kadın'}>
            <Application {...props} selectedGender={'kadın'} />
        </SponsorGiyimDrawerContainer>
    </Container>
}

// export async function generateStaticParams() {

//     return []
// }