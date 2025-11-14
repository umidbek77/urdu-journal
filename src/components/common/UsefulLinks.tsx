import React from 'react';
import { Box, Container, Typography, Paper, Link as MuiLink } from '@mui/material';
import { USEFUL_LINKS } from '../../utils/mockData';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { keyframes } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } /* Ro'yxat o'zining 50% uzunligiga siljishi uchun (chunki biz uni 2 marta takrorlaymiz) */
`;

const UsefulLinks: React.FC = () => {
    const theme = useTheme();
    const infiniteLinks = [...USEFUL_LINKS, ...USEFUL_LINKS];
    const CARD_WIDTH = 320;
    const SCROLL_DURATION = USEFUL_LINKS.length * 6;

    return (
        <Container maxWidth="lg" sx={{ py: 1 }}>
            <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
                sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1.4rem', md: '1.9rem' },
                    mb: 5,
                    textAlign: 'center',
                    color: theme.palette.primary.dark,
                    letterSpacing: '0.05em',
                }}
            >
                Foydali havolalar
            </Typography>

            <Box
                sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    py: 2,
                    mx: { xs: -2, md: 0 },
                }}
            >
                <Box
                    className="links-scroller"
                    sx={{
                        display: 'flex',
                        width: `${CARD_WIDTH * infiniteLinks.length}px`,
                        animation: `${scroll} ${SCROLL_DURATION}s linear infinite`,
                        gap: 3,

                        '&:hover': {
                            animationPlayState: 'paused',
                        }
                    }}
                >
                    {infiniteLinks.map((link, index) => (
                        <Box
                            key={index}
                            sx={{
                                flexShrink: 0,
                                width: CARD_WIDTH,
                                px: 1.5,
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
                                    borderRadius: 3,
                                    border: `1px solid ${theme.palette.divider}`,

                                    '&:hover': {
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                                        transform: 'translateY(-5px)',
                                        borderColor: theme.palette.secondary.main,
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                <Box sx={{ minHeight: 70, mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Box
                                        component="img"
                                        src={link.logo}
                                        alt={link.name}
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            (e.target as HTMLImageElement).onerror = null;
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            ((e.target as HTMLImageElement).parentElement as HTMLElement).innerHTML = `<Typography variant="subtitle1" color="primary.main" sx={{p:1}}>${link.name}</Typography>`;
                                        }}
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
                                        whiteSpace: 'normal',
                                        textAlign: 'center',
                                        minHeight: 40,
                                        '&:hover': { color: 'secondary.main' },
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