// src/pages/Home/Home.tsx (Yangilangan)

import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import LatestIssuesSection from '../../components/articles/LatestIssuesSection';
import UsefulLinks from '../../components/common/UsefulLinks';
import ParallaxEffect from '../../components/ui/ParallaxEffect';
import CurrentIssue from '../Issues/CurrentIssue';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

    return (
        <Box>
            {/* 1. HERO SECTION - Parallax effekti bilan */}
            <ParallaxEffect backgroundImage="https://urdu.uz/user_files/user_4/Matbuot/1920%20%D1%85%201080%20%D0%BF%D0%B8%D0%BA%D1%81%D0%B5%D0%BB%20089%2B.jpg">
                <Container maxWidth="md">
                    <Typography
                        variant="h2"
                        gutterBottom
                        sx={{ fontWeight: 700, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)', mb: 2 }}
                    >
                        Journal "URDU-Journal"
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ color: 'white', mb: 4, textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                    >
                        The scientific and methodical journal of the Urgench State Pedagogical Institute, dedicated to promoting scientific research.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{ fontWeight: 700, p: '10px 30px' }}
                        component={Link}
                        to="/about"
                    >
                        More about the journal
                    </Button>
                </Container>
            </ParallaxEffect>

            {/* 2. Current Issue Section (Joriy son) */}
            <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
                <CurrentIssue />
            </Box>

            {/* 3. Latest Issues Section (So'nggi sonlar) */}
            <Box sx={{ py: 6 }}>
                <LatestIssuesSection />
            </Box>

            {/* 4. Maqola chop etishga taklif (Aksent bo'lim) */}
            <Box sx={{ backgroundColor: 'primary.main', py: 6, color: 'white' }}>
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'white' }}>
                        Want to publish a scientific article?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        We invite researchers to submit articles to be published in our journal.
                    </Typography>
                    <Button variant="contained" color="secondary" size="large" component={Link} to="/for-authors" sx={{ fontWeight: 700 }}>
                        More Information
                    </Button>
                </Container>
            </Box>

            {/* 5. Useful Links Section (Qayta ishlatiladigan komponent) */}
            <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
                <UsefulLinks />
            </Box>
        </Box>
    );
};

export default Home;