// src/components/common/Footer.tsx (Grid o'rniga Box/Flexbox ishlatildi)

import React from 'react';
import { Box, Container, Typography, Link as MuiLink, IconButton, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../../utils/mockData';

const Footer: React.FC = () => {
    const footerNav = [
        { title: 'About', path: '/about' },
        { title: 'Issues', path: '/issues' },
        { title: 'Editorial board', path: '/editorial-board' },
        { title: 'For authors', path: '/for-authors' },
        { title: 'Contacts', 'path': '/contacts' },
    ];

    return (
        <Box sx={{
            backgroundColor: '#1E3A5F', // To'qroq ko'k rang
            color: 'white',
            pt: 6,
            pb: 2,
            borderTop: '5px solid #FFCC00' // Aksent chizig'i
        }}>
            <Container maxWidth="lg">

                {/* Grid container o'rniga Box (Flex container) ishlatildi */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4 // spacing={4} ga mos keladi
                    }}
                >
                    {/* 1. Jurnal haqida ma'lumot / Logo (md=4) */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 'calc(33.3333% - 16px)' }, // md=4 ga mos
                            flexShrink: 0
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 'bold', mb: 1, borderBottom: '2px solid #FFCC00', display: 'inline-block', pb: 0.5 }}
                        >
                            SCIENCE AND SOCIETY
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Journal "Science and society" of Nukus State Pedagogical Institute named after Ajiniyaz.
                        </Typography>
                    </Box>

                    {/* 2. Kontakt ma'lumotlari (sm=6, md=4) */}
                    <Box
                        sx={{
                            width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.3333% - 16px)' }, // sm=6, md=4 ga mos
                            flexShrink: 0
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                            Contacts
                        </Typography>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <PhoneIcon sx={{ mr: 1, fontSize: 18 }} />
                                <Typography variant="body2">{CONTACT_INFO.phone}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <EmailIcon sx={{ mr: 1, fontSize: 18 }} />
                                <Typography variant="body2">{CONTACT_INFO.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <LocationOnIcon sx={{ mr: 1, mt: 0.5, fontSize: 18 }} />
                                <Typography variant="body2">{CONTACT_INFO.address}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* 3. Navigatsiya havolalari (sm=6, md=4) */}
                    <Box
                        sx={{
                            width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.3333% - 16px)' }, // sm=6, md=4 ga mos
                            flexShrink: 0
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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

                </Box>

                <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

                {/* Mualliflik huquqi (Copyright) qismi o'zgarishsiz */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        ©2020-2025 Nukus State Pedagogical Institute named after Ajiniyaz.
                    </Typography>
                    <Box>
                        <IconButton color="inherit" size="small" sx={{ opacity: 0.7 }}>
                            <LanguageIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption" component="span" sx={{ ml: 0.5, opacity: 0.9 }}>
                            English
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;