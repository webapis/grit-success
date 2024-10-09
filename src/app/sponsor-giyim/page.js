import Navigation from "./components/Navigations"
import navigation from './nav/navigation.json'
import Container from '@mui/material/Container'

debugger
export default function SponsorGiyim(){
    const data =navigation[0]
    debugger
    return <Container>

        <Navigation navigationData={data}/>
    </Container>
}