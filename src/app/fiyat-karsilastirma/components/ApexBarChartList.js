
import React from "react";
import { Grid } from "@mui/material";
import ApexBarChart from "./ApexBarChart";
export default function ApexBarChartList({ data }) {
 

    return <Grid container> {data.map((current,i) => {
        const categories = current.map(m => m.brand)
        const data = current.map((m) => m.price)
        const label = (i+1) + '. Grup Ortalama Fiyat'
        return <Grid item key={i} xs={12}> <ApexBarChart  categories={categories} data={data} label={label} /></Grid>
    })}</Grid>
}




