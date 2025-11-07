// src/components/common/Footer.tsx (O'zbek Tiliga tarjima qilindi)

import React from 'react';
import { Box, Container, Typography, Link as MuiLink, IconButton, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../../utils/mockData';

const Footer: React.FC = () => {
    // Navigatsiya havolalari o'zbek tiliga tarjima qilindi
    const footerNav = [
        { title: 'Jurnal haqida', path: '/about' },
        { title: 'Sonlar', path: '/issues' },
        { title: 'Tahririyat hayʼati', path: '/editorial-board' },
        { title: 'Mualliflar uchun', path: '/for-authors' },
        { title: 'Aloqa', 'path': '/contacts' },
    ];

    return (
        <Box sx={{
            backgroundColor: '#1E3A5F', // To'q Ko'k
            color: 'white',
            pt: 6,
            pb: 2,
            borderTop: '5px solid #FFCC00' // Sekundar rang (Sariq)
        }}>
            <Container maxWidth="lg">

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        gap: 4
                    }}
                >
                    {/* 1. Jurnal haqida ma'lumot / Logo */}
                    <Box
                        sx={{
                            width: { xs: '100%', sm: 'calc(33.3333% - 21.33px)' },
                            flexGrow: 1,
                            order: { xs: 1, md: 1 }
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 'bold', mb: 1, borderBottom: '2px solid #FFCC00', display: 'inline-block', pb: 0.5 }}
                        >
                            URDU JURNALI
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Urganch Davlat Pedagogika Institutining ilmiy-uslubiy jurnali.
                        </Typography>
                    </Box>

                    {/* 2. Navigatsiya havolalari (Tezkor Havolalar) */}
                    <Box
                        sx={{
                            width: { xs: '100%', sm: 'calc(33.3333% - 21.33px)' },
                            flexGrow: 1,
                            order: { xs: 3, md: 2 },
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
                            Tezkor Havolalar
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {footerNav.map((item) => (
                                <MuiLink
                                    component={Link}
                                    to={item.path}
                                    key={item.title}
                                    color="inherit"
                                    underline="hover"
                                    sx={{ mb: 0.5, opacity: 0.9, '&:hover': { opacity: 1, color: '#FFCC00' } }}
                                >
                                    {item.title}
                                </MuiLink>
                            ))}
                        </Box>
                    </Box>

                    {/* 3. Kontakt ma'lumotlari */}
                    <Box
                        sx={{
                            width: { xs: '100%', sm: 'calc(33.3333% - 21.33px)' },
                            flexGrow: 1,
                            order: { xs: 2, md: 3 }
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                            Aloqa
                        </Typography>
                        <Box>
                            {/* Telefon raqami */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <PhoneIcon sx={{ mr: 1, fontSize: 18 }} />
                                <Typography variant="body2">{CONTACT_INFO.phone}</Typography>
                            </Box>
                            {/* Elektron pochta */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <EmailIcon sx={{ mr: 1, fontSize: 18 }} />
                                <Typography variant="body2">{CONTACT_INFO.email}</Typography>
                            </Box>
                            {/* Manzil */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <LocationOnIcon sx={{ mr: 1, mt: 0.5, fontSize: 18 }} />
                                <Typography variant="body2">{CONTACT_INFO.address}</Typography>
                            </Box>
                        </Box>
                    </Box>

                </Box>

                <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

                {/* Mualliflik huquqi (Copyright) qismi */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        ©2020-{new Date().getFullYear()} Urganch Davlat Pedagogika Instituti. Barcha huquqlar himoyalangan.
                    </Typography>
                    <Box>
                        <IconButton color="inherit" size="small" sx={{ opacity: 0.7 }}>
                            <LanguageIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" component="span" sx={{ ml: 0.5, opacity: 0.9 }}>
                            O'zbekcha
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;