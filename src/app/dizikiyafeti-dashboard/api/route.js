const algoliasearch = require('algoliasearch')
const client = algoliasearch('7JF244QSZZ', '9c4018bdcedb542cb7a0c9e5453aa7b0')
const index = client.initIndex('dizikiyefeti')
const record = { objectID: 1, name: 'test_record' }
export async function   POST() {

    const result = await index.saveObject(record)
    return Response.json({ result })
    
}