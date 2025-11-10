// src/pages/About/About.tsx (O'zbek tiliga tarjima qilindi)

import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';

const About: React.FC = () => {

    // Maqsadlar tarjima qilindi
    const objectives = [
        "Ilmiy tadqiqot natijalarini targ'ib qilish.",
        "Yosh olimlar va tadqiqotchilarni qo'llab-quvvatlash.",
        "Ilmiy-uslubiy bilimlarni keng yoyish.",
        "Fan va ta'limni ishlab chiqarish bilan integratsiyalash.",
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage="Jurnal haqida" /> {/* Breadcrumb tarjimasi */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
                Jurnal haqida ma'lumot
            </Typography>

            {/* Grid container o'rniga Box (Flex container) ishlatildi */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: { xs: 3, md: 4 },
                    mx: { md: -2 }
                }}
            >

                {/* Chap ustun: Missiya va maqsadlar */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 'calc(58.3333% - 16px)' },
                        flexGrow: 1
                    }}
                >
                    <Paper elevation={1} sx={{ p: 4, height: '100%' }}>
                        <Typography paragraph>
                            Abu Rayhon Beruniy nomidagi Urganch Davlat Universitetining ilmiy-uslubiy jurnali "Journal of Khwarazm Information Technologies" 2024-yilda asos solingan. Bizning asosiy maqsadimiz — milliy va xalqaro tadqiqotchilar o'rtasida ilmiy tajriba almashinuvi uchun samarali jurnal yaratishdir.
                        </Typography>
                        <Typography paragraph>
                            Jurnalda dasturlash texnologiyalari va algoritmlar, infokommunikatsiya texnologiyalari, sun’iy intellekt va raqamli texnologiyalar, kriptografiya va ma’lumotlarni himoyalash texnologiyalari, aloqa, tarmoq va radioeshitirish texnologiyalari, intellektual axborot tizimlari va kompyuter lingvistikasi yo‘nalishlarida original, yuqori sifatli maqolalarni nashr etadi.
                        </Typography>

                        <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 600, color: 'primary.main' }}>
                            Asosiy Maqsadlar:
                        </Typography>
                        <List disablePadding>
                            {objectives.map((text, index) => (
                                <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 30, color: 'primary.main' }}>
                                        <CheckCircleOutlineIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default About;