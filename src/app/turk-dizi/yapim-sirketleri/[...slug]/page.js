
import ysData from '../../../../../turk-dizi-data/yapim-sirketleri.json'
import CompanyPage from '../components/CompanyPage'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import BreadcrumbsComponent from '@/app/components/BreadcrumbsComponent';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
export  function generateMetadata({ params: { slug } }) {
    const companyId = slug[0]
    const company = ysData.find(f => f.id === companyId)
    const companyTitle = company.title
  
    const title = `${companyTitle} - En İyi Türk Dizileri | Best Turkish TV Series`
    const description = `${companyTitle} yapımı en popüler ve beğenilen Türk dizileri. Dram, komedi, tarih ve daha fazlası. | Most popular and acclaimed Turkish TV series produced by ${companyTitle}. Drama, comedy, history, and more.`
  
    return {
      title,
      description,
      keywords: `${companyTitle}, Türk dizileri, Turkish TV series, yapım şirketleri, production companies, dram, drama, komedi, comedy`,
      openGraph: {
        title,
        description,
        type: 'website',
        locale: 'tr_TR',
        alternateLocale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${companyTitle} - En İyi Türk Dizileri`,
        description: `${companyTitle} yapımı en popüler ve beğenilen Türk dizileri.`,
      },
    }
  }

export default function TVseriesProductionCompanies({ params: { slug } }) {
    const companyId = slug[0]
    const company = ysData.find(f => f.id === companyId)


    return <Container maxWidth="xl" sx={{ py: 0}}> 
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3, 
          backgroundColor: 'background.paper',
          borderRadius: 2
        }}
      >
        <BreadcrumbsComponent
          items={[
            { label: 'Ana Sayfa', href: '/', icon: HomeIcon },
            { label: 'Yapım Şirketleri', href: '/turk-dizi/yapim-sirketleri' },
            { label: company.name || companyId }
          ]}
        />
      </Paper>
           <Typography 
                        variant='h4' 
                        textAlign="center"
                        sx={{ 
                           
                            fontWeight: 500,
                            marginBottom: 3
                      
                        }}
                    >
                        Türk yapım şirketleri ve dizileri ({company.title})
                    </Typography>
    <CompanyPage company={company} companyId={companyId}/>

 
    </Container> 
}




export async function generateStaticParams() {
 

debugger
    return ysData.map((m) => { return { slug: [m.id] } })
}