'use client';
import { Chip,Box } from "@mui/material";

export default function SelectedDiziChip({category}){

    return  <Box sx={{display:'flex', justifyContent:'center',margin:2}}><Chip component='h1' size="small" color="primary" variant="outlined" label={category} onDelete={()=>{window.location.replace('/dizisponsoru') }}/></Box> 
}