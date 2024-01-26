

import pageMetaObjects from './pageMetadata.json'
import SearchResultContainer from './comp/SearchResultContainer';

const algoliasearch = require('algoliasearch');

const client = algoliasearch("7JF244QSZZ", process.env.ALGOLIAKEY);
export async function generateMetadata(props) {
    const { params: {  slug } } = props
  
const selectedPageMeta = pageMetaObjects.find(f => f.slug === slug[0])
    return {
      title: selectedPageMeta.pageTitle ,
   
    }
  }

export default async function DiziPage(props) {
    const { params: {  slug } } = props
     const pageSize = 20
     const currentPage = slug[2] ? slug[2] : 0
     const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
 const selectedPageMeta = pageMetaObjects.find(f => f.slug === slug[0])
  const index = client.initIndex(selectedPageMeta.index);
  
   const data = await index.search(selectedPageMeta.search,{page: currentPage })
 

    // const filteredObjects = filterByKeywords(brandObjects, selectedPageMeta.filter)
    // const currentPageData = filteredObjects.slice(startIndex, endIndex);
    // const pageCount = Math.ceil(filteredObjects.length / 20)

    return <SearchResultContainer items={data.hits} pageTitle={selectedPageMeta.pageTitle}/>
}