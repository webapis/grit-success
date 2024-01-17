import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import BrandInfor from '../../components/BrandInfor'
import NextPagination from '../../components/NextPagination';
import { Container,Typography } from '@mui/material';
import path from 'path'
import { promises as fs } from 'fs';
import pageMetaObjects from './pageMetadata.json'
import filterByKeywords from '@/app/utils/filterByKeywords';

export default async function Page (props){
    const {params:{id,slug}}=props
    console.log('props', id, slug)
    const pageSize=10
    const currentPage =slug[1] ? slug[1] :1
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const selectedPageMeta= pageMetaObjects.find(f=>f.id==='k' && f.slug===slug[0])

    console.log('selectedPageMeta',selectedPageMeta)
    const dataFilePath = path.join(process.cwd() + '/public/brandNames.json')
    const brandNames = await fs.readFile(dataFilePath, 'utf8');
    const brandObjects = JSON.parse(brandNames)
    const filteredObjects = filterByKeywords(brandObjects,selectedPageMeta.filter )
    const currentPageData = filteredObjects.slice(startIndex, endIndex);
    const pageCount = Math.ceil(filteredObjects.length / 10)
    console.log('currentPageData',currentPageData.length)
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
      <Typography variant='h2'>{selectedPageMeta.pageTitle}</Typography>
    {currentPageData.map((m, i) => { return <BrandInfor key={i} description={m.description} tag={m.tag} title={m.title} keywords={m.keywords} href={m.href} /> })}
    <NextPagination pageCount={pageCount} page={parseInt(currentPage)} />
  </Container>

}