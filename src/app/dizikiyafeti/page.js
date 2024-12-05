

import Application from "./comps/Application"
import TopNavigation from "../components/TopNavigation";
0

export  function generateMetadata() {

  return {
    title: 'Dizi Kıyafetleri',

  }

}

export default  function Home(props) {

  return <>
    <TopNavigation selected={1} />
  <Application/>
  
  </>

}


