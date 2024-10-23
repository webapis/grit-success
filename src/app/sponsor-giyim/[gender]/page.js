
import Container from '@mui/material/Container'
import Application from '../Application'
import TopNavigation from '@/app/components/TopNavigation'

import { data } from '../components/GenderCards'


export default function SponsorGiyim(props) {
    const { params: { gender } } = props


    const selectedGender = data.find(f => f.urlGender === gender).index

    return <Container>
        <TopNavigation selected={0} />
        <Application {...props} selectedGender={selectedGender} />

    </Container>
}