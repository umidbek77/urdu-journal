// src/pages/ForAuthors/ForAuthors.tsx

import React from 'react';
import { Container, Typography, Box, Paper, Stepper, Step, StepLabel, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';

const ForAuthors: React.FC = () => {

    const submissionSteps = [
        "Jurnal doirasi va qoidalarini ko'rib chiqish", // Review the Journal’s Scope and Policies
        "Qo'lyozmani talablarga muvofiq tayyorlash", // Prepare your manuscript according to the requirements
        "Maqolani onlayn tizim orqali yuborish (Mock)", // Submit the article via the online system (Mock)
        "Taqriz (Peer Review) jarayoni", // Peer Review Process
        "Qabul qilish va nashr etish", // Acceptance and Publication
    ];

    const requirements = [
        { rule: 'Formatlash', desc: "Shrift: Times New Roman, Hajmi 12, 1.5 qator oralig'i." }, // Formatting
        { rule: 'Annotatsiya', desc: "250 so'zdan oshmasligi kerak, tuzilishi (Maqsadi, Usullari, Natijalari, Xulosa)." }, // Abstract, structured (Objective, Methods, Results, Conclusion).
        { rule: 'Adabiyotlar', desc: "APA yoki Vancouver uslubiga rioya qilish shart (Qaysi birini aniqlang)." }, // References, Must follow APA or Vancouver style (Specify which one).
        { rule: "O'ziga xoslik", desc: "Plagiat tekshiruvi (O'xshashlik indeksi 15% dan kam bo'lishi shart)." }, // Originality, Plagiarism check (Similarity Index must be less than 15%).
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage="Mualliflar uchun" />
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
                Mualliflar uchun Yoʻriqnomalar
            </Typography>

            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 600 }}>
                    Maqola Yuborish Jarayoni
                </Typography>

                {/* Bosqichli jarayon (Stepper) */}
                <Stepper activeStep={-1} alternativeLabel sx={{ mb: 4 }}>
                    {submissionSteps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 600 }}>
                    Qoʻlyozmaga Qoʻyiladigan Talablar
                </Typography>

                {/* Jadval shaklida talablar */}
                <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.light' }}>
                                <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Qoida</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Tavsif / Talab</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requirements.map((row) => (
                                <TableRow key={row.rule} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                                        {row.rule}
                                    </TableCell>
                                    <TableCell>{row.desc}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Murojaat uchun qo'shimcha ma'lumot */}
            <Box sx={{ mt: 4, p: 3, border: '1px solid #FFCC00', borderRadius: 2, backgroundColor: '#FFFBEA' }}>
                <Typography variant="h6" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                    Yordam kerakmi?
                </Typography>
                <Typography variant="body1">
                    Yuborish yoki taqriz jarayoni bo'yicha har qanday savollar yuzasidan Mas'ul kotibga murojaat qiling:
                    <a href="mailto:fanvajamiyat@mail.ru" style={{ marginLeft: '8px', color: '#004A99' }}>
                        fanvajamiyat@mail.ru
                    </a>
                </Typography>
            </Box>
        </Container>
    );
};

export default ForAuthors;