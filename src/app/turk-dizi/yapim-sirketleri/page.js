// pages/turk-dizi/yapimci-sirketleri/[[...page]].js
import TVSeriesCompany from './components/TVSeriesCompany';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PaginationContainer from './components/PaginationContainer';
import ysData from '../../../../turk-dizi-data/yapim-sirketleri.json';
//import DrawerWrapper from './DrawerWrapper';
//import TopNavigation from '@/app/components/TopNavigation';
import  Typography  from '@mui/material/Typography';
import BreadcrumbsComponent from '@/app/components/BreadcrumbsComponent';
const NavData = ysData.map((m) => { return { href: `/turk-dizi/yapim-sirketleri/${m.id}`, title: m.title } })
export { NavData }


export  function generateMetadata() {
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
        <>
                      <BreadcrumbsComponent
                        urlPath={`/turk-dizi`}
                    />
             <Typography 
                        variant='h4' 
                        textAlign="center"
                        sx={{ 
                           
                            fontWeight: 500
                        }}
                    >
                        Türk yapım şirketleri ve dizileri
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <PaginationContainer
                            totalPages={totalPages}
                            currentPage={currentPage}
                            basePath="/turk-dizi/yapim-sirketleri"
                        />
                    </Box>
          
            <Grid container spacing={2} sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
         

                {/* Content Container - Centered with max width */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: 'md' }}>
                      
                        {/* Company List */}
                        {data.map((company, index) => (
                            <TVSeriesCompany key={company.id || index} company={company} />
                        ))}

                        {/* Pagination at bottom */}
                        <Box sx={{ mt: 3 }}>
                            <PaginationContainer
                                totalPages={totalPages}
                                currentPage={currentPage}
                                basePath="/turk-dizi/yapim-sirketleri"
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
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

debugger
    return []
}
