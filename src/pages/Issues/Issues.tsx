// src/pages/Issues/Issues.tsx

import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { MOCK_ISSUES } from '../../utils/mockData';
import ArticleCard from '../../components/articles/ArticleCard';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';

const Issues: React.FC = () => {
    // Barcha sonlarni teskari tartibda (eng yangisi birinchi) ko'rsatish
    const sortedIssues = [...MOCK_ISSUES].sort((a, b) => b.id - a.id);

    // @ts-ignore
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage="Issues Archive" />
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
                Issues Archive
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                    Total Issues Published: {MOCK_ISSUES.length}
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {sortedIssues.map((issue) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={issue.id}>
                        {/* Avval yaratilgan ArticleCard komponentini qayta ishlatamiz */}
                        <ArticleCard issue={issue} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Issues;