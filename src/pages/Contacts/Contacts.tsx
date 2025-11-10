// src/pages/Contacts/Contacts.tsx

import React from 'react';
import { Container, Typography, TextField, Button, Box, Paper, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';

const CONTACT_INFO = {
    address: "220100. Urganch sh., Al - Хorazmiy ko‘chasi, 110.",
    phone: "+99 897 090 95 27",
    email: "uktamjon@urdu.uz"
};

const Contacts: React.FC = () => {
    useTheme();
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
            <CustomBreadcrumbs currentPage="Kontaktlar" />
            <Typography variant="h4" component="h1" gutterBottom>
                Kontaktlar
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {/* Forma */}
                <Box sx={{ width: { xs: '100%', md: 'calc(50% - 16px)' }, flexGrow: 1 }}>
                    <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 600 }}>
                            Bizga xabar yuboring
                        </Typography>
                        <form>
                            <TextField fullWidth label="To'liq ism" margin="normal" required />
                            <TextField fullWidth label="Elektron pochta" margin="normal" type="email" required />
                            <TextField fullWidth label="Telefon" margin="normal" />
                            <TextField fullWidth label="Xabar" margin="normal" multiline rows={4} required />
                            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                                Yuborish
                            </Button>
                        </form>
                    </Paper>
                </Box>

                {/* Aloqa ma'lumotlari va xarita */}
                <Box sx={{ width: { xs: '100%', md: 'calc(50% - 16px)' }, flexGrow: 1 }}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 600 }}>
                            Aloqa ma'lumotlari
                        </Typography>

                        <ContactItem icon={<LocationOnIcon />} title="Manzil" content={CONTACT_INFO.address} />
                        <ContactItem icon={<PhoneIcon />} title="Telefon" content={CONTACT_INFO.phone} />
                        <ContactItem icon={<EmailIcon />} title="Elektron pochta" content={CONTACT_INFO.email} />

                        {/* Google Maps Embed */}
                        <Box sx={{ mt: 3, borderRadius: 1, overflow: 'hidden' }}>
                            <iframe
                                title="Urgench Office"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d954.072098971437!2d60.61885442164393!3d41.557072011122344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bbd0ed5f646b03%3A0xabc123!2sHJCM%2BC9%2C%20Al-Khwarizmi%20110%2C%20Urgench%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default Contacts;
