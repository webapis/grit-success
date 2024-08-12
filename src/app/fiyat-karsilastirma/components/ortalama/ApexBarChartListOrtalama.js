
'use client'
import React from "react";
import { Grid } from "@mui/material";
import ApexBarChartOrtalama from "./ApexBarChartOrtalama";
export default function ApexBarChartListOrtalama({ data, category }) {
 

    function onCategoryClick(e,link){


        if (link && link.pageURL) {
            window.open(link.pageURL, '_blank');
        }
    }

    return <Grid container> {data.map((current,i) => {
        const categories = current.data.map(m => m.brand)
        const data = current.data.map((m) => m.price)
        const links =current.data.map((m) =>m.urls)
   
        const label = current.groupTitle +` ortalama ${category} fiyatlar`
        return <Grid item key={i} xs={12}> <ApexBarChartOrtalama links={links}  categories={categories} data={data} label={label} onCategoryClick={onCategoryClick} /></Grid>
    })}</Grid>
}




