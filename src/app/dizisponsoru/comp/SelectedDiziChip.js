'use client';
import { useRouter } from 'next/navigation';
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

export default function SelectedDiziChip({ category }) {
    const router = useRouter();

    const handleDelete = () => {
        router.push('/dizisponsoru');
    };

    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: '16px',
                '& .MuiChip-root': {
                    fontSize: '1rem',
                    padding: '16px 8px',
                    borderRadius: '16px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }
                }
            }}
        >
            <Chip
                component='h1'
                size="medium"
                color="primary"
                variant="outlined"
                label={category}
                onDelete={handleDelete}
                sx={{
                    fontWeight: 500,
                    letterSpacing: '0.5px'
                }}
            />
        </Box>
    );
}