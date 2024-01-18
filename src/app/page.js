
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import BrandInfor from './components/BrandInfor'
import path from 'path'
import { promises as fs } from 'fs';
import { Container, Typography } from '@mui/material';
import NextPagination from './components/NextPagination';
import filterByKeywords from './utils/filterByKeywords'

export async function generateMetadata() {
 
  return {
    title: 'Kıyafet Markaları' ,
 
  }
}
//
export default async function Home() {
  const dataFilePath = path.join(process.cwd() + '/public/brandNames.json')
  const brandNames = await fs.readFile(dataFilePath, 'utf8');
  const brandObjects = JSON.parse(brandNames)
  const filteredObjects = filterByKeywords(brandObjects, [
    "kıyafet"

  ])
  console.log('filteredObjects', Math.ceil(filteredObjects.length / 20))

  const pageCount = Math.ceil(filteredObjects.length / 20)
  //const arrayOfPages= Array.from({ length: pageCount }, (_, i) => i);


  return <Container>
        <Breadcrumbs>

        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
     
     <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Anasayfa
        </Typography>
    </Breadcrumbs>
     <Typography variant='h2'>Kıyafet Markaları</Typography>
    {filteredObjects.filter((f,i)=> i<=20 ).map((m, i) => { return <BrandInfor key={i} description={m.description} tag={m.tag} title={m.title} keywords={m.tagwords} href={m.href} /> })}

    <div>
      <NextPagination pageCount={pageCount} page={1} pagePrefix="/"/>
    </div>
  </Container>
}


