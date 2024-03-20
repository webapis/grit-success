import { walkSync } from './walkSync.mjs'
import path from 'path'
import 'dotenv/config'

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

for(let gnd in genderData){
  const currentData =genderData[gnd]
  const groupedData = groupBy(currentData,'group')
  for (let group in groupedData) {
    const current = groupBy(groupedData[group], 'category')
  
    for (let c in current) {
      const carr = current[c][0]
      current[c] = carr
    }
  
    groupedData[group] = current
  
    debugger
  }
  fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/${gnd}-sponsorkiyafeti.json`, JSON.stringify(currentData), { encoding: 'utf8' })
  fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/${gnd}-sponsorkiyafetiMenu.json`, JSON.stringify(groupedData), { encoding: 'utf8' })

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