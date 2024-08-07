
import 'dotenv/config'

import { downloadCollection } from '../../turk-dizi/utils/uploadCollection.mjs'
const localRootFolder = 'product-data'
const gitRepo = 'crawler-state-2'
const folders = ['product']

for (let g of folders) {

    const gitFolder = g
    await downloadCollection(gitRepo, localRootFolder, gitFolder)

}


