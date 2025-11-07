// // src/pages/EditorialBoard/EditorialBoard.tsx (To'liq Gorizontal Card Dizayni)
//
// import React from 'react';
// import { Container, Typography, Box, Paper, Avatar, Button, Link as MuiLink } from '@mui/material';
// import { EDITORIAL_MEMBERS } from '../../utils/mockData';
// import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';
// import PersonIcon from '@mui/icons-material/Person'; // Ism
// import DescriptionIcon from '@mui/icons-material/Description'; // Lavozim/Daraja
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import PublicIcon from '@mui/icons-material/Public';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Avtobiografiya
// import SchoolIcon from '@mui/icons-material/School'; // Daraja uchun
//
// // Rasm yo'lini mavjud bo'lmaganida ishlatish uchun
// const DEFAULT_AVATAR = 'https://i.pravatar.cc/150?img=68';
//
// // Universitet Ilmiy A'zosi Kartochkasi Komponenti (Barcha a'zolar uchun Gorizontal dizayn)
// const ScientificMemberCard: React.FC<{ member: any; roleType: 'Chief' | 'Member' }> = ({ member, roleType }) => {
//
//     const isChief = roleType === 'Chief';
//
//     // Rasm va Card Hajmini aniqlash
//     const avatarSize = isChief ? 140 : 100; // Rais/Kotib katta
//     const cardPadding = isChief ? 3 : 2; // Rais/Kotib katta ichki masofa
//
//     // Kartochka uslubini roliga qarab aniqlash
//     const cardStyles = {
//         transition: 'all 0.3s ease-in-out',
//         borderRadius: 2,
//         height: '100%',
//         p: cardPadding,
//
//         // Gorizontal tartib (rasmda ko'rsatilganidek)
//         display: 'flex',
//         flexDirection: { xs: 'column', sm: 'row' },
//         alignItems: { xs: 'center', sm: 'flex-start' },
//         gap: 3,
//
//         // Asosiy rangga mos chegara va soya
//         border: isChief ? '2px solid #1E3A5F' : '1px solid #ddd',
//         backgroundColor: isChief ? '#F0F5FF' : 'white',
//         boxShadow: isChief ? '0 10px 25px rgba(30, 58, 95, 0.15)' : '0 4px 12px rgba(0,0,0,0.05)',
//
//         '&:hover': {
//             transform: 'translateY(-3px)',
//             boxShadow: isChief ? '0 15px 30px rgba(30, 58, 95, 0.25)' : '0 6px 15px rgba(0,0,0,0.1)',
//         },
//     };
//
//     return (
//         <Paper sx={cardStyles}>
//
//             {/* Chap qism: Rasm va Tugma */}
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     minWidth: avatarSize,
//                     textAlign: 'center'
//                 }}
//             >
//                 {/* Rasm (Doira shaklida - Rasmdagi kabi) */}
//                 <Avatar
//                     alt={member.fullName}
//                     src={member.imageUrl || DEFAULT_AVATAR}
//                     sx={{
//                         width: avatarSize,
//                         height: avatarSize,
//                         border: isChief ? '4px solid #FFCC00' : '2px solid #1E3A5F', // Farqlovchi chegara
//                         mx: 'auto',
//                         mb: isChief ? 2 : 0, // Faqat Rahbariyat uchun tugma uchun masofa
//                     }}
//                 />
//
//                 {/* Avtobiografiya Tugmasi (Faqat Rahbariyat uchun) */}
//                 {isChief && (
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         endIcon={<KeyboardArrowDownIcon />}
//                         sx={{ mt: 1, width: '100%', fontWeight: 600 }}
//                         disabled={true}
//                     >
//                         Avtobiografiya
//                     </Button>
//                 )}
//             </Box>
//
//             {/* O'ng qism: Ma'lumotlar */}
//             <Box sx={{ flexGrow: 1, width: '100%', textAlign: { xs: 'center', sm: 'left' } }}>
//
//                 {/* Ilmiy Yo'nalish/Bosh Qism (Faqat Rahbariyat uchun) */}
//                 {isChief && (
//                     <Typography
//                         variant="subtitle1"
//                         color="primary.main"
//                         sx={{ fontWeight: 700, mb: 1, borderBottom: '1px solid #ddd', pb: 1 }}
//                     >
//                         Tahririyat hayʼati (Jild 2025-yil)
//                     </Typography>
//                 )}
//
//                 {/* Shaxs nomi */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 1 }}>
//                     <PersonIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
//                     <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                         {member.fullName}
//                     </Typography>
//                 </Box>
//
//                 {/* Lavozim / Daraja */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 1 }}>
//                     <DescriptionIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
//                     <Typography variant="body2" color="text.primary">
//                         **{member.role}**: {member.degree}
//                     </Typography>
//                 </Box>
//
//                 {/* Shahar / Joylashuv */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 1 }}>
//                     <PublicIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
//                     <Typography variant="body2" color="text.secondary">
//                         {member.city}
//                     </Typography>
//                 </Box>
//
//
//                 {/* Kontakt Ma'lumotlari (Faqat Rahbariyat uchun) */}
//                 {isChief && (
//                     <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #ddd' }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                             <EmailIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
//                             <MuiLink href={`mailto:${member.email || 'jurnal@urdu.uz'}`} color="inherit" underline="hover" variant="body2">
//                                 {member.email || 'jurnal@urdu.uz'}
//                             </MuiLink>
//                         </Box>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                             <PhoneIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
//                             <Typography variant="body2">
//                                 {member.phone || '+998 ** *** ** **'}
//                             </Typography>
//                         </Box>
//                     </Box>
//                 )}
//             </Box>
//         </Paper>
//     );
// };
//
//
// const EditorialBoard: React.FC = () => {
//     const chiefEditor = EDITORIAL_MEMBERS.find(m => m.role === "Bosh muharrir");
//     const executiveSecretary = EDITORIAL_MEMBERS.find(m => m.role === "Mas'ul kotib");
//     let members = EDITORIAL_MEMBERS.filter(m => m.role === "A'zo");
//     members.sort((a, b) => a.fullName.localeCompare(b.fullName, 'uz'));
//
//     return (
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//             <CustomBreadcrumbs currentPage="Tahririyat Hayʼati" />
//
//             <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center', fontWeight: 700, color: 'primary.dark' }}>
//                 Tahririyat Hayʼati
//             </Typography>
//
//             {/* 1. Rahbariyat Qismi (Kattaroq Cardlar) */}
//             <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.dark', mt: 4, mb: 3, borderBottom: '2px solid #FFCC00', pb: 1 }}>
//                 Rahbariyat
//             </Typography>
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexWrap: 'wrap',
//                     gap: 3,
//                     mb: 5,
//                 }}
//             >
//                 {chiefEditor && (
//                     <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' }, flexGrow: 1 }}>
//                         <ScientificMemberCard member={{...chiefEditor, email: 'rectorursu@gmail.com', phone: '+998622246700'}} roleType="Chief" />
//                     </Box>
//                 )}
//                 {executiveSecretary && (
//                     <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' }, flexGrow: 1 }}>
//                         <ScientificMemberCard member={executiveSecretary} roleType="Chief" />
//                     </Box>
//                 )}
//             </Box>
//
//             {/* 2. Tahririyat A'zolari Qismi (Ixcham Cardlar) */}
//             <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.dark', mt: 4, mb: 3, borderBottom: '2px solid #FFCC00', pb: 1 }}>
//                 Tahririyat Aʼzolari
//             </Typography>
//
//             {/* Oddiy A'zolar uchun Grid tartibi (2 ustun) */}
//             <Box
//                 sx={{
//                     display: 'grid',
//                     gridTemplateColumns: {
//                         xs: '1fr',
//                         sm: 'repeat(2, 1fr)', // 2 ustun etarli, chunki gorizontal tartib ko'p joy oladi
//                     },
//                     gap: 3
//                 }}
//             >
//                 {members.map((member) => (
//                     <ScientificMemberCard key={member.id} member={member} roleType="Member" />
//                 ))}
//             </Box>
//         </Container>
//     );
// };
//
// export default EditorialBoard;

