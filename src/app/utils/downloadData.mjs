
import 'dotenv/config'

 import{ downloadCollection } from'./uploadCollection.mjs'
 const localRootFolder='test-data'
 const gitRepo ='crawler-state-2'
 const gitFolder='sponsor'

await downloadCollection(gitRepo,localRootFolder,gitFolder)
    

