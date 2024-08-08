
import fs from 'fs'
import { createRequire } from "module";
import walkSync from './walkSync.mjs'
import mapPrice from './mapPrice.mjs';
const require = createRequire(import.meta.url);


const filePaths = []

const data = []

const productCategories =[{category:'elbise',keywords:['elbise','dress','ELBİSE']  },{category:'pantolon',keywords:['pantolon','pants']  },{category:'pijama',keywords:['pijama']  }]

walkSync(`${process.cwd()}/product-data/unzipped-data`, (filePath) => {
    filePaths.push(filePath)
    const currentFileData = JSON.parse(fs.readFileSync(filePath))
    const withSha = currentFileData.filter(f=>f.title).map((m => {
  
        const category = productCategories.find(p=>  p.keywords.some(s=>normalizeTurkish(m.title.normalize('NFD')).toLowerCase().replace(/[\u0300-\u036f]/g, "").includes(normalizeTurkish(s.normalize('NFD')).replace(/[\u0300-\u036f]/g, ""))) )?.category
  
        return { ...m, price: mapPrice(m.price), brand: getBaseDomain(m.pageURL), rawPrice: m.price, category } }))
    data.push(...withSha)
})

const groupedData = groupProductsByCategory(data)
debugger

fs.writeFileSync(`product-data/clean-data.json`, JSON.stringify(data))
fs.writeFileSync(`product-data/groupedData.json`, JSON.stringify(groupedData))



function getBaseDomain(url) {
    // Remove protocol and www if present
    let domain = url.replace(/^(https?:\/\/)?(www\.)?/, '');

    // Remove path, query parameters, and hash
    domain = domain.split('/')[0].split('?')[0].split('#')[0];

    // Split the remaining string by dots
    const parts = domain.split('.');

    // Remove known top-level domains and country codes
    while (parts.length > 1 && (parts[parts.length - 1].length <= 3 || parts[parts.length - 1] === 'com')) {
        parts.pop();
    }

    // Return the last remaining part
    return parts[parts.length - 1];
}

function groupProductsByCategory (products)  {
    return products.reduce((groupedProducts, product) => {
      const { category } = product;
      if (!groupedProducts[category]) {
        groupedProducts[category] = [];
      }
      groupedProducts[category].push(product);
      return groupedProducts;
    }, {});
  };

  function normalizeTurkish(text) {
    try {
        return text
            .replace(/ç/g, 'c').replace(/Ç/g, 'C')
            .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
            .replace(/ı/g, 'i').replace(/I/g, 'I')
            .replace(/ö/g, 'o').replace(/Ö/g, 'O')
            .replace(/ş/g, 's').replace(/Ş/g, 'S')
            .replace(/ü/g, 'u').replace(/Ü/g, 'U');
    } catch (error) {
        return text
    }

}