


import ProductDisplayContainer from '@/app/sponsor-giyim/components/ProductDisplayContainer'

import { Container } from '@mui/material'
//import genderData from '../../../../components/genderData'
import BreadcrumbsComponent from '@/app/components/BreadcrumbsComponent';
import getNavigationData from '@/app/sponsor-giyim/components/getNavigationData'

const datas = await getNavigationData({ URI: 'data-sponsor-giyim/unzipped-data/5.step-data/giyim/references.json' })



export  function generateMetadata({ params: {  gender, kategori, altkategori } }) {

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replaceAll('-',' ');

  return {

      title:   `${capitalize(decodeURI(gender))} ${capitalize(decodeURI(altkategori) )} | ${capitalize(decodeURI(kategori))} | Dizi Sponsoru Giyim Markalar`

  }
}

export default function CategoryByBrandPage({ params: { id, gender, kategori, altkategori } }) {
  const genderDecoded = decodeURI(gender)
  const category = decodeURI(kategori).replace('-', ' ')
  const { details: { children: brands,title } } = datas.find((f => {
    const match = f.uid.includes(id)
    return match
  }))
debugger
  const subCategori = decodeURI(altkategori)
debugger
 // const selectedGender = genderData.find(f => f.urlGender === decodeURI(genderDecoded)).urlGender

  return <Container>

      <BreadcrumbsComponent urlPath={`/sponsor-giyim/${genderDecoded}/${category}/${subCategori}`} />
      <ProductDisplayContainer title={title} brands={brands} slug={`/sponsor-giyim/${genderDecoded}/${category.replace('-',' ')}/${id}`} selectedGender={genderDecoded}/>

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
        const id = currentc3.uid
        paramCandidates.push( { gender, kategori, altkategori, id })

      }


    }


  }


  return paramCandidates
}