
import 'dotenv/config'

import { downloadCollection } from '../../utils/uploadCollection.mjs'
const localRootFolder = 'data-sponsor-giyim'
const gitRepo = 'crawler-state-2'
const folders = ['5.step-data/giyim']
debugger
for (let g of folders) {

    const gitFolder = g
    await downloadCollection(gitRepo, localRootFolder, gitFolder)

}


