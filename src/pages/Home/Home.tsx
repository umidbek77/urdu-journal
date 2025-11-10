import React from 'react';
import { Box, Container, Typography, Button, useTheme } from '@mui/material';
// import LatestIssuesSection from '../../components/articles/LatestIssuesSection'; // Import tiklandi
import UsefulLinks from '../../components/common/UsefulLinks';
import CurrentIssue from '../Issues/CurrentIssue';
import { Link } from 'react-router-dom';
import ResearchCallout from "../ResearchCallout/ResearchCallout";

const Home: React.FC = () => {
    const theme = useTheme();

    return (
        <Box>
            {/* 1. HERO SECTION - Ilmiy va Jozibali Ko'rinish */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '65vh', md: '95vh' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    backgroundImage: `
                        /* Kuchliroq gradient, matnni aniqroq qilish uchun */
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
                        url('https://yuz.uz/imageproxy/1200x/https://yuz.uz/file/news/2187687a3fdc6f8f5dfbabb583d8e806.jpg')
                    `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Ilmiy Sayt Dizayni: Sarlavha va Call to Action */}
                <Container maxWidth="md" sx={{ textAlign: 'center', px: 2 }}>

                    {/* Sarlavha: Katta va Ta'sirchan */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 900,
                            mb: 1,
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '3rem' },
                            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
                            lineHeight: 1.1,
                            letterSpacing: 1.5,
                        }}
                    >
                        Journal of Khwarazm Information Technologies
                    </Typography>

                    {/* Ilmiylikni ta'kidlash uchun ajratuvchi chiziq */}
                    <Box sx={{
                        width: '80px',
                        height: '4px',
                        backgroundColor: 'secondary.main',
                        margin: '15px auto 30px auto'
                    }} />

                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            mb: 5,
                            color: theme.palette.secondary.light,
                            textShadow: '1px 1px 5px rgba(0,0,0,0.8)',
                            fontSize: { xs: '1.1rem', sm: '1.4rem' },
                            fontWeight: 500,
                        }}
                    >
                        Abu Rayhon Beruniy Nomidagi Urganch Davlat Pedagogika Instituti Xorazm axborot <br/>
                        texnologiyalari jurnali ilmiy tadqiqotlar va innovatsiyalarni qo'llab-quvvatlashga bag'ishlangan.
                    </Typography>

                    {/* Tugma: Jozibador effektlar */}
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{
                            fontWeight: 700,
                            px: 5,
                            py: 1.5,
                            borderRadius:'15px',
                            boxShadow: '0 6px 25px rgba(255, 204, 0, 0.4)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'secondary.dark',
                                transform: 'scale(1.05) translateY(-2px)',
                                boxShadow: '0 8px 30px rgba(255, 204, 0, 0.6)',
                            },
                        }}
                        component={Link}
                        to="/about"
                    >
                        Jurnal Haqida Batafsil
                    </Button>
                </Container>
            </Box>

            {/* 2. Joriy Son Seksiyasi */}
            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
                <CurrentIssue />
            </Box>

            {/* 3. So'nggi Sonlar Seksiyasi (TIKLANDI) */}
            {/*<Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: '#f9fafb' }}>*/}
            {/*    <LatestIssuesSection />*/}
            {/*</Box>*/}

            {/* 4. Maqola chop etishga taklif (TIKLANDI va O'ZBEKCHAGA O'TKAZILDI) */}
            <Box
                sx={{
                    backgroundColor: 'primary.main',
                    py: { xs: 5, md: 7 },
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <ResearchCallout/>
            </Box>

            {/* 5. Foydali Havolalar Seksiyasi */}
            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
                <UsefulLinks />
            </Box>
        </Box>
    );
};

export default Home;