// pages/turk-dizi/yapimci-sirketleri/[[...page]].js
import TVSeriesCompany from '../../components/TVSeriesCompany';
import Container from '@mui/material/Container';
import PaginationContainer from '../../components/PaginationContainer';
import ysData from '../../../../../../turk-dizi-data/yapim-sirketleri.json';

export default function TVseriesProductionCompanies({params:{id}}) {
  
        const totalPages = Math.ceil(ysData.length / 10)
        const currentPage= id?  id.toString(): ''
       const data = paginate(ysData,currentPage,10)
    return (
        <Container>
            {data.map((company, index) => (
                <TVSeriesCompany key={company.id || index} company={company} />
            ))}
            <PaginationContainer 
                totalPages={totalPages} 
                currentPage={currentPage} 
                basePath="/turk-dizi/yapimci-sirketleri"
            />
        </Container>
    );
}

function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}


// export async function generateStaticParams() {
//     const itemsPerPage = 10;
//     const totalPages = Math.ceil(ysData.length / itemsPerPage);

//     const paths = [{ page: [] }]; // This represents the base path without 'sayfa'

//     for (let page = 2; page <= totalPages; page++) {
//         paths.push({ page: ['sayfa', page.toString()] });
//     }

//     return paths;
// }

