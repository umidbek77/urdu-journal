import React from 'react';
import { Box, Container, Typography, Paper, Link as MuiLink } from '@mui/material';
import { USEFUL_LINKS } from '../../utils/mockData'; // Tuzatilgan import yo'li
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { keyframes } from '@mui/system'; // Keyframes yaratish uchun
import { useTheme } from '@mui/material/styles'; // Theme'ni ishlatish uchun

// 1. CSS Animatsiya keyframes (o'ngdan chapga siljish)
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } /* Ro'yxat o'zining 50% uzunligiga siljishi uchun (chunki biz uni 2 marta takrorlaymiz) */
`;

const UsefulLinks: React.FC = () => {
    const theme = useTheme();
    // Cheksiz aylanma effektini yaratish uchun ro'yxatni takrorlaymiz
    const infiniteLinks = [...USEFUL_LINKS, ...USEFUL_LINKS];

    // Har bir kartaning kengligini dinamik hisoblash uchun
    const CARD_WIDTH = 320;

    // Animatsiya davomiyligini kartalar soniga qarab belgilaymiz (Sekund)
    const SCROLL_DURATION = USEFUL_LINKS.length * 6; // 6 ta karta * 6 sekund = 36 sekund (yengilroq harakat uchun)

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
                sx={{
                    fontWeight: 700,
                    mb: 4,
                    color: theme.palette.primary.dark // Universitet rangiga mos
                }}
            >
                Foydali Hamkorlar va Havolalar
            </Typography>

            {/* Aylanma Ticker uchun Cheklangan Konteyner */}
            <Box
                sx={{
                    overflow: 'hidden', // Faqat Konteyner ichidagini ko'rsatish
                    whiteSpace: 'nowrap', // Kartalarni bir qatorda ushlab turish
                    py: 2, // Yuqori va pastki padding
                    // Max-width 100% bo'lishi uchun Container ichidagi paddingni yopish
                    mx: { xs: -2, md: 0 },
                }}
            >
                {/* Animatsiyani bajaruvchi ichki Box */}
                <Box
                    className="links-scroller"
                    sx={{
                        display: 'flex',
                        // Umumiy kenglikni belgilash
                        width: `${CARD_WIDTH * infiniteLinks.length}px`,
                        // Animatsiya
                        animation: `${scroll} ${SCROLL_DURATION}s linear infinite`,
                        gap: 3,

                        // Hover bo'lganda animatsiyani to'xtatish
                        '&:hover': {
                            animationPlayState: 'paused',
                        }
                    }}
                >
                    {infiniteLinks.map((link, index) => (
                        <Box
                            key={index}
                            sx={{
                                flexShrink: 0, // Kichrayishni oldini olish
                                width: CARD_WIDTH, // Har bir kartaning aniq kengligi
                                px: 1.5, // Kartalar orasidagi bo'shliqni hisobga olish
                            }}
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    transition: 'box-shadow 0.3s, transform 0.3s',
                                    borderRadius: 3, // UI ga mos yumaloq burchaklar
                                    border: `1px solid ${theme.palette.divider}`, // Yengil chegarani qo'shish

                                    // Hoverda kartochka yengil ko'tariladi
                                    '&:hover': {
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                                        transform: 'translateY(-5px)', // Kattaroq ko'tarilish
                                        borderColor: theme.palette.secondary.main, // Rangli chegara
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                {/* Logo maydoni */}
                                <Box sx={{ minHeight: 70, mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Box
                                        component="img"
                                        src={link.logo}
                                        alt={link.name}
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            (e.target as HTMLImageElement).onerror = null;
                                            // Agar logotip yuklanmasa, o'rniga text yozish
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            // Fallback sifatida matnni to'liqroq chiqarish
                                            ((e.target as HTMLImageElement).parentElement as HTMLElement).innerHTML = `<Typography variant="subtitle1" color="primary.main" sx={{p:1}}>${link.name}</Typography>`;
                                        }}
                                        sx={{ maxWidth: '80%', maxHeight: 60, objectFit: 'contain' }}
                                    />
                                </Box>

                                {/* Havola nomi */}
                                <MuiLink
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener"
                                    underline="none"
                                    color="text.primary"
                                    sx={{
                                        fontWeight: 600,
                                        mt: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        whiteSpace: 'normal',
                                        textAlign: 'center',
                                        minHeight: 40,
                                        '&:hover': { color: 'secondary.main' }, // Hover rangini o'zgartirish
                                    }}
                                >
                                    {link.name}
                                    <ArrowForwardIcon sx={{ ml: 1, fontSize: 16 }} />
                                </MuiLink>
                            </Paper>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default UsefulLinks;