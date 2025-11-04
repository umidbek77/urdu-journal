// src/components/common/Logo.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
    return (
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img
                src="/images/logo_journal_small.png" // Mock rasm yo'li
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