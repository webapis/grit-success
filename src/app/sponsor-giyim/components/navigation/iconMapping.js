import {
    Checkroom,
    LocalMall,
    Storefront,
    Style,
    ShoppingBag,
    Accessibility,
    SportsBasketball,
    BeachAccess,
    Hiking,
    Deck,
    Snowboarding,
    Pool,
    DirectionsRun,
    SportsFootball,
    SportsTennis,
    SportsVolleyball,
} from '@mui/icons-material';

const iconMap = {
    // Default categories
    'Giyim': Checkroom,
    'Çanta': LocalMall,
    'Ayakkabı': Style,
    'Aksesuar': ShoppingBag,
    
    // Sports categories
    'Spor': SportsBasketball,
    'Koşu': DirectionsRun,
    'Futbol': SportsFootball,
    'Tenis': SportsTennis,
    'Voleybol': SportsVolleyball,
    'Yüzme': Pool,
    'Outdoor': Hiking,
    'Plaj': BeachAccess,
    'Snowboard': Snowboarding,
    'Fitness': Accessibility,
    
    // Other categories
    'Mağaza': Storefront,
    'Terlik': Deck,
};

export const getIcon = (title) => {
    // Convert title to lowercase for case-insensitive matching
    const normalizedTitle = title.toLowerCase();
    
    // Find the matching icon by checking if the title includes any of the key words
    const matchingKey = Object.keys(iconMap).find(key => 
        normalizedTitle.includes(key.toLowerCase())
    );
    
    // Get the matching icon component or default to Storefront
    const IconComponent = matchingKey ? iconMap[matchingKey] : Storefront;
    
    return <IconComponent />;
}; 