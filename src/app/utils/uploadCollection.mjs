import 'dotenv/config'
import  {walkSync}  from './walkSync.mjs'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const fs = require('fs')
var zlib = require('zlib');
const fetch = require('node-fetch')
const makeDir = require('make-dir')
const path = require('path')

console.log('process.env.GH_TOKEN__', process.env.GH_TOKEN)


async function downloadCollection(gitRepo,localRootFolder,gitFolder) {
    await getZipFiles(gitFolder,localRootFolder,gitRepo)
    await unzipFiles(localRootFolder,gitFolder)
}



async function getZipFiles(gitFolder,localRootFolder,gitRepo) {

    const response = await fetch(`https://api.github.com/repos/webapis/${gitRepo}/branches`, { method: 'get', headers: { Accept: "application/vnd.github.raw", authorization: `token ${process.env.GH_TOKEN}`, "X-GitHub-Api-Version": "2022-11-28" } })
    const data = await response.json()
debugger
    const mainSha = data.find(d => d.name === 'main')
    const { commit: { sha } } = mainSha

    //------Git database / Get a tree endpoint------
    /*required to retrieve list of file and folder into*/
    const treeResponse = await fetch(`https://api.github.com/repos/webapis/${gitRepo}/git/trees/${sha}?recursive=1`, { method: 'get', headers: { Accept: "application/vnd.github.raw", authorization: `token ${process.env.GH_TOKEN}`, "X-GitHub-Api-Version": "2022-11-28" } })
    const treeData = await treeResponse.json()
    const { tree } = treeData
        debugger
    const dataFolderTrees = tree.filter(f => f.type === 'blob' && f.path.includes(`${gitFolder}/`))


    for (let t of dataFolderTrees) {
        await getContent(t.path,localRootFolder,gitRepo)
    }
}

async function getContent(filepath,localRootFolder,gitRepo) {
    const fileName = path.basename(filepath)

    await makeDir(`${localRootFolder}/zipped-files`)
    const response = await fetch(`https://api.github.com/repos/webapis/${gitRepo}/contents/${filepath}`, { method: 'get', headers: { Accept: "application/vnd.github.raw", authorization: `token ${process.env.GH_TOKEN}`, "X-GitHub-Api-Version": "2022-11-28" } })

    var file = fs.createWriteStream(`${localRootFolder}/zipped-files/${fileName}`);

    return new Promise((resolve, reject) => {
        response.body.on('close', () => {
            console.log('fetched')
            resolve()
        })
        response.body.on('error', (error) => {
            reject(error)
        })
        response.body.pipe(file)
    })

}



async function unzipFiles(folderPath,gitFolder) {

    const promises = []
    try {

       // walkSync(path.join(process.cwd(), `/zipped-files`), async (filepath) => {

        //    promises.push(filepath)

      //  })
        walkSync(folderPath+`/zipped-files`, async (filepath) => {

            promises.push(filepath)

        })
      
        for (let a of promises) {

            await unzipSingleFile(a,gitFolder)
        }

    } catch (error) {

    }


}





async function unzipSingleFile(zippedfilePath,gitFolder) {

    const unzippedFilePath = zippedfilePath.replace('zipped-files', `unzipped-data/${gitFolder}`).replace('.gz', '')
    debugger
    const folderPath = path.dirname(unzippedFilePath)
    await makeDir(folderPath)

    const fileContents = fs.createReadStream(zippedfilePath);
    const writeStream = fs.createWriteStream(unzippedFilePath);
    const unzip = zlib.createGunzip();

    return new Promise((resolve, reject) => {
        writeStream.on('close', () => {
            console.log('unzip complete')
            resolve(true)
        })
        writeStream.on('error', (error) => {
            console.log('unzip error', error)
            reject(error)
        })
        fileContents.pipe(unzip).pipe(writeStream);
    })

}


export  {  downloadCollection }