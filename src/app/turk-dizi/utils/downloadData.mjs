
import 'dotenv/config'

import { downloadCollection } from './uploadCollection.mjs'
const localRootFolder = 'turk-dizi-data'
const gitRepo = 'crawler-state-2'
const folders = ['pcomanies', 'tvseries']

for (let g of folders) {

    const gitFolder = g
    await downloadCollection(gitRepo, localRootFolder, gitFolder)

}


