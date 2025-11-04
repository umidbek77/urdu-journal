// src/pages/Home/Home.tsx
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import LatestIssuesSection from '../../components/articles/LatestIssuesSection';
import UsefulLinks from '../../components/common/UsefulLinks';
import CurrentIssue from '../Issues/CurrentIssue';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <Box>
            {/* ================= HERO SECTION ================= */}
            <Box
                sx={{
                    position: 'relative',
                    height: { xs: '60vh', md: '90vh' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    backgroundImage: `
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
                        url('https://urdu.uz/user_files/user_4/Matbuot/1920%20%D1%85%201080%20%D0%BF%D0%B8%D0%BA%D1%81%D0%B5%D0%BB%20089%2B.jpg')
                    `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Container maxWidth="md" sx={{ textAlign: 'center', px: 2 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                        }}
                    >
                        Journal “URDU-Journal”
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 4,
                            color: 'rgba(255,255,255,0.9)',
                            textShadow: '1px 1px 5px rgba(0,0,0,0.6)',
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                        }}
                    >
                        The scientific and methodical journal of the Urgench State Pedagogical Institute,
                        dedicated to promoting scientific research and innovation.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{
                            fontWeight: 700,
                            px: 4,
                            py: 1.2,
                            borderRadius: 3,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            '&:hover': {
                                backgroundColor: 'secondary.dark',
                                transform: 'scale(1.05)',
                                transition: '0.3s ease',
                            },
                        }}
                        component={Link}
                        to="/about"
                    >
                        More about the journal
                    </Button>
                </Container>
            </Box>

            {/* ================= CURRENT ISSUE ================= */}
            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
                <CurrentIssue />
            </Box>

            {/* ================= LATEST ISSUES ================= */}
            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: '#f9fafb' }}>
                <LatestIssuesSection />
            </Box>

            {/* ================= CALL TO ACTION ================= */}
            <Box
                sx={{
                    backgroundColor: 'primary.main',
                    py: { xs: 5, md: 7 },
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ fontWeight: 700, mb: 2 }}
                    >
                        Want to publish a scientific article?
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 3,
                            color: 'rgba(255,255,255,0.9)',
                        }}
                    >
                        We invite researchers to submit their articles for publication in our journal.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        component={Link}
                        to="/for-authors"
                        sx={{
                            fontWeight: 700,
                            px: 4,
                            py: 1.2,
                            borderRadius: 3,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            '&:hover': {
                                backgroundColor: 'secondary.dark',
                                transform: 'scale(1.05)',
                                transition: '0.3s ease',
                            },
                        }}
                    >
                        More Information
                    </Button>
                </Container>
            </Box>

            {/* ================= USEFUL LINKS ================= */}
            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
                <UsefulLinks />
            </Box>
        </Box>
    );
};

export default Home;
