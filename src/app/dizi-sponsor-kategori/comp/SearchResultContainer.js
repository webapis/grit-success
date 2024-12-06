import { useMemo } from 'react'
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import SelectedSponsorKategoriChip from './SelectedSponsorKategoriChip'

import WebsiteInfoComponent from "./WebsiteInfoComponent"

export default function SearchResultContainer({ data, pageTitle, userViewData }) {
    // Memoize the sorted results to prevent unnecessary recalculations
    const mappedResult = useMemo(() => {
        return data
            .map(m => {
                const linkId = m.Website
                const viewCount = userViewData.data?.find(f => f.href.includes(linkId))
                return { ...m, viewCount: viewCount?.count || 0 }
            })
            .sort((a, b) => b.viewCount - a.viewCount)
    }, [data, userViewData])

    return (
        <Container>
            <Grid 
                container 
                spacing={3} 

            >


                <Grid item xs={12}>
                    <SelectedSponsorKategoriChip category={pageTitle} />
                </Grid>

                {mappedResult.map((item, index) => (
                    <Grid item key={item.Website || index} xs={12}>
                        <WebsiteInfoComponent 
                            userViewData={userViewData} 
                            data={item} 
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
