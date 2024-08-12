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
const filePaths = []

const data = []
const priceRanges = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 10000, 20000, 30000, 40000, 50000]

const productCategories = [{ category: 'elbise', keywords: ['elbise', 'dress', 'ELBİSE'] }, { category: 'pantolon', keywords: ['pantolon', 'pants'] }, { category: 'pijama', keywords: ['pijama'] }]


walkSync(`${process.cwd()}/product-data/unzipped-data`, (filePath) => {
    filePaths.push(filePath)
    const currentFileData = JSON.parse(fs.readFileSync(filePath))

    const withSha = currentFileData.filter(f => f.title).map((m => {

        const category = productCategories.find(p => p.keywords.some(s => normalizeTurkish(m.title.normalize('NFD')).toLowerCase().replace(/[\u0300-\u036f]/g, "").includes(normalizeTurkish(s.normalize('NFD')).replace(/[\u0300-\u036f]/g, ""))))?.category
        const price = mapPrice(m.price)
        return { ...m, price, brand: getBaseDomain(m.pageURL), rawPrice: m.price, category }
    }))

    data.push(...withSha)

})


const dresses = data.filter(f => f.category === 'elbise')
debugger



const mappedPriceRange = mapObjectsWithPriceRange(dresses, priceRanges)

const groupedPriceRange = groupBy(mappedPriceRange, 'priceRange')
debugger
let obj = {}
debugger
for (let priceRange in groupedPriceRange) {
    obj[priceRange]={
        series:[],
        categories:[],
      
    }
    const current = groupedPriceRange[priceRange]
    const brandGrouped = groupBy(current, 'brand')



    for (let brand in brandGrouped) {
        const currentBrandData = brandGrouped[brand]
        const reduced = reduceArrayByPrice(currentBrandData).map((m=>m.weight))
 
        obj[priceRange].series.push({name:priceRange,data:reduced})
        obj[priceRange].categories.push(brand)

    }


}

debugger


