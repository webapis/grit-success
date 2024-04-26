'use client';
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
export default function SelectedDiziChip({ category }) {

    return <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}><Chip component='h1' size="small" color="primary" variant="outlined" label={category} onDelete={() => { window.location.replace('/dizikiyafeti') }} /></Box>
}