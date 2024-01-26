import SearchResultContainer from "./SearchResultContainer";
import items from "../fake";



export default {
  title: 'SearchResultContainer',
  component: SearchResultContainer,

};


export const Primary =()=><SearchResultContainer items={items} pageTitle="Yalı Çapkını Mobilya Sponsoru"/>
