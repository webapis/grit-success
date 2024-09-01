import mapData from "../mappers/mapData.mjs";
import calculateAveragePrices from "../group/calculateAveragePrices.mjs";
import formatPriceAsTurkishLira from "../format/formatPriceAsTurkishLira.mjs";
import extractHost from "../extractors/extractHost.mjs";
import sumArray from "../reducers/sumArray.mjs";
import makeDir from "make-dir";
import { walkSync } from "../walkSync.mjs";
import path from "path"
import fs from 'fs'

const unrelatedFilter =['çanta']
const filepathes = []
const keywords = ['Balıkçı Yaka','Sırtı Pencereli','ribana','Fermuar Detaylı','Kısa Kol']
let unmatchdata = []
walkSync(`data-kadin-kazak/unzipped-data`, async (filePath) => {
    filepathes.push(filePath)

    const filename = path.basename(filePath, '.json');

    const mappedData = await mapData({ sourceFolder: `data-kadin-kazak/unzipped-data/${filename}`, destinationFolder: `aggregated-data/kadin-kazak`, fileName: 'mappedData' })
    unmatchdata = mappedData
    for (let k of keywords) {

        const filteredData = mappedData.filter(f => f.title.toLowerCase().includes(k.toLowerCase()))
        for (let fd of filteredData) {
        
            unmatchdata = unmatchdata.filter(f => f.title !== fd.title)
        }

debugger

    }
    debugger

    // await makeDir(`${process.cwd()}/aggregated-data/kadin-kazak/${filename}`)

    // fs.writeFileSync(`${process.cwd()}/aggregated-data/kadin-kazak/${filename}/dataWithAveragePrice.json`, JSON.stringify(mapImage))
    debugger

})