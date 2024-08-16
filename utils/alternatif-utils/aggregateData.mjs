import mapData from "../mappers/mapData.mjs";
import calculateAveragePrices from "../group/calculateAveragePrices.mjs";
import fs from 'fs'
const mappedData = await mapData({ sourceFolder: "data-alternatif/unzipped-data/gelinlik", destinationFolder: `aggregated-data/alternatif`, fileName: 'mappedData' })
debugger
const dataWithAveragePrice = calculateAveragePrices(mappedData)

fs.writeFileSync(`${process.cwd()}/aggregated-data/alternatif/dataWithAveragePrice.json`, JSON.stringify(dataWithAveragePrice))
debugger