'use client';
import { Chip } from "@mui/material";

export default function ProductCategoryChip({category}){

    return <Chip label={category} onDelete={()=>{window.location.replace('/sponsor-kiyafeti') }}/>
}