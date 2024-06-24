

import ImageContainer from '../comps/ImageContainer';
import Fuse from 'fuse.js'
import pagesMetaData from '@/app/dizikiyafeti/meta/pageMetaData.json';
import pagesData from '@/app/dizikiyafeti/page-data/dizikiyafeti.json';
import TopNavigation from '@/app/components/TopNavigation';
import PersistentDrawerLeft from '@/app/components/drawer';
import { mappedNavData } from '@/app/dizikiyafeti/comps/Application';
export async function generateMetadata({ params, searchParams }, parent) {

    debugger
    const { title } = pagesMetaData.find(f => {
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


    debugger
    const { title, algoliaQuery } = pagesMetaData.find(f => {
        const current = f.slug[0]
        const slug = params.slug[0]
        const match = current === slug

        return match
    })
    const fuse = new Fuse(pagesData, { keys: ['FullName', 'CaracterName', 'TVSeriesTitle', 'tag'], minMatchCharLength: 6 })
    debugger

    let results = fuse.search(algoliaQuery)
    debugger

    debugger
    return <>
        <TopNavigation selected={1} />
        <PersistentDrawerLeft data={mappedNavData} title="Dizi Kıyafeti">
            <ImageContainer filteredData={results} pageTitle={title} />
        </PersistentDrawerLeft>
    </>

}


export async function generateStaticParams() {


    return pagesMetaData.map((obj) => {
        const { slug } = obj
        debugger
        return {
            slug: [slug[0]]
        }

    })
}
