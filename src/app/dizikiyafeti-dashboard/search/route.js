const algoliasearch = require('algoliasearch')
const algoliaClient = algoliasearch('7JF244QSZZ', '9c4018bdcedb542cb7a0c9e5453aa7b0')



export async function   POST(request) {
    const body = await request.json()
    debugger
    const { requests } = body;

    const results = await algoliaClient.search(requests);
   
    debugger
    return Response.json(results)

}