import React from 'react';
import {
    Box,
    Container,
    Typography,
    Link as MuiLink,
    IconButton,
    Divider,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../../utils/mockData';

const Footer: React.FC = () => {
    const footerNav = [
        { title: 'Jurnal haqida', path: '/about' },
        { title: 'Sonlar', path: '/issues' },
        { title: 'Tahririyat hayʼati', path: '/editorial-board' },
        { title: 'Mualliflar uchun', path: '/for-authors' },
        { title: 'Aloqa', path: '/contacts' },
    ];

    return (
        <Box
            sx={{
                backgroundColor: '#1E3A5F',
                color: 'white',
                pt: 6,
                pb: 2,
                borderTop: '5px solid #FFCC00',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        rowGap: 5,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: { xs: '100%', md: '33%' },
                            textDecoration: 'none',
                        }}
                        component={Link}
                        to="/"
                    >
                        <Box
                            component="img"
                            src="https://urdu.uz/martxa/martxa/assets/images/logoursu.png"
                            alt="Universitet Logosi"
                            sx={{
                                height: { xs: 40, md: 45 },
                                mr: 1.5,
                                flexShrink: 0,
                            }}
                        />
                        <Box sx={{ lineHeight: 1.2 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                }}
                            >
                                Journal of Khwarazm Information Technologies
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ opacity: 0.9, display: 'block', color: 'white' }}
                            >
                                Xorazm axborot texnologiyalari jurnali
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: { xs: '100%', md: '33%' },
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                color: '#white',
                                borderBottom: '2px solid #FFCC00',
                                display: 'inline-block',
                                pb: 0.5,
                            }}
                        >
                            Tezkor Havolalar
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 0.8,
                                mt: 1,
                            }}
                        >
                            {footerNav.map((item) => (
                                <MuiLink
                                    key={item.title}
                                    component={Link}
                                    to={item.path}
                                    underline="hover"
                                    color="inherit"
                                    sx={{
                                        fontSize: '0.9rem',
                                        opacity: 0.85,
                                        transition: '0.3s',
                                        '&:hover': {
                                            color: '#FFCC00',
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    {item.title}
                                </MuiLink>
                            ))}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: { xs: '100%', md: '33%' },
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                color: 'white',
                                borderBottom: '2px solid #FFCC00',
                                display: 'inline-block',
                                pb: 0.5,
                            }}
                        >
                            Aloqa
                        </Typography>

                        <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <PhoneIcon sx={{ mr: 1, fontSize: 18 }} />
                                <Typography variant="body2">
                                    {CONTACT_INFO.phone}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <EmailIcon sx={{ mr: 1, fontSize: 18 }} />
                                <Typography variant="body2">
                                    {CONTACT_INFO.email}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <LocationOnIcon sx={{ mr: 1, mt: 0.5, fontSize: 18 }} />
                                <Typography variant="body2">
                                    {CONTACT_INFO.address}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Divider
                    sx={{
                        my: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        rowGap: 1,
                    }}
                >
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        ©2024-{new Date().getFullYear()} Abu Rayhon Beruniy nomidagi Urganch davlat universiteti.
                        Barcha huquqlar himoyalangan.
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" size="small" sx={{ opacity: 0.7 }}>
                            <LanguageIcon fontSize="small" />
                        </IconButton>
                        <Typography
                            variant="caption"
                            component="span"
                            sx={{ ml: 0.5, opacity: 0.9 }}
                        >
                            O'zbekcha
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
