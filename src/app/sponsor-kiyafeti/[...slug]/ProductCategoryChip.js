'use client';
import { Chip,Box } from "@mui/material";

export default function ProductCategoryChip({category}){

    return <Box sx={{display:'flex',justifyContent:'center',width:'100%', margin:2}}><Chip component="h1" color="primary" variant="outlined" label={category} onDelete={()=>{window.location.replace('/sponsor-kiyafeti') }}/></Box> 
}