'use client';
import { Chip,Box,Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
// export default function ProductCategoryChip({category}){

//     return <Box sx={{display:'flex',justifyContent:'center',width:'100%', margin:2}}><Chip size="small" component="h1" color="primary" variant="outlined" label={category} onDelete={()=>{window.location.replace('/sponsor-kiyafeti') }}/></Box> 
// }
export default function BasicBreadcrumbs({category}) {
    return (
      <Container role="presentation" sx={{marginTop:1}}>
        <Breadcrumbs aria-label="breadcrumb"   separator={<NavigateNextIcon fontSize="small" />}>
          <Link underline="hover" color="inherit" href="/">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Anasafa
          </Link>
 
          <Typography color="text.primary" style={{textDecoration:'underline'}}>{category.replaceAll(',','-')}</Typography>
        </Breadcrumbs>
      </Container>
    );
  }