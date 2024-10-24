
import Container from '@mui/material/Container'
import Application from "./Application"
import SponsorGiyimDrawerContainer from './components/drawer/SponsorGiyimDrawerContainer'

debugger
export default function SponsorGiyim(props) {

    debugger
    return <Container>
        <SponsorGiyimDrawerContainer selectedGender={0}>
            <Application {...props} selectedGender={0} />
        </SponsorGiyimDrawerContainer>
    </Container>
}

// export async function generateStaticParams() {

//     return []
// }