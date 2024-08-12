import fs from 'fs'
import walkSync from './walkSync.mjs'
import getBaseDomain from './getBaseDomain.mjs'
import mapPrice from './mapPrice.mjs'
import normalizeTurkish from './normalizeTurkish.mjs'
import determineRange from './determineRange.mjs'
import groupByPriceRange from './groupByPriceRange.mjs'
import reduceArrayByPrice from './reduceArrayByPrice.mjs'
import groupBy from './groupBy.mjs'
import mapObjectsWithPriceRange from './mapObjectsWithPriceRange.mjs'
import extractUniqueBrands from './extractUniqueBrands.mjs'
import sortByPriceRange from './sortByPriceRange.mjs'
import splitArrayIntoChunks from './splitArrayIntoChunks.mjs'
import deaccent from './deaccent.mjs'
const filePaths = []

const data = []
const priceRanges = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 10000, 20000, 30000, 40000, 50000]
//const priceRanges = [100,200,300,400,500,1000, 2000,3000,4000,5000,10000]
const productCategories = [{ category: 'elbise', keywords: ['elbise', 'dress', 'ELBİSE'] }, { category: 'pantolon', keywords: ['pantolon', 'pants'] }, { category: 'pijama', keywords: ['pijama'] }]


walkSync(`${process.cwd()}/product-data/unzipped-data`, (filePath) => {
    filePaths.push(filePath)
    const currentFileData = JSON.parse(fs.readFileSync(filePath))

    const withSha = currentFileData.filter(f => f.title).map((m => {

        const category = productCategories.find(p => p.keywords.some(s => normalizeTurkish(m.title).toLowerCase().includes(normalizeTurkish(s).toLowerCase()) ))?.category
        const price = mapPrice(m.price)
        return { ...m, price, brand: getBaseDomain(m.pageURL), rawPrice: m.price, category }
    }))

    data.push(...withSha)

})
const brands = extractUniqueBrands(data)
debugger
const dresses = data.filter(f => f.category === 'elbise')
debugger



const mappedPriceRange = mapObjectsWithPriceRange(dresses, priceRanges)

const groupedPriceRange = groupBy(mappedPriceRange, 'priceRange')
debugger
let topSeries = []

debugger
for (let priceRange in groupedPriceRange) {
    let series = []
    let categories = []
    let obj = {
        name: priceRange,
        data: [],
     
    }

    const current = groupedPriceRange[priceRange]
    const brandGrouped = groupBy(current, 'brand')

    for (let brand of brands) {
  

            categories.push(brand)
            const currentBrandData = brandGrouped[brand]

            const countProducts =currentBrandData? reduceArrayByPrice(currentBrandData)?.map((m => m.weight))?.reduce((prev, curr, i) => prev + curr, 0):0
        
                obj.data.push(countProducts)
            
       

           // series.push(obj)
     
    }
    series.push(obj)

    topSeries.push(series)



}

debugger
//const uniqueSeries = filterUniqueByName(topSeries.flat(1))

const sortUniqueSeries =sortByPriceRange(topSeries.flat(1))
const splitIntoChunk =splitArrayIntoChunks(sortUniqueSeries,5)
debugger
fs.writeFileSync(`product-data/groupedDataSecenek.json`, JSON.stringify({categories:brands,series: splitIntoChunk}))
debugger


function filterUniqueByName(array) {
    const uniqueNames = new Set();
    
    return array.filter(obj => {
      if (!uniqueNames.has(obj.name)) {
        uniqueNames.add(obj.name);
        return true;
      }
      return false;
    });
  }