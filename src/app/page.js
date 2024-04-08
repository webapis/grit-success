

//import Application from "../app/home/components/Application"
import TopNavigation from "./components/TopNavigation";
import RootComponent from "./root/RootComponent";
import pagesData from '@/app/root/category.json'
export async function generateMetadata() {

  return {
    title: 'Dizi Kıyafetleri',

  }

}

export default async function Home(props) {

  return <>
    <TopNavigation selected={1000}/>
    {pagesData.map((m)=><RootComponent title={m.title} />)}
  </>

}


