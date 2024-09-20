
// import path from 'path'
import Fuse from 'fuse.js'
import keywordMetaData from '@/app/dizi-sponsor-kategori/page-data/keywordMetaData.json';
import pagesData from '@/app/dizi-sponsor-kategori/page-data/sponsor-kategori.json';








export default async function sitemap() {

  const fuse = new Fuse(pagesData, { keys: ['ServiceName', 'TVSeriesTitle', 'Tag', 'Name', 'Acyklama'], minMatchCharLength: 5 })
  const pageCandidate = []
  for (let keywordObj of keywordMetaData) {

    let results = fuse.search(keywordObj.or)


    const sortData = results.map(m => { return { ...m.item, duplicateTitles: m.item.duplicateTitles ? m.item.duplicateTitles : [m.item.TVSeriesTitle] } }).sort((a, b) => b.duplicateTitles.length - a.duplicateTitles.length)

    const pageCount = Math.ceil(sortData.length / 25)
    pageCandidate.push({ keyword: keywordObj.keyword, pageCount })

  }
  const pages = flattenArrayByPageCount(pageCandidate)

  return pages.map((post) => {
    const { keyword, page } = post

    return {
      url: `https://www.glumzi.com/dizi-sponsor-kategori/${keyword}/sayfa/${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly'
    }

  })
}


function flattenArrayByPageCount(arrayOfObjects) {
  return arrayOfObjects.flatMap(obj => {
    const { keyword, pageCount } = obj;
    return Array.from({ length: pageCount }, (_, index) => ({
      keyword,
      page: index + 1
    }));
  });
}