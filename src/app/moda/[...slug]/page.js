
import path from 'path'
import { promises as fs } from 'fs';
import pageMetaObjects from './pageMetadata.json'

const algoliasearch = require('algoliasearch');

const client = algoliasearch("7JF244QSZZ", process.env.ALGOLIAKEY);
const index = client.initIndex('brand');
debugger
export default async function ModaPage(props) {
    const { params: { id, slug } } = props
    debugger
    const data = await index.search('ceket',{page: 2 })
debugger
    // const pageSize = 20
    // const currentPage = slug[2] ? slug[2] : 1
    // const startIndex = (currentPage - 1) * pageSize;
    // const endIndex = startIndex + pageSize;
    // const selectedPageMeta = pageMetaObjects.find(f => f.slug === slug[0])
  

    // const filteredObjects = filterByKeywords(brandObjects, selectedPageMeta.filter)
    // const currentPageData = filteredObjects.slice(startIndex, endIndex);
    // const pageCount = Math.ceil(filteredObjects.length / 20)


    return <div>Moda Page</div>
}