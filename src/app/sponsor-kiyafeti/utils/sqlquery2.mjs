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
const unusedData = []
for (let file of files) {

    const rowData = fs.readFileSync(file)
    const objData = JSON.parse(rowData)
    data.push(...objData)
    unusedData.push(...objData)

}
let menuData = {}
for (let category of mergedCategories) {
    const keywords = category.keywords.map(m => m.split('=')[0])
    const catName = category.name
    const negative = category.negative
    const exceptions = category.exceptions

    const otherNegatives = mergedCategories.filter(f => f.name !== catName).map(m => m.keywords).flat().filter(item => exceptions ? !exceptions.includes(item.toLowerCase()) : true);

    const genders = gender.filter(f => f.name !== 'kadın').map(m => m.keywords).flat()

    const colors = color.map(m => m.keywords).flat()

    const candiateData = data.filter(f => {
        const result = searchObject({ ...f, duplicateTitles: [], pageTitle: '',image:[],pageUrl:'',marka:'' }, keywords)

        return result
    }).filter((f) => !searchObject(f, genders)).filter((f) => negative ? !searchObject({ ...f, duplicateTitles: [], pageTitle: '', link: '',image:[],pageUrl:'',marka:'' }, [...otherNegatives, ...negative]) : !searchObject({ ...f, duplicateTitles: [], pageTitle: '', link: '',image:[],pageUrl:'',marka:'' }, otherNegatives))

    for (let item of candiateData) {
        const index = unusedData.findIndex(obj => obj.link === item.link);
        if (index !== -1) {
            unusedData.splice(index, 1);
        }
    }

    const mapedPrice = candiateData.map((m) => {
        const subcatKeyword = searchObject(m, keywords)
        const subcat = category.keywords.find(f => f.includes(subcatKeyword))
        const deaccentedSubCat = deaccent(subcat).toLowerCase()//.split("=")[0]

        const colorkeyword = searchObject(m, colors)
        const colorName = color.find(f => f.keywords.indexOf(colorkeyword)).name
        if (!subcat) {

        }
        return {
            ...m,
            price: mapPrice(m.price),
            category: deaccent(catName).toLocaleLowerCase(),
            subcat: deaccentedSubCat,
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
const genders = gender.filter(f => f.name !== 'kadın').map(m => m.keywords).flat()
debugger
const removeUnrelated = unusedData.filter(obj => !searchObject(obj, [...genders, 'Ev Dekorasyon', 'mutfak', 'Homeworks','Maske']));
debugger

fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/data/kadin/sponsorkiyafetiMenu.json`, JSON.stringify(menuData), { encoding: 'utf8' })
fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/data/kadin/02-unusedData.json`, JSON.stringify(removeUnrelated), { encoding: 'utf8' })













function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};