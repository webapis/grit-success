import SearchResultItem from "./SearchResultItem";

export default {
  title: 'Dizi/SearchResultItem',
  component: SearchResultItem,

};


const item ={
    "Row Labels": "Decorall",
    Website: "https://decorall.com/",
    ServiceName: "Mobilya",
    Acyklama: "Decorall, yemek odaları ve yatak odalarını kapsayan bir mobilya markasıdır",
    "Count of EpisodeNumber": 27,
    objectID: "1d489b48e5d4ac_dashboard_generated_id",
  
  }


export const Primary =()=><SearchResultItem item={item}/>
