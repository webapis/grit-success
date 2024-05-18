
import  walkSync  from './walkSync.js'
import path from 'path'
import fs from "fs"
export default function getData() {
let data =[]
    const files = []
    walkSync(path.join(process.cwd(), `/unzipped-data`), async (filepath) => {
     
        files.push(filepath)
    })

    for (let file of files) {
        const rowData = fs.readFileSync(file)
        const objData = JSON.parse(rowData)
        data.push(...objData)
    }
    
    return data.filter(f=>!f.error)
}