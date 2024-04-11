import { walkSync } from './walkSync.mjs'
import path from 'path'
import 'dotenv/config'
import makeDir from 'make-dir'
import { deaccent } from './deaccent.mjs'
import categorizedProducts from './categorizeData.mjs'
debugger
import fs from "fs"

const files = []
walkSync(path.join(process.cwd(), `/unzipped-data`), async (filepath) => {

  files.push(filepath)

})


const data = []
for (let file of files) {

  const rowData = fs.readFileSync(file)
  const catData = categorizedProducts(JSON.parse(rowData))
  data.push(...catData)


}

const genderData = groupBy(data, 'gender')

for (let gnd in genderData) {
  debugger
  await makeDir(`${process.cwd()}/src/app/sponsor-kiyafeti/data/${deaccent(gnd).toLowerCase().replaceAll(' ','-')}`)
  const currentData = genderData[gnd]
  const groupedData = groupBy(currentData, 'group')
  for (let group in groupedData) {
    const categories = groupBy(groupedData[group], 'category')

    for (let category in categories) {
      const data = categories[category]
      const carr = categories[category][0]
      categories[category] = { ...carr, total: data.length }

      if (category === 'diğer') {


      }

      fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/data/${deaccent(gnd).toLowerCase().replaceAll(' ','-')}/${deaccent(category).toLowerCase().replaceAll(' ','-')}-sponsorkiyafeti.json`, JSON.stringify(data), { encoding: 'utf8' })

    }

    groupedData[group] = categories

  }
  fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/data/${deaccent(gnd).toLowerCase().replaceAll(' ','-')}/sponsorkiyafetiMenu.json`, JSON.stringify(groupedData), { encoding: 'utf8' })

  debugger
}
debugger







debugger



function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};