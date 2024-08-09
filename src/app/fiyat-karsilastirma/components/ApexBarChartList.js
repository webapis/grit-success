
import React from "react";
import { Grid } from "@mui/material";
import ApexBarChart from "./ApexBarChart";
export default function ApexBarChartList({ data, category }) {
 
debugger
    return <Grid container> {data.map((current,i) => {
        const categories = current.data.map(m => m.brand)
        const data = current.data.map((m) => m.price)
        const label = current.groupTitle +` ortalama ${category} fiyatlar`
        return <Grid item key={i} xs={12}> <ApexBarChart  categories={categories} data={data} label={label} /></Grid>
    })}</Grid>
}




