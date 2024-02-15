//extract page data from algolia
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const algoliasearch = require('algoliasearch')
const algoliaClient = algoliasearch('7JF244QSZZ', '9c4018bdcedb542cb7a0c9e5453aa7b0')

import pageMetaData from '../meta/pageMetaData.json' assert { type: "json" };
import fs from 'fs'

debugger
const index = algoliaClient.initIndex('dizikiyefeti');
for(let c of pageMetaData){

    debugger
    const query =c['algoliaQuery']
    const {hits} = await index.search(query,{  hitsPerPage: 100})
    const filename =c.slug[0]

    fs.writeFileSync(`${process.cwd()}/src/app/dizikiyafeti/page-data/${filename}.json`,JSON.stringify(hits),{encoding:'utf8'})

    debugger

}