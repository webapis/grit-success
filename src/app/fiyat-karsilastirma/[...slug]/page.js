

import dataset from '../../../../product-data/groupedData.json'
import { Container } from '@mui/material'
import ApexBarChartList from '../components/ApexBarChartList'
import prepareData from '../components/helper/prepareData'
export default function pageOrtalama() {
    const elbise =dataset.elbise
    debugger
    const dataPrepd = prepareData(elbise)



    debugger
    return <Container sx={{width:{xs:'100%',md:'50%',lg:'30%'}}}><ApexBarChartList data={dataPrepd} category='Elbise' /></Container>
}