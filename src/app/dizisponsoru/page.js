import Application,{mappedData} from "./Application"
import BreadcrumbsComponent from "@/app/components/BreadcrumbsComponent"
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export  function generateMetadata() {
  return {
    title: 'Dizi Sponsoru',

  }
}

export default function Home(props) {
  return <Container maxWidth="xl">
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 0, 
          backgroundColor: 'background.paper',
          borderRadius: 2
        }}
      >
        <BreadcrumbsComponent
          items={[
            { label: 'Ana Sayfa', href: '/', icon: HomeIcon },
            { label: 'Dizi Sponsoru' }
          ]}
        />
      </Paper>

      <Application {...props}/>

      </Container>
}