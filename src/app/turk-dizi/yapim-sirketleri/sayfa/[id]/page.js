// pages/turk-dizi/yapimci-sirketleri/[[...page]].js
import TVSeriesCompany from '../../components/TVSeriesCompany';

import PaginationContainer from '../../components/PaginationContainer';
import ysData from '../../../../../../turk-dizi-data/yapim-sirketleri.json';
import  Typography  from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TopNavigation from '@/app/components/TopNavigation';
import DrawerWrapper from '../../DrawerWrapper';
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
            <TopNavigation selected={4}/>
            <DrawerWrapper>
            <Grid container sx={{ display: "flex", justifyContent: "center", marginTop:1 }}>
            <Grid item xs={12}>

<Typography variant='h4' textAlign="center">Türk yapım şirketleri ve dizileri</Typography>
</Grid>
                <Grid item xs={12} md={8}>
                <PaginationContainer
                        totalPages={totalPages}
                        currentPage={currentPage}
                        basePath="/turk-dizi/yapim-sirketleri"
                    />
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
            </DrawerWrapper>
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
