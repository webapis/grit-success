

import ImageContainer from '../comps/ImageContainer';
import Fuse from 'fuse.js'
import pagesMetaData from '@/app/dizikiyafeti/meta/pageMetaData.json';
import pagesData from '@/app/dizikiyafeti/page-data/dizikiyafeti.json';
import TopNavigation from '@/app/components/TopNavigation';
import PersistentDrawerLeft from '@/app/components/drawer';
import { mappedNavData } from '@/app/dizikiyafeti/comps/Application';
import getViews from '@/app/utils/firebase/supabase';
export async function generateMetadata({ params, searchParams }, parent) {

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

    const userViewData = await getViews({ table: 'dizikiyafeti' })

    const { title, algoliaQuery } = pagesMetaData.find(f => {
        const current = f.slug[0]
        const slug = params.slug[0]
        const match = current === slug

        return match
    })
    const fuse = new Fuse(pagesData, { keys: ['FullName', 'CaracterName', 'TVSeriesTitle', 'tag'], minMatchCharLength: 6 })
    

    let results = fuse.search(algoliaQuery).map(m => { return { ...m.item } })
    let mappedResult = results.map(m => {
      
        const linkId = m.ProductLink
        const viewCount = userViewData['data'].find(f => f.href.includes(linkId))
  
        
        return { ...m, viewCount: viewCount ? viewCount.count : 0 }
    }).sort((a, b) => b.viewCount - a.viewCount)
    


    return <>
        <TopNavigation selected={1} />
        <PersistentDrawerLeft data={mappedNavData} title="Dizi Kıyafeti">
            <ImageContainer userViewData={userViewData} filteredData={mappedResult} pageTitle={title} />
        </PersistentDrawerLeft>
    </>

}


export async function generateStaticParams() {


    return pagesMetaData.map((obj) => {
        const { slug } = obj
        return {
            slug: [slug[0]]
        }

    })
}
