
import 'dotenv/config'

 import{ downloadCollection } from'../../utils/uploadCollection.mjs'
 const localRootFolder='turk-dizi-data'
 const gitRepo ='crawler-state-2'
 const gitFolder='tvseries'

await downloadCollection(gitRepo,localRootFolder,gitFolder)
    

