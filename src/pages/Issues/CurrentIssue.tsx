import React from 'react';
import { Box, Container, Typography, Button, Paper, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

// MOCK_ISSUES va Submission type bu yerda yana e'lon qilinishi kerak
interface Issue {
    id: string;
    year: number;
    number: number;
    seriesName: string;
    publishedDate: string;
    series: string;
    coverImage: string;
}

const MOCK_ISSUES: Issue[] = [
    {
        id: "2025-1",
        year: 2025,
        number: 1,
        seriesName: "Xorazm Axborot Texnologiyalari Jurnali",
        publishedDate: "2025-06-01",
        series: "Texnik va Amaliy Fanlar",
        coverImage: "public/img.png", // Mavhum muqova rasmi
    }
];

const CurrentIssue: React.FC = () => {
    const currentIssue = MOCK_ISSUES[0];
    const theme = useTheme();

    if (!currentIssue) return null;

    // CSS Gradiyent: Universitet uslubida ko'k/ko'k-yashil yengil gradiyent
    const gradientBackground = `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`;


    return (
        <Container maxWidth="lg" sx={{ my: { xs: 4, md: 6 } }}>
            <Typography
                variant="h4"
                component="h2"
                sx={{
                    fontWeight: 800,
                    mb: 5,
                    textAlign: 'center',
                    color: theme.palette.primary.dark,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                }}
            >
                Joriy Nashr
            </Typography>

            <Paper
                elevation={10} // Kuchliroq ko'lanka
                sx={{
                    p: { xs: 2, sm: 4, md: 6 },
                    borderRadius: 3,
                    background: gradientBackground, // Orqa fon gradiyenti
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s',
                    border: `1px solid ${theme.palette.grey[200]}`,
                    '&:hover': {
                        boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 10px ${theme.palette.primary.light}`, // Kuchliroq ko'lanka, nufuzli ko'rinish uchun
                        transform: 'translateY(-5px)', // Yengil 3D effekt
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 4, md: 6 },
                        alignItems: 'center'
                    }}
                >
                    {/* Rasm joyi (Muqova effekti) */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 300 }, // Kenglik fiksatsiya qilindi, kontentga ko'proq joy qoldirish uchun
                            flexShrink: 0,
                        }}
                    >
                        <Box sx={{
                            borderRadius: 2,
                            overflow: 'hidden',
                            // Muqovaga xos ko'lanka
                            boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.4)',
                            border: `4px solid ${theme.palette.common.white}`, // Oq kontur
                            maxHeight: { xs: 400, md: 450 },
                        }}>
                            <img
                                src={currentIssue.coverImage}
                                alt={`${currentIssue.number}-son muqovasi`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Matn va tugmalar joyi */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            minWidth: 0, // Flex elementlar siqilmasligi uchun
                        }}
                    >
                        {/* JILD va SON yuqori professional uslubda */}
                        <Typography
                            variant="h5"
                            color="secondary"
                            sx={{
                                fontWeight: 900,
                                mb: 1,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                borderBottom: `2px solid ${theme.palette.secondary.light}`,
                                pb: 0.5,
                                display: 'inline-block'
                            }}
                        >
                            JILD {currentIssue.year} | SON {currentIssue.number}
                        </Typography>

                        <Typography
                            variant="h4"
                            color="primary.dark"
                            component="h3"
                            sx={{ fontWeight: 700, mb: 3 }}
                        >
                            {currentIssue.seriesName}
                        </Typography>

                        <Box sx={{ mb: 4, color: theme.palette.text.secondary }}>
                            <Typography variant="body1" sx={{ mb: 1.5 }}>
                                <Box component="span" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Nashr qilingan sana:</Box> {currentIssue.publishedDate}
                            </Typography>
                            <Typography variant="body1">
                                <Box component="span" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Seriya/Mavzu:</Box> {currentIssue.series}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                component={Link}
                                to={`/issues/${currentIssue.id}`}
                                startIcon={<VisibilityIcon />}
                                sx={{ fontWeight: 700, textTransform: 'none' }}
                            >
                                Kontentni To'liq Ko'rish
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                startIcon={<DownloadIcon />}
                                href="#"
                                sx={{ fontWeight: 600, textTransform: 'none' }}
                            >
                                To'liq PDF Yuklab Olish
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default CurrentIssue;