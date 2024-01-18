
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import BrandInfor from '../../components/BrandInfor'
import NextPagination from '../../components/NextPagination';
import path from 'path'
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
const dataFilePath = path.join(process.cwd() + '/public/brandNames.json')
  const brandNames = await fs.readFile(dataFilePath, 'utf8');
  const brandObjects = JSON.parse(brandNames)
  const filteredObjects = filterByKeywords(brandObjects, [
    "kıyafet",

  ])
  const currentPageData = filteredObjects.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredObjects.length / 20)
  return <Container>
    <Breadcrumbs>
    <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Anasayfa
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
     
          {`sayfa ${currentPage}`}
        </Typography>
    </Breadcrumbs>
      <Typography variant='h2'>Kıyafet Markaları</Typography>
    {currentPageData.map((m, i) => { return <BrandInfor key={i} description={m.description} tag={m.tag} title={m.title} keywords={m.tagwords} href={m.href} /> })}
    <NextPagination pageCount={pageCount} page={parseInt(pageNumber)} pagePrefix="/" />
  </Container>
}


