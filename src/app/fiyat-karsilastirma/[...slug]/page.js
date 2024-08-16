

import dataset from '../../../../product-data/groupedData.json'
import { Container } from '@mui/material'
//import ApexBarChartListSecenek from '../components/secenek/ApexBarChartListSecenek'
import ApexBarChartListOrtalama from '../components/ortalama/ApexBarChartListOrtalama'
//import prepareData from '../components/ortalama/helper/prepareData'
export default function pageOrtalama() {
   const ortalama =dataset.elbise
   debugger
    return <Container><ApexBarChartListOrtalama data={ortalama} category='Elbise' /></Container>

}