
import Container from '@mui/material/Container'
import Application from '../Application'
import SponsorGiyimDrawerContainer from '../components/drawer/SponsorGiyimDrawerContainer'


import genderData from '../components/genderData'

export default function SponsorGiyim(props) {
    const { params: { gender } } = props

    console.log('props', props)
    
    const selectedGender = genderData.find(f => f.urlGender === decodeURI(gender)).index

    return <Container>
        <SponsorGiyimDrawerContainer title="Sponsor Giyim" selectedGender={selectedGender}>
            <Application {...props} selectedGender={selectedGender} />
        </SponsorGiyimDrawerContainer>


    </Container>
}


export async function generateStaticParams() {

    return genderData.map(m => { return  { gender: m.urlGender  } })
}