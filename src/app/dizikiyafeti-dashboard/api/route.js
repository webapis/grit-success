const algoliasearch = require('algoliasearch')
const algoliaClient = algoliasearch('7JF244QSZZ', '9c4018bdcedb542cb7a0c9e5453aa7b0')
const index = algoliaClient.initIndex('dizikiyefeti')

export async function   POST(request) {
    const body = await request.json()
    debugger
    const result = await index.saveObject(body,{autoGenerateObjectIDIfNotExist:true})
    debugger
    return Response.json({ result })

}

