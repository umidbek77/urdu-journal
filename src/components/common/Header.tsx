// src/components/common/Header.tsx (Barcha matnlar o'zbek tiliga o'tkazildi)

import React from 'react';
import {
    AppBar, Toolbar, Typography, Button, Box, IconButton, MenuItem, Menu, useMediaQuery, useTheme, Container,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { name: 'Jurnal haqida', path: '/about' },      // About -> Jurnal haqida
    { name: 'Sonlar', path: '/issues' },            // Issues -> Sonlar
    { name: 'Tahririyat kengashi', path: '/editorial-board' }, // Editorial board -> Tahririyat kengashi
    { name: 'Mualliflar uchun', path: '/for-authors' }, // For authors -> Mualliflar uchun
    { name: 'Kontaktlar', path: '/contacts' },      // Contacts -> Kontaktlar
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

                    {/* Logo / Sayt nomi qismi */}
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            flexGrow: 1,
                            color: 'primary.main',
                            mr: 2
                        }}
                    >
                        {/* 1. Logo Rasmi */}
                        <Box
                            component="img"
                            src="https://urdu.uz/martxa/martxa/assets/images/logoursu.png"
                            alt="Universitet Logosi" // Alt text tarjimalandi
                            sx={{
                                height: 43,
                                mr: 1.2,
                                flexShrink: 0
                            }}
                        />

                        {/* 2. Matn */}
                        <Typography
                            variant="h6"
                            sx={{ color: 'primary.main', fontWeight: 'bold', lineHeight: 1.2, flexShrink: 1 }}
                        >
                            URDU JURNALI
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.7rem' }}>
                                Ilmiy-uslubiy jurnal
                            </Typography>
                        </Typography>
                    </Box>

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
                                    <LanguageIcon fontSize="small" sx={{ mr: 1 }} /> O'zbekcha
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
                                    color={isActive(item.path) ? 'secondary' : 'primary'}
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
                                Tilni o'zgartirish
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;