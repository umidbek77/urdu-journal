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
                    backgroundColor: theme.palette.background.paper,
                    borderLeft: `8px solid ${theme.palette.primary.main}`,
                    transition: 'box-shadow 0.4s',
                    '&:hover': {
                        boxShadow: `0 15px 35px rgba(0,0,0,0.2), 0 0 5px ${theme.palette.primary.light}`,
                    },
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            textAlign: 'center',
                            color: theme.palette.primary.dark,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                        }}
                    >
                        Ilm-fan sayohatimizga qo‘shiling!
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            mb: 4,
                            color: theme.palette.text.secondary,
                            fontWeight: 400,
                            textAlign: 'justify',
                            lineHeight: 1.7,
                        }}
                    >
                        Hurmatli tadqiqotchilar, olimlar va ilmiy izlanuvchilar! Sizni ilmiy izlanishlaringiz
                        natijalarini keng ilmiy jamoatchilikka taqdim etish maqsadida jurnalimiz sahifalarida
                        maqolalaringizni e’lon qilishga taklif etamiz. Jurnalimiz ilm-fan taraqqiyotiga hissa
                        qo‘shayotgan barcha tadqiqotchilarni o‘z ilmiy maqolalarini chop ettirishga chorlaydi.
                        Sizning maqolangiz ilm-fanning dolzarb masalalarini yoritish, yangi g‘oyalar va ilmiy
                        yechimlarni taqdim etish orqali ilmiy hamjamiyat e’tiborini qozonish va o‘z sohangizda
                        yetakchi sifatida tanilish imkoniyatini taqdim etadi.
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
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
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.dark,
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                                    transition: '0.3s ease-in-out',
                                },
                            }}
                        >
                            Mualliflar uchun yo‘riqnoma
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default ResearchCallout;
