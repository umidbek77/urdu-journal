// src/components/articles/LatestIssuesSection.tsx

import React from 'react';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import { MOCK_ISSUES } from '../../utils/mockData';
import ArticleCard from './ArticleCard'; // Oldin yaratgan komponent

const LatestIssuesSection: React.FC = () => {
    // Eng so'nggi 3 ta sonni olamiz
    const latestIssues = MOCK_ISSUES.slice(0, 3);

    return (
        <Container maxWidth="lg">
            <Typography
                variant="h4"
                component="h2"
                align="center"
                sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}
            >
                Latest Issues
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {latestIssues.map((issue) => (
                    <Grid item xs={12} sm={6} md={4} key={issue.id}>
                        <ArticleCard issue={issue} />
                    </Grid>
                ))}
            </Grid>

            {/* Barcha sonlarga o'tish tugmasi */}
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    href="/issues" // React Router bilan ishlashi kerak
                    sx={{ fontWeight: 600, p: '10px 30px' }}
                >
                    View All Issues
                </Button>
            </Box>
        </Container>
    );
};

export default LatestIssuesSection;