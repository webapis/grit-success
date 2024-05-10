import { walkSync } from './walkSync.mjs'
import path from 'path'
import 'dotenv/config'
import makeDir from 'make-dir'
import { deaccent } from './deaccent.mjs'
import mergedCategories from './mergedCategories.mjs'
import searchObject from './searchObject.mjs'
import gender from './meta-data/gender.json'  assert { type: 'json' };
import color from './meta-data/color.json'  assert { type: 'json' };
import mapPrice from './mapPrice.mjs'

//import categorizedProducts from './categorizeData.mjs'
debugger
import fs from "fs"

const files = []
walkSync(path.join(process.cwd(), `/unzipped-data`), async (filepath) => {
    files.push(filepath)
})
const data = []
for (let file of files) {

    const rowData = fs.readFileSync(file)
    const objData = JSON.parse(rowData)
    data.push(...objData)


}
let menuData = {}
for (let category of mergedCategories) {
    const keywords = category.keywords.map(m => m.split('=')[0])
    const catName = category.name
    const negative = category.negative
    const genders = gender.filter(f=>f.name !=='kadın').map(m=>m.keywords).flat()
    debugger
    const colors = color.map(m => m.keywords).flat()

    const candiateData = data.filter((f) => !searchObject(f, genders)).filter((f) => negative ? !searchObject(f, negative) : true).filter(f => {
        const result = searchObject(f, keywords)

        return result
    })

    const mapedPrice = candiateData.map((m) => {
        const subcatKeyword = searchObject(m, keywords)
        const subcat = category.keywords.find(f => f.includes(subcatKeyword))
        const deaccentedSubCat =deaccent(subcat).toLowerCase()//.split("=")[0]
        debugger
        const colorkeyword = searchObject(m, colors)
        const colorName = color.find(f => f.keywords.indexOf(colorkeyword)).name
        if (!subcat) {
            debugger
        }
        return {
            ...m,
            price: mapPrice(m.price),
            category: deaccent(catName).toLocaleLowerCase(),
            subcat:deaccentedSubCat ,
            gender: 'kadın',
            color: colorName,
            group: category.group
        }
    })

    const genderData = groupBy(mapedPrice, 'gender')
    for (let gnd in genderData) {

        await makeDir(`${process.cwd()}/src/app/sponsor-kiyafeti/data/${deaccent(gnd).toLowerCase().replaceAll(' ', '-').replaceAll(',', '')}`)
        const currentData = genderData[gnd]
        const groupedData = groupBy(currentData, 'group')
        for (let group in groupedData) {
            const categories = groupBy(groupedData[group], 'category')
            for (let category in categories) {
                const data = categories[category]
                const carr = categories[category][0]
                categories[category] = { ...carr, total: data.length }
                if (gnd === 'kadın') {
                    fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/data/${deaccent(gnd).toLowerCase().replaceAll(' ', '-')}/${deaccent(category).toLowerCase().replaceAll(' ', '-').replaceAll(',', '')}-sponsorkiyafeti.json`, JSON.stringify(mapedPrice), { encoding: 'utf8' })
                }
            }

            menuData[group] = { ...menuData[group], ...categories }

        }


    }

}

debugger

fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/data/kadin/sponsorkiyafetiMenu.json`, JSON.stringify(menuData), { encoding: 'utf8' })













function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};