import ysData from '../../../../turk-dizi-data/yapim-sirketleri.json'
import TVSeriesCompany from './components/TVSeriesCompany'
import  Container  from '@mui/material/Container'
export default function  TVseriesProductionCompanies(){

    return <Container>{ysData.map((m)=>{
        return <TVSeriesCompany company={m}  />
    })}</Container>
}