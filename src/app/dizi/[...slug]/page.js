
import path from 'path'
import { promises as fs } from 'fs';
import pageMetaObjects from './pageMetadata.json'

const algoliasearch = require('algoliasearch');

const client = algoliasearch("7JF244QSZZ", process.env.ALGOLIAKEY);

debugger
export default async function DiziPage(props) {
    const { params: {  slug } } = props
 
 

     const pageSize = 20
     const currentPage = slug[2] ? slug[2] : 0
     const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
 const selectedPageMeta = pageMetaObjects.find(f => f.slug === slug[0])
  const index = client.initIndex(selectedPageMeta.index);
  
   const data = await index.search(selectedPageMeta.search,{page: currentPage })
  debugger

    // const filteredObjects = filterByKeywords(brandObjects, selectedPageMeta.filter)
    // const currentPageData = filteredObjects.slice(startIndex, endIndex);
    // const pageCount = Math.ceil(filteredObjects.length / 20)

    return <div>Moda Page</div>
}