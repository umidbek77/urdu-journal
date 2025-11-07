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

    // Indeksatsiya bazalari nomlari tarjima qilindi
    const indexingDatabases = [
        "Google Scholar",
        "DOAJ (Ochiq Kirish Jurnallari Katalogi)",
        "Index Copernicus International",
        "Ulrich's Periodicals Directory",
        "Ixtisoslashgan ilmiy bazalar (Mock Data)",
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
                        <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
                            Missiyasi va Tarixi
                        </Typography>
                        <Typography paragraph>
                            Urganch Davlat Pedagogika Institutining ilmiy-uslubiy jurnali **"URDU ILMIY JURNALI"** (avvalgi nomi: "Fan va jamiyat") **2004-yilda** asos solingan. Bizning asosiy maqsadimiz — milliy va xalqaro tadqiqotchilar o'rtasida ilmiy tajriba almashinuvi uchun samarali platforma yaratishdir.
                        </Typography>
                        <Typography paragraph>
                            Jurnal tabiiy-texnika, pedagogika, psixologiya, ijtimoiy-iqtisodiy va filologiya fanlarining turli yo'nalishlarida original, yuqori sifatli maqolalarni nashr etadi.
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

                {/* O'ng ustun: Indeksatsiya va tan olinishi */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 'calc(41.6667% - 16px)' },
                        flexGrow: 1
                    }}
                >
                    <Paper elevation={3} sx={{ p: 4, height: '100%', backgroundColor: 'background.default' }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
                            Indeksatsiya va E'tirof
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                ISSN (Bosma): <span style={{ fontWeight: 400 }}>2181-4413</span>
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                e-ISSN (Onlayn): <span style={{ fontWeight: 400 }}>2181-4413</span>
                            </Typography>
                        </Box>

                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
                            Jurnal quyidagi bazalarda indekslanadi:
                        </Typography>
                        <List disablePadding>
                            {indexingDatabases.map((text, index) => (
                                <ListItem key={index} disableGutters sx={{ py: 0.3 }}>
                                    <ListItemText primary={`• ${text}`} sx={{ ml: -2 }} />
                                </ListItem>
                            ))}
                        </List>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <img
                                src="https://urdu.uz/martxa/martxa/assets/images/logoursu.png"
                                alt="Jurnal Logosi"
                                style={{ maxWidth: '80%', opacity: 0.8 }}
                            />
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default About;