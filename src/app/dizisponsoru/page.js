

import Application from "./Application"

import TopNavigation from "../components/TopNavigation";
export async function generateMetadata() {

  return {
    title: 'Dizi Sponsoru',

  }
}

export default async function Home(props) {




  return <>
<TopNavigation selected={2}/>
    <Application {...props}/>
  

  </>

}