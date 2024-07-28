import PosterContainer  from '.';
import  Grid  from '@mui/material/Grid';
import './index.css'
export default{
    title:'PosterContainer ',
    component:PosterContainer 


}

const posters = [
  { id: 1, image: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg', title: 'Series 1', genre: 'Drama' },
  { id: 2, image: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg', title: 'Series 2', genre: 'Comedy' },
  { id: 3, image: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg', title: 'Series 2', genre: 'Comedy' },
  { id: 4, image: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg', title: 'Series 2', genre: 'Comedy' },
  { id: 5, image: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg', title: 'Series 2', genre: 'Comedy' },
  { id: 6, image: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg', title: 'Series 2', genre: 'Comedy' },
  { id: 7, image: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg', title: 'Series 2', genre: 'Comedy' },
  { id: 8, image: 'https://media.bantmag.com/wp-content/uploads/2023/12/turk-dedektif-header.jpeg', title: 'Series 2', genre: 'Comedy' },
  // More posters...
];


  

export const Primary=() => <PosterContainer posters={posters}  />