'use client';
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const SelectedProductCategoryChip = memo(({ selectedGender, category }) => {
    const router = useRouter();

    const handleDelete = () => {
        router.push(`/sponsor-giyim/${selectedGender.replaceAll(' ','-')}`);
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                margin: '0.75rem 0',
                padding: '0.25rem'
            }}
        >
            <Chip 
                component='h1'
                color="primary" 
                variant="outlined"
                size="medium"
                sx={{ 
                    padding: '0.75rem 0.5rem',
                    borderRadius: '16px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transform: 'translateY(-1px)'
                    }
                }}
                label={
                    <Typography 
                        variant='subtitle2' 
                        textAlign='center' 
                        sx={{
                            textTransform: 'capitalize',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                        }}
                    >
                        {selectedGender.replaceAll('-',' ')}
                        <Typography 
                            component="span" 
                            variant='subtitle2' 
                            sx={{ 
                                fontWeight: 700,
                                color: 'primary.main'
                            }}
                        >
                            {category}
                        </Typography>
                        Dizi Sponsor Markaları
                    </Typography>
                }
                onDelete={handleDelete}
            />
        </Box>
    );
});

SelectedProductCategoryChip.displayName = 'SelectedProductCategoryChip';

export default SelectedProductCategoryChip;