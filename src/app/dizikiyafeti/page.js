

import Application from "@/app/home/components/Application"
import TopNavigation from "../components/TopNavigation";
0

export async function generateMetadata() {

  return {
    title: 'Dizi Kıyafetleri',

  }

}

export default async function Home(props) {

  return <>
    <TopNavigation selected={0} />
  <Application/>
  
  </>

}


