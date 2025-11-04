// src/components/common/UsefulLinks.tsx

import React from 'react';
import { Box, Container, Typography, Grid, Paper, Link as MuiLink } from '@mui/material';
import { USEFUL_LINKS } from '../../utils/mockData';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const UsefulLinks: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
                sx={{ fontWeight: 700, mb: 4 }}
            >
                Useful Links
            </Typography>

            <Grid container spacing={3}>
                {USEFUL_LINKS.map((link, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
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
                                '&:hover': {
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                    transform: 'translateY(-4px)',
                                    borderColor: 'primary.main',
                                }
                            }}
                        >
                            {/* Logo (Mock Image) */}
                            <Box sx={{ minHeight: 70, mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {/* Mock logoni qabul qilish uchun yo'lni tekshirish */}
                                <Box
                                    component="img"
                                    src={link.logo} // MockData dan kelgan yo'l
                                    alt={link.name}
                                    sx={{ maxWidth: '80%', maxHeight: 60, objectFit: 'contain' }}
                                />
                            </Box>

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
                                    '&:hover': { color: 'primary.main' }
                                }}
                            >
                                {link.name}
                                <ArrowForwardIcon sx={{ ml: 1, fontSize: 16 }} />
                            </MuiLink>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default UsefulLinks;