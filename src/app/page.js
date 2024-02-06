import Application from "./Application"
import Categories from "./home/components/categories"
export async function generateMetadata() {
 
  return {
    title: 'Kıyafet Markaları' ,
 
  }
}

export default async function Home({searchParams}) {
console.log("props",JSON.stringify( searchParams)==='{}')
if(JSON.stringify( searchParams)==='{}'){
  return <Categories/>
}
  return  <Application/>
}


