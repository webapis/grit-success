
import { promises as fs } from 'fs';

import SearchResultContainer from '../../dizi-sponsoru/comp/SearchResultContainer';
import { Container, Grid } from '@mui/material';
import path from 'path'
import Fuse from 'fuse.js'





export async function generateMetadata({ params }) {


    const pages = await fs.readFile(path.join(process.cwd(), 'src/app/dizi/pageMetadata.json'), 'utf8');
    const pagesData = JSON.parse(pages);
    debugger
    const result = pagesData.find(f => {
        const current = f.slug
        const slug = params.slug[0]
        const match = current === slug

        return match
    })
    if (result) {

        const { pageTitle } = result
        return {
            title: pageTitle

        }
    }


}



export default async function DiziPage({ params }) {

     const pages = await fs.readFile(path.join(process.cwd(), 'src/app/dizi/pageMetadata.json'), 'utf8');
       const pagesMetaData = JSON.parse(pages);
       const data = await fs.readFile(path.join(process.cwd(), 'src/app/dizi/dizisponsoru.json'), 'utf8');
      const pagesData = JSON.parse(data);

   

  

    const result = pagesMetaData.find(f => {

        const current = f.slug
        const slug = params.slug[0]
        const match = current === slug

        return match
    })

    const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name'], minMatchCharLength: 6 })




    if (result) {
        const { pageTitle, search } = result
        let results = fuse.search(search)
        return <SearchResultContainer data={results} pageTitle={pageTitle} />
          
          

      
    } else {
        return <div>Loading....</div>
    }




}
