

import Fuse from 'fuse.js'
import keywordMetaData from '@/app/dizisponsoru/keywordMetaData.json';
import pagesMetaData from '@/app/dizi/pageMetadata.json';
import pagesData from '@/app/dizi/dizisponsoru.json';
import deaccent from './[...slug]/deaccent';










export default async function sitemap(props) {

    const pageCantidates = []


    const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'], minMatchCharLength: 0, threshold: 0.3 })


    for (let pageObj of pagesMetaData) {

        for (let keywordObj of keywordMetaData) {

            let results = keywordObj.or ? fuse.search({ "$and": [{ "TVSeriesTitle": pageObj.dizi }, keywordObj.or] }) : fuse.search({ "$and": [{ "TVSeriesTitle": pageObj.dizi }] })



            const pageCount = Math.ceil(results.length / 25)

            pageCantidates.push({ dizi: pageObj.dizi, keyword: keywordObj.keyword, pageCount })


        }

    }
    const pages = flattenArrayByPageCount(pageCantidates)



    return pages.map((post) => {
        const { dizi, keyword, page } = post

        return {
            url: `https://www.glumzi.com/dizisponsoru/${deaccent(dizi).toLowerCase().replaceAll(' ', '-')}/${keyword}/sayfa/${page}`,
            lastModified: new Date(),
            changeFrequency: 'monthly'
        }

    })
}




function flattenArrayByPageCount(arrayOfObjects) {
    return arrayOfObjects.flatMap(obj => {
        const { dizi, pageCount, keyword } = obj;
        return Array.from({ length: pageCount }, (_, index) => ({
            dizi,
            keyword,
            page: index + 1
        }));
    });
}