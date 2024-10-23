


import ProductDisplayContainer from '../../components/ProductDisplayContainer'
import datas from '../../../../../data-sponsor-giyim/unzipped-data/5.step-data/giyim/references.json'
import { Container } from '@mui/material'
import TopNavigation from '@/app/components/TopNavigation'
import BreadcrumbsComponent from '../../components/BreadcrumbsComponent'
export default function CategoryByBrandPage({ params: { slug } }) {

  const uid = decodeURI(slug[slug.length - 1])
  const { details: { children: brands } } = datas.find((f => {
    const match = f.uid.includes(uid)

    return match
  }))

  console.log('slug', decodeURI(slug).split(',').join('/') )

  return <Container>
    <TopNavigation selected={0} />
    <BreadcrumbsComponent  urlPath={decodeURI(slug).split(',').join('/')}/>
    <ProductDisplayContainer brands={brands} slug={slug} /> </Container>
}




