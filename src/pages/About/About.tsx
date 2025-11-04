// src/pages/About/About.tsx (Grid o'rniga Box/Flexbox ishlatildi)

import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';

const About: React.FC = () => {

    const objectives = [
        "Promotion of scientific research results.",
        "Support for young scientists and researchers.",
        "Dissemination of scientific and methodological knowledge.",
        "Integration of science and education with production.",
    ];

    const indexingDatabases = [
        "Google Scholar",
        "DOAJ (Directory of Open Access Journals)",
        "Index Copernicus International",
        "Ulrich's Periodicals Directory",
        "Advanced scientific databases (Mock Data)",
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage="About" />
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
                About the Journal
            </Typography>

            {/* Grid container o'rniga Box (Flex container) ishlatildi */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: { xs: 3, md: 4 }, // xs=3, md=4 spacing ga mos keladi
                    mx: { md: -2 } // Agar zarur bo'lsa, manfiy margin
                }}
            >

                {/* Chap ustun: Grid item (md=7) o'rniga Box ishlatildi */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 'calc(58.3333% - 16px)' }, // md=7 ga mos keladi (7/12 * 100). 16px = 4*4
                        flexGrow: 1
                    }}
                >
                    <Paper elevation={1} sx={{ p: 4, height: '100%' }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
                            Mission and History
                        </Typography>
                        <Typography paragraph>
                            The scientific and methodical journal **"Science and society"** of the Nukus State Pedagogical Institute named after Ajiniyaz was founded in **2004**. Our main goal is to create a platform for the effective exchange of scientific experience between national and international researchers.
                        </Typography>
                        <Typography paragraph>
                            The journal publishes original, high-quality articles in various fields of natural-technical, pedagogical, psychological, social-economic, and philological sciences.
                        </Typography>

                        <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 600, color: 'primary.main' }}>
                            Key Objectives:
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

                {/* O'ng ustun: Grid item (md=5) o'rniga Box ishlatildi */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 'calc(41.6667% - 16px)' }, // md=5 ga mos keladi (5/12 * 100)
                        flexGrow: 1
                    }}
                >
                    <Paper elevation={3} sx={{ p: 4, height: '100%', backgroundColor: 'background.default' }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
                            Indexing and Recognition
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                ISSN: <span style={{ fontWeight: 400 }}>2181-4413</span> (Print)
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                e-ISSN: <span style={{ fontWeight: 400 }}>2181-4413</span> (Online)
                            </Typography>
                        </Box>

                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
                            The journal is indexed in:
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
                                src="/images/logo_journal_big.png"
                                alt="Journal Logo"
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