import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
    return (
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpJ1w5b3WkXwfymHwoOunfFG_fhgEnnhEKgg&s"
                alt="Journal Logo"
                style={{ height: 40, marginRight: 10 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
                URDU-Journal
            </Typography>
        </Box>
    );
};

export default Logo;