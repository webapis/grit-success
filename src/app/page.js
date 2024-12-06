


import GenderCards from "./sponsor-giyim/components/gender-card/GenderCards"
import BreadcrumbsComponent from "@/app/components/BreadcrumbsComponent"
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export  function generateMetadata() {

  return {
    title: 'Dizi Sponsoru Giyim Makralar',

  }
}

export default  function Home(props) {


  return <>
      <Container >
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            backgroundColor: 'background.paper',
            borderRadius: 2
          }}
        >
          <BreadcrumbsComponent
            items={[
              { label: 'Ana Sayfa', href: '/', icon: HomeIcon }
            ]}
          />
        </Paper>
      </Container>

 
      <GenderCards />
  

  </>

}