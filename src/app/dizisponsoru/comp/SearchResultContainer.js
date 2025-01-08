'use client'

import { memo, useMemo } from 'react'
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import SearchResultItem from "./SearchResultItem"
import ChipContainer from "./ChipContainer"
import SelectedDiziChip from "./SelectedDiziChip"
import BreadcrumbsComponent from "@/app/components/BreadcrumbsComponent"
import HomeIcon from '@mui/icons-material/Home'
import Paper from '@mui/material/Paper'
import getViews from "@/app/utils/firebase/supabase"

// Memoized grid item component
const GridItem = memo(function GridItem({ item, userViewData }) {
  return (
    <Grid item xs={12} md={5}>
      <SearchResultItem item={item} userViewData={userViewData} />
    </Grid>
  )
})

// Memoized breadcrumbs component
const BreadcrumbsSection = memo(function BreadcrumbsSection({ pageTitle }) {
  return (
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
  )
})

// Memoized chip section component
const ChipSection = memo(function ChipSection({ keywordsCounter, totalItems, dizi, keyword }) {
  return (
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
  )
})

function SearchResultContainer({ 
  data, 
  pageTitle, 
  dizi, 
  keyword,
  keywordsCounter,
  totalItems,
  userViewData 
}) {
  // Memoize the data mapping
  const mappedResult = useMemo(() => {
    const viewsMap = new Map(
      userViewData?.data?.map(item => [item.href, item.count]) || []
    );

    return data
      .map(item => ({
        ...item,
        viewCount: viewsMap.get(item.Website) || 0
      }))
      .sort((a, b) => b.viewCount - a.viewCount);
  }, [data, userViewData]);

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        overflow: 'hidden',
        px: { xs: 0, sm: 2 }
      }}
    >
      <BreadcrumbsSection pageTitle={pageTitle} />
      <SelectedDiziChip category={pageTitle} />
      
      <ChipSection 
        keywordsCounter={keywordsCounter}
        totalItems={totalItems}
        dizi={dizi} 
        keyword={keyword}
      />

      <Grid 
        container 
        spacing={1} 
        justifyContent="center"
        sx={{ 
          width: '100%', 
          margin: 0,
          overflow: 'hidden',
          paddingX: { xs: 0, sm: 1 }
        }}
      >
        {mappedResult.map((item) => (
          <GridItem 
            key={item.Website}
            item={item}
            userViewData={userViewData}
          />
        ))}
      </Grid>

      <ChipSection 
        keywordsCounter={keywordsCounter}
        totalItems={totalItems}
        dizi={dizi} 
        keyword={keyword}
      />
    </Container>
  )
}

export default memo(SearchResultContainer)