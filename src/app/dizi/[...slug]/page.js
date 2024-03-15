
import { promises as fs } from 'fs';

import SearchResultContainer from '../../dizi-sponsoru/comp/SearchResultContainer';
import { Container, Grid } from '@mui/material';
import path from 'path'
import Fuse from 'fuse.js'





// export async function generateMetadata({ params }) {

//     const pages = await fs.readFile(path.join(process.cwd(), 'src/app/dizi-sponsoru/meta/pageMetaData.json'), 'utf8');
//     const pagesData = JSON.parse(pages);
//     debugger
//     const result = pagesData.find(f => {
//         const current = f.slug
//         const slug = params.slug[0]
//         const match = current === slug

//         return match
//     })
//     if (result) {

//         const { pageTitle } = result
//         return {
//             title: pageTitle

//         }
//     }


// }



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
        return <div>
            <Container >
                <SearchResultContainer data={results} pageTitle={pageTitle} />
                <Grid sx={{ paddingTop: 5, paddingBottom: 5 }} container justifyContent="center">
                    {/* {nextpages.length>0 && nextpages.map((m, i) => <Grid item key={i}> <Button size="small"   component={Link} href={`/${m.slug}`} startIcon={<SearchIcon />} variant='secondary' sx={{ fontSize: 16, textTransform: "lowercase", backgroundColor: "#eeeeee", margin: 1, borderRadius: 7, padding:2, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>{m.title}</Button> </Grid>)} */}
                </Grid>
            </Container>

        </div>
    } else {
        return <div>Loading....</div>
    }




}
