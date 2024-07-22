// pages/turk-dizi/yapimci-sirketleri/[[...page]].js
import TVSeriesCompany from './components/TVSeriesCompany';
import Container from '@mui/material/Container';
import  Grid  from '@mui/material/Grid';
import PaginationContainer from './components/PaginationContainer';
import ysData from '../../../../turk-dizi-data/yapim-sirketleri.json';

export default function TVseriesProductionCompanies() {
    
        const totalPages = Math.ceil(ysData.length / 10)
        const currentPage= '1'
        const data = paginate(ysData,currentPage,10)
    return (
        <Container>
            <Grid container sx={{display:"flex",justifyContent:"center"}}>
        <Grid item xs={12} md={8}>
         
            {data.map((company, index) => (
                <TVSeriesCompany key={company.id || index} company={company} />
            ))}
            <PaginationContainer 
                totalPages={totalPages} 
                currentPage={currentPage} 
                basePath="/turk-dizi/yapim-sirketleri"
            />
            </Grid>
               </Grid>
        </Container>
    );
}

function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}




