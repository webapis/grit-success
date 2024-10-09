import Navigation from "./Navigations";
import navigation from '../nav/navigation.json'
const data =navigation[0]
debugger
export default {
    title:'Navigation',
    component:Navigation
}

const navigationData = {
    "kadin": {
      "üst-giyim": {
        "gömlek": {
          "y70gizpey": {
            "uid": "y70gizpey"
          }
        }
      }
    }
  };

export const Primary =()=><Navigation navigationData={data} />