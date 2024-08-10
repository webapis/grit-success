
'use client'
import React from "react";
import { Grid } from "@mui/material";
import ApexBarChart from "./ApexBarChart";
export default function ApexBarChartList({ data, category }) {
 

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
        return <Grid item key={i} xs={12}> <ApexBarChart links={links}  categories={categories} data={data} label={label} onCategoryClick={onCategoryClick} /></Grid>
    })}</Grid>
}




