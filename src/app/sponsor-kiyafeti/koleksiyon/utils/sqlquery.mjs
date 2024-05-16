import { walkSync } from '../../utils/walkSync.mjs'
import path from 'path'
import 'dotenv/config'
import makeDir from 'make-dir'
import { deaccent } from '../../utils/deaccent.mjs'
import mergedCategories from './mergedCategories.mjs'
import searchObject from '../../utils/searchObject.mjs'

import mapPrice from '../../utils/mapPrice.mjs'

//import categorizedProducts from './categorizeData.mjs'
debugger
import fs from "fs"

const files = []
walkSync(path.join(process.cwd(), `/unzipped-data`), async (filepath) => {
    files.push(filepath)
})
const data = []
const unusedData = []
for (let file of files) {

    const rowData = fs.readFileSync(file)
    const objData = JSON.parse(rowData)
    data.push(...objData)
    unusedData.push(...objData)

}
let menuData = {}
for (let category of mergedCategories) {

    const keywords = category.keywords
    const positives = category.positives
    const name = category.name
    const candiateData = data.filter(f => !f.error).filter(f=>searchObject(f,positives))
debugger

}











function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};