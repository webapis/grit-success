import fs from 'fs';
import path from 'path';
import ProductCard from "../components/blog/ProductCard"
import { Grid } from '@mui/material';
import orderByMarka from '../components/blog/orderData';
export default function KadinKazak({ params: { slug } }){
    const keyword = slug[0]
debugger
    const metaFilePath = path.join(process.cwd(), 'aggregated-data/kadin-kazak', `${keyword}.json`);
    debugger
    debugger
    const metaDataRow = fs.readFileSync(metaFilePath, 'utf8');
    debugger
    const metaData = JSON.parse(metaDataRow)
    const orderedData =orderByMarka(metaData)
    debugger
    return <Grid container spacing={1}>{orderedData.filter((f,i)=>i<50).map((m,i)=>{
        return <Grid item xs={6} md={2}  key={i}> <ProductCard product={m}/></Grid> 
    })}</Grid> 
}