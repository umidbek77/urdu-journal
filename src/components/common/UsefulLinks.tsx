// src/components/common/UsefulLinks.tsx (Grid o'rniga Box/Flexbox ishlatildi)

import React from 'react';
import { Box, Container, Typography, Paper, Link as MuiLink } from '@mui/material';
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

            {/* Grid container o'rniga Box (Flex container) ishlatildi */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3, // spacing={3} ga mos keladi
                }}
            >
                {USEFUL_LINKS.map((link, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: {
                                xs: '100%',
                                sm: 'calc(50% - 12px)',
                                md: 'calc(25% - 18px)',
                            },
                            flexGrow: 1,
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
                                '&:hover': {
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                    transform: 'translateY(-4px)',
                                    borderColor: 'primary.main',
                                },
                            }}
                        >
                            <Box sx={{ minHeight: 70, mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box
                                    component="img"
                                    src={link.logo}
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
                                    '&:hover': { color: 'primary.main' },
                                }}
                            >
                                {link.name}
                                <ArrowForwardIcon sx={{ ml: 1, fontSize: 16 }} />
                            </MuiLink>
                        </Paper>
                    </Box>
                ))}
        </Box>
</Container>
);
};

export default UsefulLinks;