// src/pages/Issues/CurrentIssue.tsx (Grid o'rniga Box/Flexbox ishlatildi)

import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { MOCK_ISSUES } from '../../utils/mockData';
import { Link } from 'react-router-dom';

const CurrentIssue: React.FC = () => {
    // Eng so'nggi sonni olamiz
    const currentIssue = MOCK_ISSUES[0];

    if (!currentIssue) return null;

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                Current Issue
            </Typography>

            <Paper
                elevation={5}
                sx={{ p: 4, transition: 'box-shadow 0.3s', '&:hover': { boxShadow: '0 15px 30px rgba(0,0,0,0.2)' } }}
            >
                {/* Grid container o'rniga Box (Flex container) ishlatildi */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4, // spacing={4} ga mos keladi
                        alignItems: 'center'
                    }}
                >
                    {/* Chap qism: Muqova rasmi (md=4 ga mos Box) */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 'calc(33.3333% - 16px)' }, // md=4 ga mos
                            flexShrink: 0,
                            flexGrow: 1 // Kichik ekranlarda butun kenglikni olishi uchun
                        }}
                    >
                        <Box sx={{
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                            maxHeight: 400
                        }}>
                            <img
                                src={currentIssue.coverImage}
                                alt={`Cover of Issue ${currentIssue.number}`}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </Box>
                    </Box>

                    {/* O'ng qism: Ma'lumotlar (md=8 ga mos Box) */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 'calc(66.6667% - 16px)' }, // md=8 ga mos
                            flexGrow: 1
                        }}
                    >
                        <Typography variant="h5" color="secondary" sx={{ fontWeight: 700, mb: 1 }}>
                            VOLUME {currentIssue.year}, {currentIssue.number}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                            {currentIssue.seriesName}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 1 }}>
                            **Published Date:** {currentIssue.publishedDate}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            **Series:** {currentIssue.series}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                component={Link}
                                to={`/issues/${currentIssue.id}`}
                                sx={{ fontWeight: 700 }}
                            >
                                View Content
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                startIcon={<DownloadIcon />}
                                // Mock link
                                href="#"
                                sx={{ fontWeight: 600 }}
                            >
                                Download PDF
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default CurrentIssue;