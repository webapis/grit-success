import { walkSync } from '../../utils/walkSync.mjs'
import path from 'path'
import 'dotenv/config'
import makeDir from 'make-dir'
import { deaccent } from '../../utils/deaccent.mjs'
import mergedCategories from './mergedCategories.mjs'
import searchObject from './searchObject.mjs'
import gender from '../../utils/meta-data/gender.json'  assert { type: 'json' };
import fs from 'fs'
import mapPrice from '../../utils/mapPrice.mjs'
const genders = gender.filter(f => f.name !== 'kadın').map(m => m.keywords).flat()
//import categorizedProducts from './categorizeData.mjs'
debugger


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
    await makeDir(`${process.cwd()}/src/app/sponsor-kiyafeti/koleksiyon/data/kadin`)

    const positives = category.positives
    const negatives = category.negatives
    const exclude=category.exclude
    const slug = category.slug
    const candiateData = data.filter(f => !f.error).filter(f => searchObject(f, genders).length === 0).filter(f => searchObject({...f,...exclude}, positives).length > 0 && searchObject({...f,...exclude}, negatives).length === 0).map(m => { return { ...m, keywords: searchObject(m, positives) } })
    debugger

    fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/koleksiyon/data/kadin/${slug}.json`, JSON.stringify(candiateData), { encoding: 'utf8' })

}













function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};