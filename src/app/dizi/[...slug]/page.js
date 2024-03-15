
import { promises as fs } from 'fs';

import SearchResultContainer from '../../dizi-sponsoru/[...slug]/comp/SearchResultContainer';
import { Container, Stack, Grid } from '@mui/material';
import path from 'path'
import Fuse from 'fuse.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);


export async function generateMetadata({ params, searchParams }, parent) {

    // const pages = await fs.readFile(path.join(process.cwd(), 'src/app/dizi/[...slug]/pageMetaData.json'), 'utf8');
    // const pagesData = JSON.parse(pages);
    // debugger
    // const { pageTitle } = pagesData.find(f => {
    //     const current = f.slug[0]
    //     const slug = params.slug[0]
    //     const match = current === slug

    //     return match
    // })
    // return {
    //     title:pageTitle

    // }
}



export default async function DiziPage({ params }) {


  const pages = await fs.readFile(path.join(process.cwd(), 'src/app/dizi/[...slug]/pageMetaData.json'), 'utf8');
debugger
    const pagesMetaData = JSON.parse(pages);
debugger
    const data = await fs.readFile(path.join(process.cwd(), 'src/app/dizi-sponsoru/page-data/dizisponsoru.json'),'utf8');
    const pagesData = JSON.parse(data);
debugger
    const result = pagesMetaData.find(f => {

        const current = f.slug
        const slug = params.slug[0]
        const match = current === slug
debugger
        return match
    })
    debugger

debugger
    const fuse = new Fuse(pagesData,{keys:['ServiceName','TVSeriesTitle','Tag','Name'], minMatchCharLength: 6})
debugger


    debugger

    debugger
    if(result){
      const {  pageTitle, nextpages, search }=result
      let results = fuse.search(search)
      return <div>
      <Container >
          <SearchResultContainer data={results} pageTitle={pageTitle} />
          <Grid sx={{ paddingTop: 5, paddingBottom: 5 }} container justifyContent="center">
              {/* {nextpages.length>0 && nextpages.map((m, i) => <Grid item key={i}> <Button size="small"   component={Link} href={`/${m.slug}`} startIcon={<SearchIcon />} variant='secondary' sx={{ fontSize: 16, textTransform: "lowercase", backgroundColor: "#eeeeee", margin: 1, borderRadius: 7, padding:2, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>{m.title}</Button> </Grid>)} */}
          </Grid>
      </Container>

  </div>
    } else{
      <div>Loading</div>
    }


}
