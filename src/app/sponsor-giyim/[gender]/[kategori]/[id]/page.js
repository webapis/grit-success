


import ProductDisplayContainer from '@/app/sponsor-giyim/components/ProductDisplayContainer'
import datas from '../../../../../../data-sponsor-giyim/unzipped-data/5.step-data/giyim/references.json'
import { Container } from '@mui/material'

import BreadcrumbsComponent from '@/app/sponsor-giyim/components/BreadcrumbsComponent'
export default function CategoryByBrandPage({ params: { id, gender, kategori } }) {
  const category = decodeURI(gender)
  const subCategory = decodeURI(kategori).replace('-', ' ')
  const { details: { children: brands } } = datas.find((f => {

    const match = f.uid.includes(id)

    return match
  }))
  debugger


  debugger
  return <Container>
 
    <BreadcrumbsComponent urlPath={`/sponsor-giyim/${category}/${subCategory}/${id}`} />
    <ProductDisplayContainer brands={brands} slug={`/sponsor-giyim/${category}/${subCategory}/${id}`} /> </Container>
}




