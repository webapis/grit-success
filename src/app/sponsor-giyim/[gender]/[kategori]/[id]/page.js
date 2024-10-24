


import ProductDisplayContainer from '@/app/sponsor-giyim/components/ProductDisplayContainer'
import datas from '../../../../../../data-sponsor-giyim/unzipped-data/5.step-data/giyim/references.json'
import { Container } from '@mui/material'
import { data as genderData } from '../../../components/GenderCards'
import BreadcrumbsComponent from '@/app/sponsor-giyim/components/BreadcrumbsComponent'
import SponsorGiyimDrawer from '@/app/sponsor-giyim/components/drawer/SponsorGiyimDrawer'
export default function CategoryByBrandPage({ params: { id, gender, kategori } }) {
  const category = decodeURI(gender)
  const subCategory = decodeURI(kategori).replace('-', ' ')
  const { details: { children: brands } } = datas.find((f => {

    const match = f.uid.includes(id)

    return match
  }))
  debugger

  const selectedGender = genderData.find(f => f.urlGender === decodeURI(category)).index
  debugger
  return <Container>
    <SponsorGiyimDrawer selectedGender={selectedGender} />
    <BreadcrumbsComponent urlPath={`/sponsor-giyim/${category}/${subCategory}/${id}`} />
    <ProductDisplayContainer brands={brands} slug={`/sponsor-giyim/${category}/${subCategory}/${id}`} /> </Container>
}




