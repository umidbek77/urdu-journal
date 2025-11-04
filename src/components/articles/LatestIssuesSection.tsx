// src/components/articles/LatestIssuesSection.tsx (Grid o'rniga Box/Flexbox ishlatildi)

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { MOCK_ISSUES } from '../../utils/mockData';
import ArticleCard from './ArticleCard';

const LatestIssuesSection: React.FC = () => {
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

            {/* Grid container o'rniga Box (Flex container) ishlatildi */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    justifyContent: 'center',
                }}
            >
                {latestIssues.map((issue) => (
                    // Grid item (xs=12, sm=6, md=4) o'rniga Box ishlatildi
                    <Box
                        key={issue.id}
                        sx={{
                            width: {
                                xs: '100%',
                                sm: 'calc(50% - 16px)',
                                md: 'calc(33.3333% - 21.33px)',
                            },
                            flexGrow: 1,
                            maxWidth: {
                                xs: 400,
                                sm: 'calc(50% - 16px)',
                                md: 'calc(33.3333% - 21.33px)',
                            },
                        }}
                    >
                        <ArticleCard issue={issue} />
                    </Box>
                ))}
            </Box>

            {/* Barcha sonlarga o'tish tugmasi */}
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    href="/issues"
                    sx={{ fontWeight: 600, p: '10px 30px' }}
                >
                    View All Issues
                </Button>
            </Box>
        </Container>
    );
};

export default LatestIssuesSection;