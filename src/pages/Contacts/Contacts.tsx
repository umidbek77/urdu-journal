// src/pages/Contacts/Contacts.tsx (Grid o'rniga Box/Flexbox ishlatildi)

import React from 'react';
import { Container, Typography, TextField, Button, Box, Paper, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { CONTACT_INFO } from '../../utils/mockData';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';

const Contacts: React.FC = () => {
    const theme = useTheme();

    const ContactItem: React.FC<{ icon: React.ReactNode, title: string, content: string }> = ({ icon, title, content }) => (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <Box sx={{ color: 'primary.main', mr: 2, mt: 0.5 }}>{icon}</Box>
            <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.secondary' }}>{title}</Typography>
                <Typography variant="body2">{content}</Typography>
            </Box>
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage="Contacts" />
            <Typography variant="h4" component="h1" gutterBottom>
                Contacts
            </Typography>

            {/* Grid container o'rniga Box (Flex container) ishlatildi */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4 // spacing={4} ga mos keladi
                }}
            >
                {/* 1. Aloqa ma'lumotlari va Forma (md=6) */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 'calc(50% - 16px)' }, // md=6 ga mos
                        flexGrow: 1
                    }}
                >
                    <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 600 }}>
                            Send us a message
                        </Typography>
                        <form>
                            <TextField fullWidth label="Full name" margin="normal" required />
                            <TextField fullWidth label="Email" margin="normal" type="email" required />
                            <TextField fullWidth label="Phone" margin="normal" />
                            <TextField fullWidth label="Message" margin="normal" multiline rows={4} required />
                            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                                Send
                            </Button>
                        </form>
                    </Paper>
                </Box>

                {/* 2. Ma'lumotlar va Xarita (md=6) */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 'calc(50% - 16px)' }, // md=6 ga mos
                        flexGrow: 1
                    }}
                >
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 600 }}>
                            Contact Information
                        </Typography>

                        <ContactItem
                            icon={<LocationOnIcon />}
                            title="Address"
                            content={CONTACT_INFO.address}
                        />
                        <ContactItem
                            icon={<PhoneIcon />}
                            title="Phone"
                            content={CONTACT_INFO.phone}
                        />
                        <ContactItem
                            icon={<EmailIcon />}
                            title="Email"
                            content={CONTACT_INFO.email}
                        />

                        {/* Xarita (Mock up) */}
                        <Box sx={{ mt: 3, height: 300, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, overflow: 'hidden' }}>
                            <Typography variant="body2" align="center" sx={{ py: 12, backgroundColor: '#E0E0E0', color: theme.palette.text.secondary }}>
                                Map Placeholder (Google Maps Embed)
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default Contacts;