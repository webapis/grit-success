


import ProductDisplayContainer from '@/app/sponsor-giyim/components/ProductDisplayContainer'
//import datas from '../../../../../../../data-sponsor-giyim/unzipped-data/5.step-data/giyim/references.json'
import { Container } from '@mui/material'
import genderData from '../../../../components/genderData'
import BreadcrumbsComponent from '@/app/sponsor-giyim/components/BreadcrumbsComponent'
import SponsorGiyimDrawerContainer from '@/app/sponsor-giyim/components/drawer/SponsorGiyimDrawerContainer'
import getNavigationData from '@/app/sponsor-giyim/components/getNavigationData'

const datas = await getNavigationData({ URI: 'data-sponsor-giyim/unzipped-data/5.step-data/giyim/references.json' })
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




export async function generateStaticParams() {
  const datas = await getNavigationData({ URI: 'data-sponsor-giyim/unzipped-data/5.step-data/giyim/navigation.json' })
  const paramCandidates = []
  for (let d in datas) {
    const currentNav = datas[d]
    const gender = currentNav.title.replace(' ', '-').toLowerCase()
    const children2 = currentNav.children
    for (let c2 in children2) {
      const currentc2 = children2[c2]
      const kategori = currentc2.title.replace(' ', '-').toLowerCase()
      const children3 = currentc2.children
      for (let c3 in children3) {
        const currentc3 = children3[c3]
        const altkategori = currentc3.title.replace(' ', '-').toLowerCase()
        const uid = currentc3.uid
        paramCandidates.push({ params: { gender, kategori, altkategori, uid } })

      }


    }


  }

  debugger

  return paramCandidates
}