import { walkSync } from '../../utils/walkSync.mjs'
import path from 'path'
import 'dotenv/config'
import makeDir from 'make-dir'

import mergedCategories from './mergedCategories.mjs'

import gender from './meta-data/gender.json'  assert { type: 'json' };
import fs from 'fs'
import getData from './getData.mjs'

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
let menuData = []
for (let category of mergedCategories) {
    await makeDir(`${process.cwd()}/src/app/sponsor-kiyafeti/koleksiyon/data/kadin`)

    const negatives = category.negatives
    const exclude=category.exclude
    const slug = category.slug
    const positives = category.db.length > 0 ? category.db : category.positives.flat()
    const candiateData = getData({positives,negatives,exclude,keywords:category.keywords})
    
    menuData.push({total:candiateData.length,...category})
//`src/app/sponsor-kiyafeti/data/${gender}/sponsorkiyafetiMenu.json`
    fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/data/kadin/${slug}-sponsorkiyafeti.json`, JSON.stringify(candiateData), { encoding: 'utf8' })
    fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/data/kadin/sponsorkiyafetiMenu.json`, JSON.stringify(menuData), { encoding: 'utf8' })
}













function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};