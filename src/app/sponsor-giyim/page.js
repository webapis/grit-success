
import Container from '@mui/material/Container'
import Application from "./Application"
import SponsorGiyimDrawerContainer from './components/drawer/SponsorGiyimDrawerContainer'

debugger



export  function generateMetadata({ params: { id, gender, kategori, altkategori } }) {


    return {
  
        title:   `Dizi Sponsoru Giyim Markalar`
  
    }
  }

export default function SponsorGiyim(props) {

    debugger
    return <Container>
     
            <Application {...props} selectedGender={'kadın'} />
   
    </Container>
}

// export async function generateStaticParams() {

//     return []
// }