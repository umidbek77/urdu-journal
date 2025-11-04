// src/pages/Page404/Page404.tsx

import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Page404: React.FC = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
            <Box sx={{
                p: 5,
                border: `3px solid ${theme.palette.secondary.main}`,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }}>
                <ErrorOutlineIcon sx={{ fontSize: 80, color: theme.palette.secondary.main, mb: 2 }} />

                <Typography variant="h1" component="h1" color="primary" sx={{ fontWeight: 800, fontSize: '6rem' }}>
                    404
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                    Page Not Found (Sahifa topilmadi)
                </Typography>

                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                    We apologize, but the address you requested could not be found on our journal website.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    to="/"
                    sx={{ fontWeight: 700 }}
                >
                    Go to Homepage
                </Button>
            </Box>
        </Container>
    );
};

export default Page404;