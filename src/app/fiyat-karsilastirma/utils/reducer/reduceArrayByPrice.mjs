
export default function reduceArrayByPrice(products) {
    return products.reduce((acc, product) => {
      const existingProduct = acc.find(p => p.price === product.price);
  
      if (existingProduct) {
        existingProduct.weight++;
        existingProduct.data.push(product);
      } else {
        acc.push({ ...product, weight: 1, data: [product] });
      }
  
      return acc;
    }, []);
  }
// export default function reduceArrayByPrice(products) {
//     return products.reduce((acc, product) => {
//       const price = product.price;
//       const existingProduct = acc.find(p =>Math.ceil(p.price) === Math.ceil(price));
  
//       if (existingProduct) {
//         existingProduct.weight++;
//       } else {
//         acc.push({ ...product, weight: 1 });
//       }
  
//       return acc;
//     }, []);
//   }
  