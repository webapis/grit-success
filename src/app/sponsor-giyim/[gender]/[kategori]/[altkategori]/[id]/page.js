


import ProductDisplayContainer from '@/app/sponsor-giyim/components/ProductDisplayContainer'
//import datas from '../../../../../../../data-sponsor-giyim/unzipped-data/5.step-data/giyim/references.json'
import { Container } from '@mui/material'
import genderData from '../../../../components/genderData'
import BreadcrumbsComponent from '@/app/sponsor-giyim/components/BreadcrumbsComponent'
import SponsorGiyimDrawerContainer from '@/app/sponsor-giyim/components/drawer/SponsorGiyimDrawerContainer'
import getNavigationData from '@/app/sponsor-giyim/components/getNavigationData'

const datas =await getNavigationData({URI:'data-sponsor-giyim/unzipped-data/5.step-data/giyim/references.json'})
export default function CategoryByBrandPage({ params: { id, gender, kategori, altkategori } }) {
  const genderDecoded = decodeURI(gender)
  const category = decodeURI(kategori).replace('-', ' ')
  const { details: { children: brands } } = datas.find((f => {

    const match = f.uid.includes(id)

    return match
  }))
  const subCategori = decodeURI(altkategori)

  const selectedGender = genderData.find(f => f.urlGender === decodeURI(genderDecoded)).index

  return <Container>
    <SponsorGiyimDrawerContainer selectedGender={selectedGender}>
      <BreadcrumbsComponent urlPath={`/sponsor-giyim/${genderDecoded}/${category}/${subCategori}/${id}`} />
      <ProductDisplayContainer brands={brands} slug={`/sponsor-giyim/${genderDecoded}/${category}/${id}`} />
    </SponsorGiyimDrawerContainer>
  </Container>
}




