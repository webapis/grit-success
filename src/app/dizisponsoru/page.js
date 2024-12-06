import Application,{mappedData} from "./Application"
import PersistentDrawerLeft from "@/app/components/drawer"
//import TopNavigation from "../components/TopNavigation";
export  function generateMetadata() {
  return {
    title: 'Dizi Sponsoru',

  }
}

export default function Home(props) {
  return (

      <Application {...props}/>

  );
}