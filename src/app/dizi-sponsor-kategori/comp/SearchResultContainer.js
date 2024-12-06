import { useMemo } from 'react'
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import SelectedSponsorKategoriChip from './SelectedSponsorKategoriChip'
import WebsiteInfoComponent from "./WebsiteInfoComponent"
import { memo } from 'react'
import Box from '@mui/material/Box'

const SearchResultContainer = memo(function SearchResultContainer({ data, pageTitle, userViewData }) {
    const mappedResult = useMemo(() => {
        if (!data?.length || !userViewData?.data) return [];
        
        return data
            .map(m => {
                const linkId = m.Website
                const viewCount = userViewData.data?.find(f => f.href.includes(linkId))
                return { ...m, viewCount: viewCount?.count || 0 }
            })
            .sort((a, b) => b.viewCount - a.viewCount)
    }, [data, userViewData])

    if (!mappedResult.length) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                No results found
            </Box>
        )
    }

    return (
        <Container maxWidth="lg">
            <Grid 
                container 
                spacing={3}
                sx={{
                    py: 3,
                    '@media (max-width: 600px)': {
                        py: 2,
                    }
                }}
            >
                <Grid item xs={12}>
                    <SelectedSponsorKategoriChip category={pageTitle} />
                </Grid>

                {mappedResult.map((item, index) => (
                    <Grid 
                        item 
                        key={item.Website || index} 
                        xs={12}
                        sx={{ 
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        <WebsiteInfoComponent 
                            userViewData={userViewData} 
                            data={item} 
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
})

export default SearchResultContainer
