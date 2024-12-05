import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import SearchResultItem from "./SearchResultItem"
import ChipContainer from "./ChipContainer"
import SelectedDiziChip from "./SelectedDiziChip"
//import TopNavigation from "@/app/components/TopNavigation"
import { mappedData } from "../Application"
import PersistentDrawerLeft from "@/app/components/drawer"
import getViews from "@/app/utils/firebase/supabase"

// Memoized view count mapping function
const mapViewCountToData = (data, viewData) => {
  const viewsMap = new Map(
    viewData['data'].map(item => [item.href, item.count])
  );

  return data.map(item => ({
    ...item,
    viewCount: viewsMap.get(item.Website) || 0
  })).sort((a, b) => b.viewCount - a.viewCount);
};

// Memoized grid item component
const GridItem = ({ item, userViewData, index }) => (
  <Grid item key={index} xs={12} md={5}>
    <SearchResultItem item={item} userViewData={userViewData} />
  </Grid>
);

export default async function SearchResultContainer({ 
  data, 
  pageTitle, 
  dizi, 
  keyword,
  keywordsCounter,
  totalItems 
}) {
  // Get view data
  const userViewData = await getViews({ table: 'dizisponsoru' });
  
  // Map and sort data efficiently using the memoized function
  const mappedResult = mapViewCountToData(data, userViewData);

  // Common props for ChipContainer to avoid prop spreading
  const chipContainerProps = {
    dizi,
    keyword,
    keywordsCounter,
    totalItems
  };

  return (
    <>
      {/* <TopNavigation selected={2} /> */}
      <PersistentDrawerLeft data={mappedData} title="Dizi Sponsoru">
        <Container>
          <SelectedDiziChip category={pageTitle} />
          
          <Grid 
            container 
            gap={1} 
            justifyContent="center"
          >
            <ChipContainer {...chipContainerProps} />
            
            {mappedResult.map((item, index) => (
              <GridItem 
                key={item.Website} // Using Website as a unique key instead of index
                item={item}
                userViewData={userViewData}
                index={index}
              />
            ))}
          </Grid>

          <Grid 
            item 
            xs={12} 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: 3 
            }}
          >
            <ChipContainer dizi={dizi} keyword={keyword} />
          </Grid>
        </Container>
      </PersistentDrawerLeft>
    </>
  );
}