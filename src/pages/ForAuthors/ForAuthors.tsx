// src/pages/ForAuthors/ForAuthors.tsx

import React from 'react';
import { Container, Typography, Box, Paper, Stepper, Step, StepLabel, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';

const ForAuthors: React.FC = () => {

    const submissionSteps = [
        'Review the Journal’s Scope and Policies',
        'Prepare your manuscript according to the requirements',
        'Submit the article via the online system (Mock)',
        'Peer Review Process',
        'Acceptance and Publication',
    ];

    const requirements = [
        { rule: 'Formatting', desc: 'Font: Times New Roman, Size 12, 1.5 line spacing.' },
        { rule: 'Abstract', desc: 'Should not exceed 250 words, structured (Objective, Methods, Results, Conclusion).' },
        { rule: 'References', desc: 'Must follow APA or Vancouver style (Specify which one).' },
        { rule: 'Originality', desc: 'Plagiarism check (Similarity Index must be less than 15%).' },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage="For Authors" />
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
                Guidelines for Authors
            </Typography>

            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 600 }}>
                    Article Submission Process
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
                    Manuscript Requirements
                </Typography>

                {/* Jadval shaklida talablar */}
                <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.light' }}>
                                <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Rule</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>Description / Requirement</TableCell>
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
                    Need assistance?
                </Typography>
                <Typography variant="body1">
                    For any questions regarding submission or the peer review process, please contact the Executive Secretary at:
                    <a href="mailto:fanvajamiyat@mail.ru" style={{ marginLeft: '8px', color: '#004A99' }}>
                        fanvajamiyat@mail.ru
                    </a>
                </Typography>
            </Box>
        </Container>
    );
};

export default ForAuthors;