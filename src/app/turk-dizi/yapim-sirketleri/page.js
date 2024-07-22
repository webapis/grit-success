// pages/turk-dizi/yapimci-sirketleri/[[...page]].js
import TVSeriesCompany from './components/TVSeriesCompany';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PaginationContainer from './components/PaginationContainer';
import ysData from '../../../../turk-dizi-data/yapim-sirketleri.json';
import PersistentDrawerLeft from '@/app/components/drawer';
import { Typography } from '@mui/material';

const NavData = ysData.map((m) => { return { href: `/turk-dizi/yapim-sirketleri/${m.id}`, title: m.title } })
export { NavData }


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
export default function TVseriesProductionCompanies() {

    const totalPages = Math.ceil(ysData.length / 10)
    const currentPage = '1'
    const data = paginate(ysData, currentPage, 10)
    return (
        
            <Container>
                <Grid container sx={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
                    <Grid item xs={12}>

                        <Typography variant='h4' textAlign="center">Türk yapım şirketlerinin dizileri</Typography>
                    </Grid>
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




