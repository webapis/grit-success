
import 'dotenv/config'

import { downloadCollection } from '../../utils/uploadCollection.mjs'
const localRootFolder = 'data-kadin-kazak'
const gitRepo = 'crawler-state-2'
const folders = ['kadin_kazak']
debugger
for (let g of folders) {
    const gitFolder = g
    await downloadCollection(gitRepo, localRootFolder, gitFolder)

}


