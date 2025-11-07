// src/pages/Issues/CurrentIssue.tsx (O'zbek tili, Katta Rasm va Flexbox)

import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { MOCK_ISSUES } from '../../utils/mockData';
import { Link } from 'react-router-dom';

const CurrentIssue: React.FC = () => {
    // MOCK_ISSUES ni import qilish unutilmaganiga ishonch hosil qiling!
    const currentIssue = MOCK_ISSUES[0];

    if (!currentIssue) return null;

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
                Joriy Son
            </Typography>

            <Paper
                elevation={5}
                sx={{
                    p: 4,
                    transition: 'box-shadow 0.3s',
                    '&:hover': { boxShadow: '0 15px 30px rgba(0,0,0,0.2)' },
                    backgroundColor: 'background.default' // Oq fonni yanada aniqroq ajratish uchun
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4,
                        alignItems: 'center'
                    }}
                >
                    {/* Rasm joyi (Kattalashtirildi) */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 'calc(33.3333% - 16px)' },
                            flexShrink: 0,
                            flexGrow: 1
                        }}
                    >
                        <Box sx={{
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                            // Rasm balandligi kattalashtirildi (kitob/maqola muqovasi uchun)
                            maxHeight: { xs: 450, md: 550 },
                        }}>
                            {/*  */}
                            <img
                                src={currentIssue.coverImage}
                                alt={`${currentIssue.number}-son muqovasi`} // Alt text tarjimalandi
                                style={{
                                    width: '100%',
                                    height: '100%', // Katta rasm bo'lishi uchun height: 100%
                                    objectFit: 'cover', // Katta konteynerni to'ldirsin
                                    display: 'block'
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Matn joyi */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 'calc(66.6667% - 16px)' },
                            flexGrow: 1
                        }}
                    >
                        <Typography variant="h5" color="secondary" sx={{ fontWeight: 700, mb: 1 }}>
                            JILD {currentIssue.year}, SON {currentIssue.number}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                            {currentIssue.seriesName}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 1 }}>
                            **Nashr qilingan sana:** {currentIssue.publishedDate}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            **Seriyasi:** {currentIssue.series}
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
                                Kontentni ko'rish
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
                                PDF yuklab olish
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default CurrentIssue;