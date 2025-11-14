// src/pages/About/About.tsx

import React, { useState } from 'react'; 
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Paper, Divider, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DescriptionIcon from '@mui/icons-material/Description'; // PDF guvohnoma uchun
import BookIcon from '@mui/icons-material/Book'; // Jurnal PDF uchun
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';
import UsefulLinks from '../../components/common/UsefulLinks';
import PdfViewerModal from '../../components/ui/PdfViewerModal'; 

const About: React.FC = () => {
    // === Modal Holatini Boshqarish ===
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

    // === PDF va Rasm Manzillari ===
    // !!! Iltimos, quyidagi '#' joyiga real manzilni kiriting.
    const GUVOHNOMA_URL = "/pdfs/Журнал гувохнома.pdf"; 
    const JURNAL_PDF_URL = "/pdfs/xorazm-jurnali-2025-1.pdf"; 
    const JOURNAL_COVER_IMG = "img_1.png"; 

    const handleOpenCertificate = () => {
        handleOpenModal(GUVOHNOMA_URL, "Jurnal Guvohnomasi PDF");
    };

    const handleOpenJournal = () => {
        handleOpenModal(JURNAL_PDF_URL, "Jurnalning Oxirgi Soni PDF");
    };

    // Rasmdagi Maqsadlar tarjimasi (YANGILANDI: UrDU Jurnali ma'lumoti)
    // BU YERGA KENGAYTIRILGAN MATN JOYLANDI!
    const missionText = `
    Abu Rayhon Beruniy nomidagi Urganch Davlat Universitetining ilmiy-uslubiy jurnali "Journal of Khwarazm Information Technologies" 2024-yilda asos solingan. Bizning asosiy maqsadimiz — milliy va xalqaro tadqiqotchilar o'rtasida ilmiy tajriba almashinuvi uchun samarali jurnal yaratishdir. Jurnal fundamental va amaliy tadqiqotlarning eng dolzarb natijalarini nashr etishga qaratilgan bo‘lib, milliy va xalqaro akademik hamjamiyat standartlariga javob beradigan, ochiq kirish (Open Access) tamoyillariga asoslangan nufuzli ilmiy jurnal bo‘lib xizmat qiladi.

    Jurnalning asosiy maqsadi — ilmiy bilimlar almashinuvini rag‘batlantirish, mahalliy va xorijiy olimlar, tadqiqotchilar, professor-o‘qituvchilar hamda yosh mutaxassislar o‘rtasida o‘zaro tajriba almashish uchun sifatli maydon yaratishdir.

    Biz quyidagi Strategik Vazifalarni amalga oshirishni maqsad qilganmiz:
    
    1. Sifat va Integritetni Ta'minlash: Nashr etilayotgan barcha maqolalarning ilmiy yangilik, dolzarblik va metodologik puxtalik talablariga qat’iy javob berishini ta’minlash. Barcha taqdim etilgan ishlarni ikki tomonlama anonim ko‘rikdan (Double-Blind Peer Review) o‘tkazish orqali xolislik va yuqori sifat mezonlarini saqlash. Nashr etish jarayonining shaffofligi va tezkorligini ta'minlash.

    2. Ilmiy-amaliy ko‘prik yaratish: Axborot texnologiyalari, raqamli iqtisodiyot va kompyuter fanlari sohasidagi fundamental ilmiy natijalarni respublikamizning iqtisodiy-ijtimoiy rivojlanishiga yo‘naltirish. Ilmiy tadqiqotlar va ishlab chiqarish, ta’lim va amaliy texnologik sohalardagi muammolarni yechish o‘rtasida mustahkam ko‘prik vazifasini o‘tash.

    3. Xalqaro Integratsiya: Jurnalni Scopus, Web of Science kabi nufuzli xalqaro ma’lumotlar bazalariga kiritishga tayyorlash orqali O‘zbekiston IT fanining xalqaro miqyosdagi o‘rnini mustahkamlash. Xalqaro standartlar (masalan, DOI, ORCID) asosida nashriyot amaliyotini takomillashtirish.

    4. Akademik etikaga rioya: Nashrlarda plagiat, soxtalashtirish va boshqa axloqiy buzilishlarga yo‘l qo‘ymaslikka qat’iy rioya qilishni targ‘ib qilish. Tadqiqot etikasi va mualliflik huquqlariga oid milliy va xalqaro qoidalarni doimiy ravishda targ‘ib qilish va ularga rioya etilishini nazorat qilish.
    
    Bundan tashqari, O'zbekistonning ta'lim, fan va madaniyat sohalaridagi yutuqlarni targ‘ib qilish orqali, ilmiy jamoatchiligi bilan aloqalarni mustahkamlashga xizmat qiladi.
    `;

    // Rasmdagi Fan yo'nalishlari (YANGILANDI: IT sohasiga oid)
    const scienceFields = [
        "Dasturlash texnologiyalari va algoritmlar",
        "Infokommunikatsiya texnologiyalari",
        "Sun’iy intellekt va raqamli texnologiyalar",
        "Kriptografiya va ma’lumotlarni himoyalash texnologiyalari",
        "Aloqa, tarmoq va radioeshitish texnologiyalari",
        "Intellektual axborot tizimlari va kompyuter lingvistikasi",
    ];

    // Rasmdagi Tashkiliy ma'lumotlar (Oldingi qisqartirilgan versiyasi qoldirildi)
    const organizationalInfo = [
        { label: "Tashkilotchisi qo'mita rahbari", value: "Ismoilov Shukurulloh Habibulla o‘g‘li" },
        { label: "Bosh muharrir", value: "Matyokubov O‘tkir Karimovich" }, 
        { label: "Mas'ul kotib", value: "Madaminov Uktamjon Ataxanovich" }, 
        { label: "Tahririyat manzili", value: "Urganch shahri, Al - Хorazmiy ko‘chasi, 110" },
        { label: "Indeks", value: "210100" },
        { label: "Telefon", value: "+99(897)-090-95-27" },
    ];
    
    // Rasmdagi Bank hisobi (Sarlavha qo'shildi)
    const bankInfo = [
        { label: "Bank", value: "MB 55 XXXM Urganch shahri" },
        { label: "Hisob varag'i", value: "2340 2000 3001 0000 1010" },
        { label: "MFO", value: "00014" },
        { label: "INN", value: "201 123 456" },
        { label: "Shaxsiy hisob varag'i", value: "0001 1080 0350 0100 0000 0300 000" },
    ];


    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage="Jurnal haqida" />

            {/* Jurnal haqida asosiy sarlavha */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
                Jurnal haqida
            </Typography>

            {/* Asosiy Kontent Bo'limi: Flex Container */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap', 
                    gap: 4, 
                }}
            >
                
                {/* 1-Ustun: Chap Ustun (MD=8 ga mos keluvchi Box) */}
                <Box 
                    sx={{
                        flexBasis: { xs: '100%', md: 'calc(66.66% - 1rem)' },
                        flexGrow: 1, 
                    }}
                >
                    
                    {/* Missiya va Asosiy ma'lumotlar */}
                    <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                            "Journal of Khwarazm Information Technologies" haqida
                        </Typography>
                        {/* Matn o'lchamini body1 variantiga o'tkazish */}
                        <Typography variant="body1" paragraph sx={{ textAlign: 'justify', whiteSpace: 'pre-line' }}>
                            {/* missionText o'zida ham qisqacha ma'lumot, ham missiyani mujassam etdi */}
                            {missionText}
                        </Typography>
                        
                        <Divider sx={{ my: 3 }} />

                        {/* Fan Yo'nalishlari */}
                        <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                            Jurnalda nashr etiladigan ilmiy yo'nalishlar:
                        </Typography>
                        <List dense disablePadding>
                            {scienceFields.map((text, index) => (
                                <ListItem key={index} disableGutters sx={{ py: 0.2 }}>
                                    <ListItemIcon sx={{ minWidth: 30, color: 'primary.main' }}>
                                        <CheckCircleOutlineIcon fontSize="small" />
                                    </ListItemIcon>
                                    {/* List matnini body2 dan kattaroq qilish */}
                                    <ListItemText 
                                        primary={text} 
                                        primaryTypographyProps={{ 
                                            variant: 'body1', 
                                            sx: { fontSize: '1rem' } 
                                        }} 
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>

                    {/*
                    !!! O'chirildi: Qo'shimcha Jurnal haqida matn (Missiya)
                    Avvalgi missiya matni endi missionText ichiga kiritildi
                    */}
                    
                </Box>
                
                {/* 2-Ustun: O'ng Ustun (MD=4 ga mos keluvchi Box) */}
                <Box
                    sx={{
                        flexBasis: { xs: '100%', md: 'calc(33.33% - 1rem)' },
                        flexGrow: 1, 
                    }}
                >
                    
                    {/* Muqova va tugmalar */}
                    <Paper elevation={2} sx={{ p: 3, mb: 4, textAlign: 'center' }}>
                        
                        {/* Jurnal Muqovasi Rasmi */}
                        <Box sx={{ width: '100%', maxWidth: 300, mx: 'auto', mb: 3 }}>
                            
                            <img 
                                src={JOURNAL_COVER_IMG} 
                                alt="Jurnal Muqovasi" 
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    display: 'block', 
                                    borderRadius: '4px',
                                    border: '1px solid #ccc' 
                                }} 
                            />
                            
                        </Box>

                        {/* Qo'shimcha Tugmalar (Modalni ochish uchun yangilandi) */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                startIcon={<DescriptionIcon />} 
                                fullWidth
                                onClick={handleOpenCertificate} 
                            >
                                Guvohnoma PDF
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                startIcon={<BookIcon />} 
                                fullWidth
                                onClick={handleOpenJournal} 
                            >
                                Jurnal PDF
                            </Button>
                        </Box>
                        
                    </Paper>

                    {/* Tashkiliy va Bank ma'lumotlari */}
                    <Paper elevation={1} sx={{ p: 3 }}>
                        
                        {/* Tashkiliy ma'lumotlar (Qisqartirilgan) */}
                        <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                            Tashkiliy ma'lumotlar
                        </Typography>
                        {organizationalInfo.map((item, index) => (
                            <Box key={index} sx={{ mb: 1.5 }}>
                                {/* Labelni subtitle2 dan subtitle1 ga kattalashtirish */}
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.label}:</Typography>
                                {/* Value'ni body2 dan body1 ga kattalashtirish */}
                                <Typography variant="body1">{item.value}</Typography>
                            </Box>
                        ))}

                        <Divider sx={{ my: 2 }} />
                        
                        {/* Bank ma'lumotlari */}
                        <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                            Jurnal hisob varag'i
                        </Typography>
                        {bankInfo.map((item, index) => (
                            <Box key={index} sx={{ mb: 1.5 }}>
                                {/* Labelni subtitle2 dan subtitle1 ga kattalashtirish */}
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.label}:</Typography>
                                {/* Value'ni body2 dan body1 ga kattalashtirish */}
                                <Typography variant="body1">{item.value}</Typography>
                            </Box>
                        ))}
                    </Paper>
                </Box>
            </Box>
            
            <UsefulLinks />

            {/* === PDF View Modal === */}
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