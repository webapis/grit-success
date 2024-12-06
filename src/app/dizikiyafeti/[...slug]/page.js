

import ImageContainer from '../comps/ImageContainer';
import Fuse from 'fuse.js'
import pagesMetaData from '@/app/dizikiyafeti/meta/pageMetaData.json';
import pagesData from '@/app/dizikiyafeti/page-data/dizikiyafeti.json';
import BreadcrumbsComponent from '@/app/components/BreadcrumbsComponent';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import getViews from '@/app/utils/firebase/supabase';
export  function generateMetadata({ params, searchParams }, parent) {

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
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                mb: 3, 
                backgroundColor: 'background.paper',
                borderRadius: 2
              }}
            >
              <BreadcrumbsComponent
                items={[
                  { label: 'Ana Sayfa', href: '/', icon: HomeIcon },
                  { label: 'Dizi Kıyafetleri', href: '/dizikiyafeti' },
                  { label: title }
                ]}
              />
            </Paper>
     
            <ImageContainer userViewData={userViewData} filteredData={mappedResult} pageTitle={title} />
   
    </>

}


export  function generateStaticParams() {


    return pagesMetaData.map((obj) => {
        const { slug } = obj
        return {
            slug: [slug[0]]
        }

    })
}
