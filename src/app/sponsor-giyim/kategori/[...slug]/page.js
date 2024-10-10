


import ProductDisplayContainer from '../../components/ProductDisplayContainer'
import datas from '../../../../../data-sponsor-giyim/unzipped-data/5.step-data/giyim/references.json'
import { Container } from '@mui/material'


export default function CategoryByBrandPage({ params: { slug } }) {

  const uid = decodeURI(slug[slug.length - 1])
  const { details: { children: brands } } = datas.find((f => {
    const match = f.uid.includes(uid)

    return match
  }))


  return <Container> <ProductDisplayContainer brands={brands} /> </Container>
}




