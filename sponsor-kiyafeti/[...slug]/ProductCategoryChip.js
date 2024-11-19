'use client';
//import { Chip,Box,Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
//import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import Button from "@mui/material/Button";
// export default function ProductCategoryChip({category}){

//     return <Box sx={{display:'flex',justifyContent:'center',width:'100%', margin:2}}><Chip size="small" component="h1" color="primary" variant="outlined" label={category} onDelete={()=>{window.location.replace('/sponsor-kiyafeti') }}/></Box> 
// }
export default function BasicBreadcrumbs({category}) {
    return (
      
        <Breadcrumbs aria-label="breadcrumb"   separator={<NavigateNextIcon fontSize="small" style={{display:'flex',alignItems:"start", marginTop:1}}/>}>
          <Button component='a' startIcon={<HomeIcon />} href="/" style={{textDecoration:'none', textTransform:'capitalize', fontFamily:'inherit',fontSize:14}}>  Anasayfa</Button>
     
 
          <Typography   style={{textDecoration:'none', fontFamily:'inherit',fontSize:14}}>{category.replaceAll(',','-').substring(0,category.indexOf(','))} ...</Typography>
        </Breadcrumbs>
   
    );
  }