// src/pages/EditorialBoard/EditorialBoard.tsx (Tuzatilgan versiya)

import React from 'react';
import { Container, Typography, Box, Paper, Avatar, Button, Link as MuiLink } from '@mui/material';
import { EDITORIAL_MEMBERS } from '../../utils/mockData';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface EditorialMember {
    id: number | string;
    fullName: string;
    imageUrl?: string;
    role?: string;
    degree?: string;
    city?: string;
    email?: string;
    phone?: string;
}

const DEFAULT_AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const ScientificMemberCard: React.FC<{ member: EditorialMember; roleType: 'Chief' | 'Member' }> = ({ member, roleType }) => {
    const isChief = roleType === 'Chief';

    const avatarSize = isChief ? 140 : 100;
    const cardPadding = isChief ? 3 : 2;

    const cardStyles = {
        transition: 'all 0.3s ease-in-out',
        borderRadius: 2,
        height: '100%',
        p: cardPadding,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'center', sm: 'flex-start' },
        gap: 3,
        border: isChief ? '2px solid #1E3A5F' : '1px solid #ddd',
        backgroundColor: isChief ? '#F0F5FF' : 'white',
        boxShadow: isChief ? '0 10px 25px rgba(30, 58, 95, 0.15)' : '0 4px 12px rgba(0,0,0,0.05)',
        '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: isChief ? '0 15px 30px rgba(30, 58, 95, 0.25)' : '0 6px 15px rgba(0,0,0,0.1)',
        },
    };

    return (
        <Paper sx={cardStyles}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: avatarSize,
                    textAlign: 'center',
                }}
            >
                <Avatar
                    alt={member.fullName}
                    src={member.imageUrl || DEFAULT_AVATAR}
                    sx={{
                        width: avatarSize,
                        height: avatarSize,
                        border: isChief ? '4px solid #FFCC00' : '2px solid #1E3A5F',
                        mx: 'auto',
                        mb: isChief ? 2 : 0,
                    }}
                />

                {isChief && (
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{ mt: 1, width: '100%', fontWeight: 600 }}
                        disabled
                    >
                        Avtobiografiya
                    </Button>
                )}
            </Box>

            <Box sx={{ flexGrow: 1, width: '100%', textAlign: { xs: 'center', sm: 'left' } }}>
                {isChief && (
                    <Typography
                        variant="subtitle1"
                        color="primary.main"
                        sx={{ fontWeight: 700, mb: 1, borderBottom: '1px solid #ddd', pb: 1 }}
                    >
                        Tahririyat hayʼati (Jild 2025-yil)
                    </Typography>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 1 }}>
                    <PersonIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {member.fullName}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 1 }}>
                    <DescriptionIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
                    <Typography variant="body2" color="text.primary">
                        <strong>{member.role}</strong>{member.role && member.degree ? `: ${member.degree}` : member.degree || ''}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 1 }}>
                    <PublicIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
                    <Typography variant="body2" color="text.secondary">
                        {member.city}
                    </Typography>
                </Box>

                {isChief && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #ddd' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EmailIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
                            <MuiLink href={`mailto:${member.email || 'jurnal@urdu.uz'}`} color="inherit" underline="hover" variant="body2">
                                {member.email || 'jurnal@urdu.uz'}
                            </MuiLink>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PhoneIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
                            <Typography variant="body2">{member.phone || '+998 ** *** ** **'}</Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

const EditorialBoard: React.FC = () => {
    const chiefEditor = EDITORIAL_MEMBERS.find(m => m.role);
    const executiveSecretary = EDITORIAL_MEMBERS.find(m => m.role);
    const members = EDITORIAL_MEMBERS.filter(m => m.role).sort((a, b) => a.fullName.localeCompare(b.fullName, 'uz'));

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage="Tahririyat Hayʼati" />

            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center', fontWeight: 700, color: 'primary.dark' }}>
                Tahririyat Hayʼati
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.dark', mt: 4, mb: 3, borderBottom: '2px solid #FFCC00', pb: 1 }}>
                Rahbariyat
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3,
                    mb: 5,
                }}
            >
                {chiefEditor && (
                    <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' }, flexGrow: 1 }}>
                        <ScientificMemberCard member={{ ...chiefEditor, email: 'rectorursu@gmail.com', phone: '+998622246700' }} roleType="Chief" />
                    </Box>
                )}
                {executiveSecretary && (
                    <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' }, flexGrow: 1 }}>
                        <ScientificMemberCard member={executiveSecretary} roleType="Chief" />
                    </Box>
                )}
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.dark', mt: 4, mb: 3, borderBottom: '2px solid #FFCC00', pb: 1 }}>
                Tahririyat Aʼzolari
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                    },
                    gap: 3,
                }}
            >
                {members.map(member => (
                    <ScientificMemberCard key={member.id} member={member} roleType="Member" />
                ))}
            </Box>
        </Container>
    );
};

export default EditorialBoard;