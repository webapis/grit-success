import searchObject from './searchObject.mjs'
import walkSync from './walkSync.mjs'
import path from 'path'
import fs from "fs"
import filterNegatives from './filterNegatives.mjs'

import gender from '../meta-data/gender.json'  assert { type: 'json' };

//import mapPrice from '../../utils/mapPrice.mjs'
const genders = gender.filter(f => f.name !== 'kadın').map(m => m.keywords).flat()
export default function getData({ positives, negatives, exclude,keywords }) {

    let data = []
    const files = []
    walkSync(path.join(process.cwd(), `/unzipped-data`), async (filepath) => {

        files.push(filepath)
    })

    for (let file of files) {
        const rowData = fs.readFileSync(file)
        const objData = JSON.parse(rowData)
        data.push(...objData)
    }
    debugger
    const dataPositive = data.filter(f => !f.error).filter(f => filterNegatives({ ...f, ...exclude }, positives)).map(m => { return { ...m, subcat: filterNegatives({ ...m, ...exclude }, keywords) } })
    debugger
    const filterNegativeGender = dataPositive.filter(f => !filterNegatives(f, genders))
    debugger
    const filterNegative = filterNegativeGender.filter(f => negatives.length > 0 ? !filterNegatives({
        ...f, "duplicateTitles": "",
        "pageTitle": "",
        "pageUrl": ""
    }, negatives) : true)
    debugger
    return filterNegative
}