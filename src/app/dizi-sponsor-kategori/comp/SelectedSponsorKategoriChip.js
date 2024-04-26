'use client';
import Box  from "@mui/material/Box";
import Chip from "@mui/material/Chip";
export default function SelectedSponsorKategoriChip({category}){

    return  <Box sx={{display:'flex', justifyContent:'center',margin:2}}><Chip component='h1' size="small" color="primary" variant="outlined" label={category} onDelete={()=>{window.location.replace('/dizi-sponsor-kategori') }}/></Box> 
}