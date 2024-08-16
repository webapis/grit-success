import normalizeTurkish from "./normalizeTurkish.mjs"
export default function categoryMapper({ data }) {

    try {
        return data.filter(f => f.title).map((m => {

            const category = productCategories.find(p => p.keywords.some(s => normalizeTurkish(m.title).toLowerCase().includes(normalizeTurkish(s).toLowerCase())))?.category

            return { ...m, price: mapPrice(m.price), brand: getBaseDomain(m.pageURL), rawPrice: m.price, category }
        }))
    } catch (error) {
        throw error
    }

}