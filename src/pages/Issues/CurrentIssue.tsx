import React from 'react';
import { Box, Container, Typography, Button, Paper, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

interface Issue {
    id: string;
    year: number;
    number: number;
    seriesName: string;
    publishedDate: string;
    series: string;
    coverImage: string;
    pdfFile: string;
}

const MOCK_ISSUES: Issue[] = [
    {
        id: "1",
        year: 2025,
        number: 1,
        seriesName: "Xorazm axborot texnologiyalari jurnali",
        publishedDate: "2025-11-15",
        series: "Texnik va amaliy fanlar",
        coverImage: "img_1.png",
        pdfFile: "/public/pdfs/xorazm-jurnali-2025-1.pdf",
    }
];

const CurrentIssue: React.FC = () => {
    const currentIssue = MOCK_ISSUES[0];
    const theme = useTheme();
    if (!currentIssue) return null;
    const gradientBackground = `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`;

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = currentIssue.pdfFile;
        link.download = `Jurnal-${currentIssue.year}-${currentIssue.number}.pdf`;
        link.click();
    };

    return (
        <Container maxWidth="lg" sx={{ my: { xs: 2, md: 1 } }}>
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
                elevation={10}
                sx={{
                    p: { xs: 2, sm: 4, md: 6 },
                    borderRadius: 3,
                    background: gradientBackground,
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s',
                    border: `1px solid ${theme.palette.grey[200]}`,
                    '&:hover': {
                        boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 10px ${theme.palette.primary.light}`,
                        transform: 'translateY(-5px)',
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
                    <Box
                        sx={{
                            width: { xs: '100%', md: 300 },
                            flexShrink: 0,
                        }}
                    >
                        <Box sx={{
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.4)',
                            border: `4px solid ${theme.palette.common.white}`,
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

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
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
                                Kontentni to'liq ko'rish
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                startIcon={<DownloadIcon />}
                                onClick={handleDownload}
                                sx={{ fontWeight: 600, textTransform: 'none' }}
                            >
                                To'liq PDF yuklab olish
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default CurrentIssue;
