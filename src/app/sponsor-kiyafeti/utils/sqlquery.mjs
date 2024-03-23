import { walkSync } from './walkSync.mjs'
import path from 'path'
import 'dotenv/config'
import makeDir from 'make-dir'
import { deaccent } from './deaccent.mjs'
debugger
import fs from "fs"

const files = []
walkSync(path.join(process.cwd(), `/unzipped-data`), async (filepath) => {

  files.push(filepath)

})

debugger
const data = []
for (let file of files) {

  const rowData = fs.readFileSync(file)
  data.push(...JSON.parse(rowData))


}

const genderData = groupBy(data, 'gender')

for (let gnd in genderData) {

  await makeDir(`${process.cwd()}/src/app/sponsor-kiyafeti/data/${gnd}`)
  const currentData = genderData[gnd]
  const groupedData = groupBy(currentData, 'group')
  for (let group in groupedData) {
    const current = groupBy(groupedData[group], 'category')

    for (let category in current) {
      const data = current[category]
      const carr = current[category][0]
      current[category] = carr
      debugger

      fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/data/${gnd}/${category}-sponsorkiyafeti.json`, JSON.stringify(data), { encoding: 'utf8' })

    }
    
    groupedData[group] = current

  }
  fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/data/${gnd}/sponsorkiyafetiMenu.json`, JSON.stringify(groupedData), { encoding: 'utf8' })

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