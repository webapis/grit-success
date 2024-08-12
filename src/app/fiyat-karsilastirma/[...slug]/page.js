

import dataset from '../../../../product-data/groupedDataSecenek.json'
import { Container } from '@mui/material'
import ApexBarChartListSecenek from '../components/secenek/ApexBarChartListSecenek'
//import prepareData from '../components/ortalama/helper/prepareData'
export default function pageOrtalama() {
   
    return <Container ><ApexBarChartListSecenek dataset={dataset} category='Elbise' /></Container>

}