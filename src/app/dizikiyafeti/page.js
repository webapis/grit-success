

import Application from "./comps/Application"
import BreadcrumbsComponent from "@/app/components/BreadcrumbsComponent"
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';

export  function generateMetadata() {

  return {
    title: 'Dizi Kıyafetleri',

  }

}

export default  function Home(props) {

  return <>
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
        { label: 'Ana Sayfa', href: '/', icon: HomeIcon },
        { label: 'Dizi Kıyafetleri' }
      ]}
    />
  </Paper>

  <Application/>
  
  </>

}


