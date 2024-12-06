import {
    Checkroom,
    Palette,
    Style,
    LocalMall,
    Category
} from '@mui/icons-material';

export const getIcon = (title) => {
    const lowercaseTitle = title.toLowerCase();
    
    // Add your mapping logic here based on your categories
    if (lowercaseTitle.includes('elbise')) return <Checkroom />;
    if (lowercaseTitle.includes('renk')) return <Palette />;
    if (lowercaseTitle.includes('stil')) return <Style />;
    if (lowercaseTitle.includes('çanta')) return <LocalMall />;
    
    // Default icon for unknown categories
    return <Category />;
}; 