// src/pages/Issues/Issues.tsx (Grid o'rniga Box/Flexbox ishlatildi)
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { MOCK_ISSUES } from '../../utils/mockData';
import ArticleCard from '../../components/articles/ArticleCard';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';

const Issues: React.FC = () => {
    const sortedIssues = [...MOCK_ISSUES].sort((a, b) => b.id - a.id);

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

            {/* Grid container o'rniga Box (Flex container) ishlatildi */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4 // spacing={4} ga mos keladi
                }}
            >
                {sortedIssues.map((issue) => (
                    <Box
                        key={issue.id}
                        sx={{
                            width: {
                                xs: '100%',
                                sm: 'calc(50% - 16px)',
                                md: 'calc(33.3333% - 21.33px)',
                                lg: 'calc(25% - 24px)'
                            },
                            flexGrow: 1,
                            mb: 2
                        }}
                    >
                        <ArticleCard issue={issue} />
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default Issues;