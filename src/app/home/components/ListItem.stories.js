import ListItem from "./ListItem";




export default {
  title: 'Home/ListItem',
  component: ListItem,

};

const imageUrl="https://ktnimg2.mncdn.com/products/2024/01/19/2870971/a3260388-ac63-4cbe-8d54-00d54b273426_size354x464.jpg"

export const Primary =()=><ListItem imageUrl={imageUrl} brand="koton" title="Koton: Türkiye'nin Öncü Moda ve Giyim Markası" url="https://www.koton.com/kadin-en-cok-arananlar/"/>
//export const Defacto =()=><ListItem brand="defacto" title ="Defacto: Türkiye'nin Öncü Moda ve Giyim Markası"/>
