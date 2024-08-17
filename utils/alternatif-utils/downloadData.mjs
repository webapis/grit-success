
import 'dotenv/config'

import { downloadCollection } from '../../utils/uploadCollection.mjs'
const localRootFolder = 'data-alternatif'
const gitRepo = 'crawler-state-2'
const folders = ['gelinlik']
debugger
for (let g of folders) {

    const gitFolder = g
    await downloadCollection(gitRepo, localRootFolder, gitFolder)

}


