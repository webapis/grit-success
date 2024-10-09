

import ProductDisplay from '../components/ProductDisplay'


const data =  {
    "_id": "66f7feab1b2ee904f045105e",
    "image": [
      "https://akn-lmb-adl.a-cdn.akinoncdn.com/products/2024/06/11/476495/b3b73495-df64-40b5-a9df-76d15a7eef5a_size580x870_cropTop.jpg"
                    ],
    "price": "1799.95 ",
    "currency": "TL",
    "pageTitle": "Tüm İndirimli Ürün Modelleri | adL",
    "pageUrl": "https://www.adl.com.tr/tum-indirimli-urunler-1/?layout=4&page_size=96",
    "h2": "kadın",
    "h4": "gömlek",
    "h5": "www.adl.com.tr"
  }
export default function CategoryByBrandPage(){

    return <ProductDisplay product={data}/>

}