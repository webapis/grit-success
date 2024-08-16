import mapPrice from "../mappers/mapPrice.mjs";
import getJsonDataFromFolder from "../file/getJsonDataFromFolder.mjs";
import fs from 'fs'
import makeDir from "make-dir";
import mapProductCategory from "../mappers/mapProductCategory.mjs";
import getBaseDomain from "../extractors/getBaseDomain.mjs";

const categories = JSON.parse(fs.readFileSync(`${process.cwd()}/utils/meta/prdCategories.json`))
export default async function mapData({ sourceFolder, destinationFolder, fileName }) {
    
    try {
        const data = await getJsonDataFromFolder(sourceFolder)
        
        const flattenedData = data.flat()

        const mappedPrice = flattenedData.filter(f => f.price).map(m => { return { ...m, price: mapPrice(m.price, m), priceAsString: m.price } })
        const mappedCategory = mapProductCategory({ data: mappedPrice, categories })
        const mappedBrandNames = mappedCategory.map((m) => { return { ...m, brand: getBaseDomain(m.pageURL) } })
        
        await makeDir(`${process.cwd()}/${destinationFolder}`)
        

        fs.writeFileSync(`${process.cwd()}/${destinationFolder}/${fileName}.json`, JSON.stringify(mappedBrandNames))

        return mappedBrandNames
    } catch (error) {
        
        throw error
    }


    

}