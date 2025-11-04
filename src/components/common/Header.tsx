// src/components/common/Header.tsx (Yangilangan)

import React from 'react';
import {
    AppBar, Toolbar, Typography, Button, Box, IconButton, MenuItem, Menu, useMediaQuery, useTheme, Container,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Issues', path: '/issues' },
    { name: 'Editorial board', path: '/editorial-board' },
    { name: 'For authors', path: '/for-authors' },
    { name: 'Contacts', path: '/contacts' },
];

const Header: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const isActive = (path: string) => location.pathname === path;

    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={2}
            sx={{ borderBottom: `3px solid ${theme.palette.secondary.main}` }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>

                    {/* Logo / Sayt nomi */}
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{ flexGrow: 1, textDecoration: 'none', color: 'primary.main', fontWeight: 'bold', lineHeight: 1.2 }}
                    >
                        URDU JOURNAL
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem' }}>
                            Scientific-methodical journal
                        </Typography>
                    </Typography>

                    {isMobile ? (
                        /* Mobile Navigatsiya */
                        <Box>
                            <IconButton size="large" onClick={handleMenu} color="primary">
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                onClick={handleClose}
                            >
                                {navItems.map((item) => (
                                    <MenuItem
                                        key={item.name}
                                        component={Link}
                                        to={item.path}
                                        selected={isActive(item.path)}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                                <Divider />
                                <MenuItem>
                                    <LanguageIcon fontSize="small" sx={{ mr: 1 }} /> English
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        /* Desktop Navigatsiya */
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.name}
                                    component={Link}
                                    to={item.path}
                                    color={isActive(item.path) ? 'secondary' : 'primary'} // Active linkni ajratish
                                    sx={{
                                        mx: 0.5,
                                        fontWeight: 600,
                                        borderBottom: isActive(item.path) ? `2px solid ${theme.palette.secondary.main}` : 'none',
                                        borderRadius: 0,
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))}
                            <Button
                                variant="outlined"
                                sx={{ ml: 2, fontWeight: 600, borderColor: 'primary.main', color: 'primary.main' }}
                                startIcon={<LanguageIcon />}
                            >
                                English
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;