// src/pages/EditorialBoard/EditorialBoard.tsx

import React from 'react';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import { EDITORIAL_MEMBERS } from '../../utils/mockData';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';

const EditorialBoard: React.FC = () => {

    // Bosh muharrir va Kotibni ajratib olish
    const chiefEditor = EDITORIAL_MEMBERS.find(m => m.role === 'Editor-in-Chief');
    const executiveSecretary = EDITORIAL_MEMBERS.find(m => m.role === 'Executive Secretary');
    const members = EDITORIAL_MEMBERS.filter(m => m.role === 'Member');

    const MemberCard: React.FC<{ member: any }> = ({ member }) => (
        <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'primary.main' }}>
                {member.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {member.degree}, {member.city}
            </Typography>
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage="Editorial board" />
            <Typography variant="h4" component="h1" gutterBottom>
                Editorial board
            </Typography>

            <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
                {/* Asosiy rahbarlar */}
                {chiefEditor && (
                    <Box sx={{ mb: 3, borderLeft: '4px solid', borderColor: 'secondary.main', pl: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            Chairman of the organizing committee:
                        </Typography>
                        <Typography variant="body1">
                            **{chiefEditor.fullName}**, {chiefEditor.degree}, {chiefEditor.city}
                        </Typography>
                    </Box>
                )}
                {executiveSecretary && (
                    <Box sx={{ mb: 3, borderLeft: '4px solid', borderColor: 'primary.main', pl: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            Executive Secretary:
                        </Typography>
                        <Typography variant="body1">
                            **{executiveSecretary.fullName}**, {executiveSecretary.degree}, {executiveSecretary.city}
                        </Typography>
                    </Box>
                )}
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mt: 4, mb: 2 }}>
                    Editorial Members:
                </Typography>

                {/* Oddiy a'zolar ro'yxati (ikki ustunli tartib) */}
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        {members.slice(0, Math.ceil(members.length / 2)).map((member, index) => (
                            <MemberCard key={index} member={member} />
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {members.slice(Math.ceil(members.length / 2)).map((member, index) => (
                            <MemberCard key={index} member={member} />
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default EditorialBoard;