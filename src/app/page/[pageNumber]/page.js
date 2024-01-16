

import BrandInfor from '../../components/BrandInfor'
import NextPagination from '../../components/NextPagination';

import { promises as fs } from 'fs';
import { Container,Typography } from '@mui/material';
import filterByKeywords from '@/app/utils/filterByKeywords';

export async function generateMetadata() {
 
  return {
    title: 'Kıyafet Markaları' ,
 
  }
}


export default async function Home(props) {
const {params:{pageNumber}}=props
const pageSize=20
const currentPage =pageNumber
const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
  const brandNames = await fs.readFile(process.cwd() + '/public/brandNames.json', 'utf8');
  const brandObjects = JSON.parse(brandNames)
  const filteredObjects = filterByKeywords(brandObjects, [
    "kadın",
    "kıyafet",
    "kıyafeti",
    "gelinlik",
    "erkek",
    "bebek",
    "takı",
    "pijama",
    "sabahlık",
    "gecelik"
  ])
  const currentPageData = filteredObjects.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredObjects.length / 20)
  return <Container>
      <Typography variant='h2'>Kıyafet Markaları</Typography>
    {currentPageData.map((m, i) => { return <BrandInfor key={i} description={m.description} tag={m.tag} title={m.title} keywords={m.keywords} href={m.href} /> })}
    <NextPagination pageCount={pageCount} page={parseInt(pageNumber)} />
  </Container>
}


