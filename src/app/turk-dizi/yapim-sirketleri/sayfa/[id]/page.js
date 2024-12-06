// pages/turk-dizi/yapimci-sirketleri/[[...page]].js
import TVSeriesCompany from '../../components/TVSeriesCompany';

import PaginationContainer from '../../components/PaginationContainer';
import ysData from '../../../../../../turk-dizi-data/yapim-sirketleri.json';
import  Typography  from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import BreadcrumbsComponent from '@/app/components/BreadcrumbsComponent';
import Box from '@mui/material/Box';

export async function generateMetadata() {
    return {
      title: 'Türk Yapım Şirketlerinin En İyi Dizileri | Top Turkish TV Series',
      description: 'Türk dizi yapım şirketlerinin en popüler ve beğenilen dizileri. Dram, komedi, tarih ve daha fazlası. | Most popular and acclaimed TV series from Turkish production companies. Drama, comedy, history, and more.',
      keywords: 'Türk dizileri, Turkish TV series, yapım şirketleri, production companies, dram, drama, komedi, comedy',
      openGraph: {
        title: 'Türk Yapım Şirketlerinin En İyi Dizileri | Top Turkish TV Series',
        description: 'Türk dizi yapım şirketlerinin en popüler ve beğenilen dizileri. | Most popular and acclaimed TV series from Turkish production companies.',
        type: 'website',
        locale: 'tr_TR',
        alternateLocale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Türk Yapım Şirketlerinin En İyi Dizileri',
        description: 'Türk dizi yapım şirketlerinin en popüler ve beğenilen dizileri.',
      },
    }
  }
export default function TVseriesProductionCompanies({ params: { id } }) {

    const totalPages = Math.ceil(ysData.length / 10)
    const currentPage = id ? id.toString() : ''
    const data = paginate(ysData, currentPage, 10)
    debugger
    return (
        <>
       
            <Container maxWidth="xl" sx={{ py: 0}}>
            <BreadcrumbsComponent
                        urlPath={`/turk-dizi`}
                    />
                    <Typography variant='h4' textAlign="center">Türk yapım şirketleri ve dizileri</Typography>
                                       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <PaginationContainer
                            totalPages={totalPages}
                            currentPage={currentPage}
                            basePath="/turk-dizi/yapim-sirketleri"
                        />
                    </Box>
            <Grid container sx={{ display: "flex", justifyContent: "center", marginTop:1 }}>


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
       
        </>
    );
}

function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}


export async function generateStaticParams() {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(ysData.length / itemsPerPage);

    const paths = [{ page: [] }]; // This represents the base path without 'sayfa'

    for (let page = 2; page <= totalPages; page++) {
    
        paths.push({ id: page.toString() });
    }
debugger
    return paths;
}
