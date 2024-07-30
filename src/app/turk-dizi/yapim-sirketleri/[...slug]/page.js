import ysData from '../../../../../turk-dizi-data/yapim-sirketleri.json'
import CompanyPage from '../components/CompanyPage'
console.log("ysData", ysData.length)


export async function generateMetadata({ params: { slug } }) {
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
    console.log("slug", companyId)

    return <CompanyPage company={company} />
}




export async function generateStaticParams() {
 

debugger
    return ysData.map((m) => { return { slug: [m.id] } })
}