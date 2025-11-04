// src/components/common/Navbar.tsx

import React from 'react';
import { Box, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const navItems = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Issues', path: '/issues' },
    { title: 'Editorial board', path: '/editorial-board' },
    { title: 'For Authors', path: '/for-authors' },
    { title: 'Contacts', path: '/contacts' },
];

const Navbar: React.FC = () => {
    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4, gap: 3 }}>
            {navItems.map((item) => (
                <MuiLink
                    component={Link}
                    to={item.path}
                    key={item.title}
                    color="inherit"
                    underline="none"
                    sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        p: 1,
                        transition: 'color 0.3s',
                        '&:hover': {
                            color: 'secondary.main',
                        }
                    }}
                >
                    {item.title}
                </MuiLink>
            ))}
        </Box>
    );
};

export default Navbar;