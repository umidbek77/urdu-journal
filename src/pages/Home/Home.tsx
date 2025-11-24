import React from 'react';
import { Box, Container, Typography, Button, useTheme } from '@mui/material';
// import LatestIssuesSection from '../../components/articles/LatestIssuesSection';
import UsefulLinks from '../../components/common/UsefulLinks';
import CurrentIssue from '../Issues/CurrentIssue';
import { Link } from 'react-router-dom';
import ResearchCallout from "../ResearchCallout/ResearchCallout";

const Home: React.FC = () => {
    useTheme();
    return (
        <Box>
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
                <Container maxWidth="md" sx={{ textAlign: 'center', px: 2 }}>
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
                        "Journal of Khwarazm Information Technologies" LAST
                    </Typography>

                    <Box sx={{
                        width: '80px',
                        height: '4px',
                        backgroundColor: 'secondary.main',
                        margin: '15px auto 30px auto'
                    }} />

                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            mb: 5,
                            color:'white',
                            textShadow: '1px 1px 5px rgba(0,0,0,0.8)',
                            fontSize: { xs: '1.1rem', sm: '1.4rem' },
                            fontWeight: 500,
                        }}
                    >
                        Abu Rayhon Beruniy Nomidagi Urganch davlat universiteti “Xorazm axborot<br/>
                        texnologiyalari” jurnali ilmiy tadqiqotlar va innovatsiyalarni qo'llab-quvvatlashga bag'ishlangan
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            fontWeight: 700,
                            px: 5,
                            py: 1.5,
                            borderRadius:'15px',
                            boxShadow: '0 6px 25px rgba(255, 204, 0, 0.4)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                                color:'white',
                                transform: 'scale(1.05) translateY(-2px)',
                                boxShadow: '0 8px 30px rgba(255, 204, 0, 0.6)',
                            },
                        }}
                        component={Link}
                        to="/about"
                    >
                        Jurnal haqida batafsil !
                    </Button>
                </Container>
            </Box>

            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
                <CurrentIssue />
            </Box>

            {/*<Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: '#f9fafb' }}>*/}
            {/*    <LatestIssuesSection />*/}
            {/*</Box>*/}

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

            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
                <UsefulLinks />
            </Box>
        </Box>
    );
};

export default Home;