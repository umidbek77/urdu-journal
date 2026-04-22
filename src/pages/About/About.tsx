import React, { useState } from 'react'; 
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Paper, Divider, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';
import UsefulLinks from '../../components/common/UsefulLinks';
import PdfViewerModal from '../../components/ui/PdfViewerModal'; 
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPdfUrl, setCurrentPdfUrl] = useState('');
    const [currentPdfTitle, setCurrentPdfTitle] = useState('');

    const handleOpenModal = (url: string, title: string) => {
        setCurrentPdfUrl(url);
        setCurrentPdfTitle(title);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPdfUrl('');
        setCurrentPdfUrl('');
    };

    const GUVOHNOMA_URL = "/pdfs/Журнал гувохнома.pdf"; 
    const JOURNAL_COVER_IMG = "img_1.png"; 

    const handleOpenCertificate = () => {
        handleOpenModal(GUVOHNOMA_URL, t("about.certificateTitle"));
    };

    const scienceFields = t("about.scienceFields", { returnObjects: true }) as string[];

    const organizationalInfo = [
        { label: t("about.org.editor"), value: "Ismoilov Shukurulloh Habibulla o‘g‘li" }, 
        { label: t("about.org.secretary"), value: "Mengliyev Davlatyor Baxtiyarovich" }, 
        { label: t("about.org.address"), value: "Urganch shahri, Al - Хorazmiy ko‘chasi, 110" },
        { label: t("about.org.index"), value: "210100" },
        { label: t("about.org.phone"), value: "+99(897)-090-95-27" },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage={t("about.pageTitle")} />

            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
                {t("about.pageTitle")}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                
                <Box sx={{ flexBasis: { xs: '100%', md: 'calc(66.66% - 1rem)' } }}>
                    
                    <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                            {t("about.title")}
                        </Typography>

                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify', whiteSpace: 'pre-line' }}>
                            {t("about.mission")}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                            {t("about.fieldsTitle")}
                        </Typography>

                        <List dense disablePadding>
                            {scienceFields.map((text, index) => (
                                <ListItem key={index} disableGutters sx={{ py: 0.2 }}>
                                    <ListItemIcon sx={{ minWidth: 30, color: 'primary.main' }}>
                                        <CheckCircleOutlineIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>              
                </Box>

                <Box sx={{ flexBasis: { xs: '100%', md: 'calc(33.33% - 1rem)' } }}>
                    
                    <Paper elevation={2} sx={{ p: 3, mb: 4, textAlign: 'center' }}>
                        <Box sx={{ width: '100%', maxWidth: 300, mx: 'auto', mb: 3 }}>
                            <img src={JOURNAL_COVER_IMG} alt="cover" style={{ width: '100%' }} />
                        </Box>

                        <Button 
                            variant="contained" 
                            startIcon={<DescriptionIcon />} 
                            fullWidth
                            onClick={handleOpenCertificate}
                        >
                            {t("about.certificateBtn")}
                        </Button>
                    </Paper>

                    <Paper elevation={1} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {t("about.org.title")}
                        </Typography>

                        {organizationalInfo.map((item, index) => (
                            <Box key={index} sx={{ mb: 1.5 }}>
                                <Typography fontWeight={600}>{item.label}:</Typography>
                                <Typography>{item.value}</Typography>
                            </Box>
                        ))}
                    </Paper>
                </Box>
            </Box>

            <UsefulLinks />

            <PdfViewerModal
                open={isModalOpen}
                onClose={handleCloseModal}
                pdfUrl={currentPdfUrl}
                title={currentPdfTitle}
            />
        </Container>
    );
};

export default About;