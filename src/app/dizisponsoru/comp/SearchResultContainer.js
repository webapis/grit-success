import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import SearchResultItem from "./SearchResultItem"
import ChipContainer from "./ChipContainer"
import SelectedDiziChip from "./SelectedDiziChip"
import BreadcrumbsComponent from "@/app/components/BreadcrumbsComponent"
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
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
  const userViewData = await getViews({ table: 'dizisponsoru' });
  const mappedResult = mapViewCountToData(data, userViewData);

  return (
    <>
      <Container 
        maxWidth="lg" 
        sx={{ 
          overflow: 'hidden',
          px: { xs: 0, sm: 2 }
        }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 3, 
            backgroundColor: 'background.paper',
            borderRadius: 2
          }}
        >
          <BreadcrumbsComponent
            items={[
              { label: 'Ana Sayfa', href: '/', icon: HomeIcon },
              { label: 'Dizi Sponsoru', href: '/dizisponsoru' },
              { label: pageTitle }
            ]}
          />
        </Paper>

        <SelectedDiziChip category={pageTitle} />
        
        <Grid 
          item 
          xs={12} 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: 3 
          }}
        >
          <ChipContainer 
            keywordsCounter={keywordsCounter}
            totalItems={totalItems}
            dizi={dizi} 
            keyword={keyword} 
          />
        </Grid>

        <Grid 
          container 
          spacing={1} 
          justifyContent="center"
          sx={{ 
            width: '100%', 
            margin: 0,
            overflow: 'hidden',
            paddingX: { xs: 0, sm: 1 }  // Remove horizontal padding on mobile
          }}
        >
          {mappedResult.map((item, index) => (
            <GridItem 
              key={item.Website}
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
  
    </>
  );
}