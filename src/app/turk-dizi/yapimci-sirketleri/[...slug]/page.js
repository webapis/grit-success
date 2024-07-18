import ysData from '../../../../../turk-dizi-data/yapim-sirketleri.json'
import CompanyPage from '../components/CompanyPage'
console.log("ysData", ysData.length)
export default function TVseriesProductionCompanies({ params: { slug } }) {
    const companyId = slug[0]
 const company= ysData.find(f=>f.id===companyId)
    console.log("slug", companyId)

    return <CompanyPage company={company}/>
}