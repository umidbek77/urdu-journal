import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';
import UsefulLinks from '../../components/common/UsefulLinks';
import { useTranslation } from "react-i18next"; // 🔥

const CONTACT_INFO = {
    address: "220100. Urganch sh., Al - Хorazmiy ko‘chasi, 110.",
    phone: "+99 897 090 95 27",
    email: "kitjournal@urdu.uz"
};

const TELEGRAM_BOT_TOKEN = '7701762434:AAFum6dli-GRi3QuqfKjsOg3NkDkno11b7Q';
const TELEGRAM_CHAT_ID = '8540928406';

const Contacts: React.FC = () => {
    useTheme();
    const { t } = useTranslation(); // 🔥

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const text = `Yangi xabar:\n\nIsm: ${formData.fullName}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\nXabar: ${formData.message}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text,
                }),
            });

            if (response.ok) {
                setSuccess(true);
                setFormData({ fullName: '', email: '', phone: '', message: '' });

                setTimeout(() => setSuccess(false), 3000);
            }
        } finally {
            setLoading(false);
        }
    };

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
            <CustomBreadcrumbs currentPage={t("contacts.breadcrumb")} />

            <Typography variant="h4" component="h1" gutterBottom>
                {t("contacts.title")}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {/* FORM */}
                <Box sx={{ width: { xs: '100%', md: 'calc(50% - 16px)' }, flexGrow: 1 }}>
                    <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 600 }}>
                            {t("contacts.form.title")}
                        </Typography>

                        {success && (
                            <Typography color="success.main" sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}>
                                {t("contacts.form.success")}
                            </Typography>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label={t("contacts.form.fullName")}
                                name="fullName"
                                margin="normal"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                label={t("contacts.form.email")}
                                name="email"
                                margin="normal"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                label={t("contacts.form.phone")}
                                name="phone"
                                margin="normal"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                label={t("contacts.form.message")}
                                name="message"
                                margin="normal"
                                multiline
                                rows={4}
                                required
                                value={formData.message}
                                onChange={handleChange}
                            />

                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ mt: 2 }}
                                disabled={loading}
                            >
                                {loading ? t("contacts.form.sending") : t("contacts.form.send")}
                            </Button>
                        </form>
                    </Paper>
                </Box>

                {/* INFO */}
                <Box sx={{ width: { xs: '100%', md: 'calc(50% - 16px)' }, flexGrow: 1 }}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 600 }}>
                            {t("contacts.info.title")}
                        </Typography>

                        <ContactItem icon={<LocationOnIcon />} title={t("contacts.info.address")} content={CONTACT_INFO.address} />
                        <ContactItem icon={<PhoneIcon />} title={t("contacts.info.phone")} content={CONTACT_INFO.phone} />
                        <ContactItem icon={<EmailIcon />} title={t("contacts.info.email")} content={CONTACT_INFO.email} />

                        <Box sx={{ mt: 3, borderRadius: 1, overflow: 'hidden' }}>
                            <iframe
                                title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18..."
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                loading="lazy"
                            />
                        </Box>
                    </Paper>
                </Box>
            </Box>

            <UsefulLinks />
        </Container>
    );
};

export default Contacts;