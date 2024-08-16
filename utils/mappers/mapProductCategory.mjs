import normalizeTurkish from "../format/normalizeTurkish.mjs"

export default function mapProductCategory({ data, categories }) {

    try {
        
        return data.filter(f => f.title).map((m => {
            if (m.title.length === 0) {
                
                throw `product title should be present: ${JSON.stringify(m)}`
            } else {
                const category = categories.find(p => p.keywords.some(s => normalizeTurkish(m.title).toLowerCase().includes(normalizeTurkish(s).toLowerCase())))?.category

                return { ...m, category }
            }

        }))
    } catch (error) {
        
        throw 'mapProductCategory' + error
    }

}