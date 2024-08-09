
import ChartComponent from '../components/ChartComponent'
import dataset from '../../../../product-data/groupedData.json'
import { Container } from '@mui/material'
import ApexBarChartList from '../components/ApexBarChartList'
import prepareData from '../components/helper/prepareData'
export default function pageOrtalama() {
    const dataPrepd = prepareData(dataset.elbise)



    debugger
    return <Container sx={{width:{xs:'100%',md:'50%',lg:'30%'}}}><ApexBarChartList data={dataPrepd} /></Container>
}