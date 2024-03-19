import {walkSync} from './walkSync.mjs'
import path from 'path'
import 'dotenv/config'

import {deaccent} from './deaccent.mjs'
debugger
import fs  from "fs"

const files =[]
walkSync(path.join(process.cwd(), `/unzipped-data`), async (filepath) => {

  files.push(filepath)

})

debugger
const data = []
for(let file of files){

 const rowData = fs.readFileSync(file)
 data.push(...JSON.parse(rowData))



}

const groupedData = groupBy(data,'group')
for(let group in groupedData)
{
const current =groupBy( groupedData[group],'category')

for(let c in current){
  const carr = current[c][0]
  current[c]=carr
}

groupedData[group]=current

debugger
}


debugger


    debugger
   //fs.writeFileSync(`${process.cwd()}/src/app/d/page-data/dizikiyafeti.json`, JSON.stringify(objectsWithTags), { encoding: 'utf8' })
    fs.writeFileSync(`${process.cwd()}/src/app/sponsor-kiyafeti/sponsorkiyafetiMenu.json`, JSON.stringify(groupedData), { encoding: 'utf8' })
    debugger

  







function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};