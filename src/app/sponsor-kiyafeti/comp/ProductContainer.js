'use client'
import { useState } from "react"
import Grid from "@mui/material/Grid"
import Image from "./Image"
import ImageDialog from "./ImageDialog"

export default function ProductContainer({ data, slugObj }) {
    const [selectedProduct, setSelectedProduct] = useState(null)
    function handleSelect(obj) {
        setSelectedProduct(obj)
    }
    return <>
        <ImageDialog obj={selectedProduct} handleSelect={handleSelect} />
        <Grid container gap={0} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' }, padding: 0, margin: 0 }}>
            {data.map((m, i) => {
            
                return <Grid sx={{ padding: 0, margin: 0 }} item key={i} xs={6} sm={4} md={3} lg={2}> <Image slugObj={slugObj} handleSelect={handleSelect} matchingCategories={[...slugObj.keywords, ...slugObj.positives.flat(), ...slugObj.words]} {...m} subcat={''} /></Grid> })}</Grid></>
}   