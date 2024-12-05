'use client';
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
export default function SelectedProductCategoryChip({ selectedGender, category }) {

    return <Box sx={{ display: 'flex', justifyContent: 'center', margin: 0.5, textTransform:'capitalize' }}><Chip component='h1'  color="primary" variant="outlined" sx={{ padding: 0.5 }} label={<Typography variant='caption' textAlign='center' sx={{textTransform:'capitalize', margin: 0}}>{selectedGender.replaceAll('-',' ')} {' '}
        <Typography component="span" variant='caption' sx={{ fontWeight: 'bold' }}>
            {category}
        </Typography>
        {' '}Dizi Sponsor Markaları</Typography>} onDelete={() => { window.location.replace(`/sponsor-giyim/${selectedGender.replaceAll(' ','-')}`) }} /></Box>
}