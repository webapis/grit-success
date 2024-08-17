
'use client'
import React from "react";
import { Grid } from "@mui/material";
import ApexBarChartSecenek from "./ApexBarChartSecenek";
export default function ApexBarChartListSecenek({ dataset }) {
    const { series, categories } = dataset

    debugger
    function onCategoryClick(e, link) {


        if (link && link.pageURL) {
            window.open(link.pageURL, '_blank');
        }
    }
    return <Grid container> {series.map((current, i) => {
       
        let cat = categories.map((m, index) => {
            const hidden = current.map((m, i) => m.data[index]).every(value => value === 0)
          
  

        return {category: m, hidden: hidden,index }
        })

        let revdata = current.map((m, i) => {return { name: m.name, data:m.data.map((m,ind)=>{
            debugger
            const catHidden = cat[ind].hidden
            debugger
            return {count:m,hidden:catHidden}}).filter(f=>!f.hidden).map((m)=>m.count) }}  )

        debugger

        return <Grid item key={i} xs={12}> <ApexBarChartSecenek links={[]} categories={cat.filter(f=>!f.hidden).map((m=>m.category))} data={ revdata? revdata:current} label={''} onCategoryClick={onCategoryClick} /></Grid>
    })}</Grid>
    //   return  <ApexBarChartSecenek  categories={categories} data={series} label={'tempLabel'} onCategoryClick={onCategoryClick} />
}




/*
    return <Grid container> {data.map((current,i) => {
        const categories = current.data.map(m => m.brand)
        const data = current.data.map((m) => m.price)
        const links =current.data.map((m) =>m.urls)
   
        const label = current.groupTitle +` ortalama ${category} fiyatlar`
        return <Grid item key={i} xs={12}> <ApexBarChartSecenek links={links}  categories={categories} data={data} label={label} onCategoryClick={onCategoryClick} /></Grid>
    })}</Grid>
*/