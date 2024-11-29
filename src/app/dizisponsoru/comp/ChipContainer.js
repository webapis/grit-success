
import Grid from "@mui/material/Grid"

export default function ChipContainer({ dizi, keyword, keywordsCounter,totalItems }) {
    debugger
    return <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

        <Grid container gap={1} sx={{ display: 'flex', justifyContent: 'center' }}>

            {keywordsCounter && keywordsCounter.sort((a,b)=>b.count-a.count).filter(f => f.count > 0).map((m, i) => {
                return <CustomLink key={i} href={`/dizisponsoru/${dizi}/${m.keyword}/sayfa/1`} isSelected={m.keyword === keyword}>{m.keywordTitle}({m.count})</CustomLink>
            })}

        </Grid>
    </Grid>
}


const CustomLink = ({ href, children, isSelected }) => (
    <div style={{
        display: 'inline-block',
        padding: '6px 12px',
        margin: '4px',
        backgroundColor: isSelected ? '#1976D2' : '#f0f0f0',
        borderRadius: '16px',
        color: isSelected ? '#fff' : '#333',
        cursor: 'pointer'
    }}>
        <a href={href} style={{ backgroundColor: isSelected ? '#1976D2' : '#f0f0f0', color: isSelected ? '#fff' : '#333', textDecoration: 'none' }}>{children}</a>
    </div>
);
