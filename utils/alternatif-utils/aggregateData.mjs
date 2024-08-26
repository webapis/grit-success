import mapData from "../mappers/mapData.mjs";
import calculateAveragePrices from "../group/calculateAveragePrices.mjs";
import formatPriceAsTurkishLira from "../format/formatPriceAsTurkishLira.mjs";
import extractHost from "../extractors/extractHost.mjs";
import sumArray from "../reducers/sumArray.mjs";
import makeDir from "make-dir";
import { walkSync } from "../walkSync.mjs";
import path from "path"
import fs from 'fs'


const filepathes =[]

walkSync(`data-alternatif/unzipped-data`, async (filePath) => {
    filepathes.push(filePath)

    const filename = path.basename(filePath, '.json');
    const meta = JSON.parse(fs.readFileSync(`${process.cwd()}/utils/meta/alternafit/${filename}.json`))
    const mappedData = await mapData({ sourceFolder: `data-alternatif/unzipped-data/${filename}`, destinationFolder: `aggregated-data/alternatif`, fileName: 'mappedData' })
    const dataWithAveragePrice = calculateAveragePrices(mappedData)
    const mapImage = dataWithAveragePrice.map((m => {
debugger
        return { ...m,totalProducts: sumArray(m.weights), urls: { ...m.urls, imageURL: `/alternatif/${filename}/${m.brand}.jpg` }, priceFormatted: formatPriceAsTurkishLira(m.price), services: searchPropertyName(m.brand, meta)?.flat(), hostAddress: extractHost(m?.urls?.pageURL, m) }
    }))
    await makeDir(`${process.cwd()}/aggregated-data/alternatif/${filename}`)

    fs.writeFileSync(`${process.cwd()}/aggregated-data/alternatif/${filename}/dataWithAveragePrice.json`, JSON.stringify(mapImage))
    debugger

})


// const meta = JSON.parse(fs.readFileSync(`${process.cwd()}/utils/meta/alternafit/gelinlik.json`))

// const mappedData = await mapData({ sourceFolder: "data-alternatif/unzipped-data/gelinlik", destinationFolder: `aggregated-data/alternatif`, fileName: 'mappedData' })
// debugger
// const dataWithAveragePrice = calculateAveragePrices(mappedData)
// debugger
// const mapImage = dataWithAveragePrice.map((m => {

//     return { ...m, urls: { ...m.urls, imageURL: `/alternatif/gelinlik/${m.brand}.jpg` }, priceFormatted: formatPriceAsTurkishLira(m.price), services: searchPropertyName(m.brand, meta)?.flat(), hostAddress: extractHost(m?.urls?.pageURL, m) }
// }))
// debugger

// fs.writeFileSync(`${process.cwd()}/aggregated-data/alternatif/dataWithAveragePrice.json`, JSON.stringify(mapImage))
debugger

function searchPropertyName(propertyName, meta) {
    const result = Object.values(meta.filter(obj => Object.keys(obj)[0] === propertyName)).map(m => Object.values(m))[0]

    return result

}

