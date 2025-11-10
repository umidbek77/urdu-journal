import React from 'react';
import { Box, Container, Typography, Button, useTheme, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const ResearchCallout: React.FC = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ my: { xs: 4, md: 8 } }}>
            <Paper
                elevation={6}
                sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: 3,
                    backgroundColor: theme.palette.background.paper, // Oq fonni saqlab qolish
                    borderLeft: `8px solid ${theme.palette.primary.main}`, // Kuchli vertikal chiziq nufuzni ta'kidlaydi
                    transition: 'box-shadow 0.4s',
                    '&:hover': {
                        boxShadow: `0 15px 35px rgba(0,0,0,0.2), 0 0 5px ${theme.palette.primary.light}`, // Yorqinroq hover effekti
                        '& svg': {
                            stroke: theme.palette.primary.dark, // SVG rangini o'zgartirish
                        }
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        justifyContent: 'space-between',
                        gap: 3,
                    }}
                >
                    {/* Matn va Tugma Qismi */}
                    <Box sx={{ flexGrow: 1, minWidth: 0, textAlign: { xs: 'left', sm: 'left' } }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            sx={{
                                fontWeight: 800,
                                color: theme.palette.primary.dark,
                                mb: 1.5,
                            }}
                        >
                            Ilm-fan Sayohatiga Qo'shiling
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: { xs: 3, sm: 0 }, // Kichik ekranlarda matndan keyin bo'sh joy
                                color: theme.palette.text.secondary,
                                fontWeight: 400,
                            }}
                        >
                            Tadqiqotchilarni maqolalarini jurnalimizda nashr etishga va o'z ishlarini xalqaro miqyosda yoritishga taklif qilamiz.
                        </Typography>
                    </Box>

                    {/* SVG Ikonka va Tugma Guruhi */}
                    <Box
                        sx={{
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3,
                            width: { xs: '100%', sm: 'auto' }
                        }}
                    >

                        {/* Tugma */}
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            component={Link}
                            to="/for-authors"
                            sx={{
                                fontWeight: 700,
                                px: { xs: 3, md: 5 },
                                py: { xs: 1.2, md: 1.5 },
                                borderRadius: 3,
                                minWidth: 200,
                                // Kuchliroq soya va hover effekti
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.dark,
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                                    transition: '0.3s ease-in-out',
                                },
                            }}
                        >
                            Mualliflar uchun Yo'riqnoma
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default ResearchCallout;