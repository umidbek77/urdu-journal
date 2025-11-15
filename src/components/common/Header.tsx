import React from 'react';
import {
    AppBar, Toolbar, Typography, Button, Box, IconButton, MenuItem, Menu, useMediaQuery, useTheme, Container,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { name: 'Jurnal haqida', path: '/about' },
    { name: 'Sonlar', path: '/issues' },
    { name: 'Tahririyat hay`ati', path: '/editorial-board' },
    { name: 'Mualliflar uchun', path: '/for-authors' },
    { name: 'Kontaktlar', path: '/contacts' },
];

const Header: React.FC = () => {
    const theme = useTheme();
    const isSmallDesktop = useMediaQuery(theme.breakpoints.down('lg'));
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
            sx={{
                borderBottom: `3px solid ${theme.palette.secondary.main}`,
                zIndex: theme.zIndex.appBar + 1
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{
                    justifyContent: 'space-between',
                    px: { xs: 1, sm: 2 },
                    py: { xs: 1, lg: 0.5 }
                }}>

                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'primary.main',
                            flexShrink: 0,
                            mr: 2,
                        }}
                    >
                        <Box
                            component="img"
                            src="https://urdu.uz/martxa/martxa/assets/images/logoursu.png"
                            alt="Universitet Logosi"
                            sx={{
                                height: { xs: 35, md: 45 },
                                mr: 1.5,
                                flexShrink: 0
                            }}
                        />

                        <Box sx={{ lineHeight: 1.2 }}>
                            <Typography
                                variant={isMobile ? "subtitle2" : "h6"}
                                sx={{ color: 'primary.main', fontWeight: 'bold', flexShrink: 1, display: 'block' }}
                            >
                                Journal of Khwarazm Information Technologies
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                display="block"
                                sx={{
                                    fontSize: { xs: '0.65rem', md: '0.75rem' },
                                    lineHeight: 1.2
                                }}
                            >
                                Xorazm axborot texnologiyalari jurnali
                            </Typography>
                        </Box>
                    </Box>

                    {isSmallDesktop ? (
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
                                    <LanguageIcon fontSize="small" sx={{ mr: 1 }} /> Tilni o'zgartirish
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.name}
                                    component={Link}
                                    to={item.path}
                                    color={isActive(item.path) ? 'secondary' : 'primary'}
                                    sx={{
                                        mx: 0.3,
                                        px: 1,
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        borderBottom: isActive(item.path) ? `2px solid ${theme.palette.secondary.main}` : 'none',
                                        borderRadius: 0,
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))}
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                    ml: 2,
                                    fontWeight: 600,
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    whiteSpace: 'nowrap'
                                }}
                                startIcon={<LanguageIcon />}
                            >
                                O'zbekcha
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;