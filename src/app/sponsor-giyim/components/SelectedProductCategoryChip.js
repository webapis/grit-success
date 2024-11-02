'use client';
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
export default function SelectedProductCategoryChip({ selectedGender, category }) {

    return <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2, textTransform:'capitalize' }}><Chip component='h1'  color="primary" variant="outlined" label={<Typography variant='caption' textAlign='center' sx={{textTransform:'capitalize'}}>Sponsor {selectedGender.replaceAll('-',' ')} {category} Markalar</Typography>} onDelete={() => { window.location.replace(`/sponsor-giyim/${selectedGender.replaceAll(' ','-')}`) }} /></Box>
}