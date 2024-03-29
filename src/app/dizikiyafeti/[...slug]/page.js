
import { promises as fs } from 'fs';

import ImageContainer from '../comps/ImageContainer';
import { Container } from '@mui/material';
import path from 'path'
import Fuse from 'fuse.js'
import { createRequire } from "module";
import Drawer from '../../home/components/drawer'
const require = createRequire(import.meta.url);


export async function generateMetadata({ params, searchParams }, parent) {

    const pages = await fs.readFile(path.join(process.cwd(), 'src/app/dizikiyafeti/meta/pageMetaData.json'), 'utf8');
    const pagesData = JSON.parse(pages);
    debugger
    const { title } = pagesData.find(f => {
        const current = f.slug[0]
        const slug = params.slug[0]
        const match = current === slug

        return match
    })
    return {
        title

    }
}



export default async function DiziPage({ params }) {

    const pages = await fs.readFile(path.join(process.cwd(), 'src/app/dizikiyafeti/meta/pageMetaData.json'),'utf8');
    const pagesMetaData = JSON.parse(pages);

    const data = await fs.readFile(path.join(process.cwd(), 'src/app/dizikiyafeti/page-data/dizikiyafeti.json'),'utf8');
    const pagesData = JSON.parse(data);
debugger
    const {  title, algoliaQuery } = pagesMetaData.find(f => {
        const current = f.slug[0]
        const slug = params.slug[0]
        const match = current === slug

        return match
    })
    const fuse = new Fuse(pagesData,{keys:['FullName','CaracterName','TVSeriesTitle','tag'], minMatchCharLength: 6})
debugger

    let results = fuse.search(algoliaQuery)
    debugger

    debugger
    return <Drawer> <Container >
            <ImageContainer filteredData={results} pageTitle={title} />
         
        </Container>
        </Drawer>

}


// export async function generateStaticParams() {
//     const file = await fs.readFile(process.cwd() + '/src/app/dizikiyafeti/meta/pageMetaData.json', 'utf8');
//     const data = JSON.parse(file);

//     return data.map((post) => ({
//         slug: post.slug,
//     }))
// }