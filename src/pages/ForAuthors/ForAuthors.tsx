import React, { useState, useCallback, useMemo } from 'react';
import {
    Container, Typography, Box, Paper, Stepper, Step, StepLabel, Divider,
    Button, TextField, Checkbox, FormControlLabel,
    Select, MenuItem, InputLabel, FormControl, type SelectChangeEvent,
    Accordion, AccordionSummary, AccordionDetails, Alert,
    CircularProgress,
    type StepIconProps,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LaunchIcon from '@mui/icons-material/Launch';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScienceIcon from '@mui/icons-material/Science';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import SchoolIcon from '@mui/icons-material/School';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import GavelIcon from '@mui/icons-material/Gavel';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TimerIcon from '@mui/icons-material/Timer';
import VerifiedIcon from '@mui/icons-material/Verified';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';
import PdfViewerModal from '../../components/ui/PdfViewerModal';


const PRIMARY_COLOR = '#1A237E';
const SECONDARY_COLOR = '#FFC107';
const LIGHT_BACKGROUND = '#F8F9FA';

interface FormData {
    rulesAgreed: boolean;
    titleUz: string;
    authorName: string;
    authorEmail: string;
    authorPhone: string;
    articleLanguage: 'uz' | 'en' | 'ru';
    abstract: string;
    keywords: string;
    articleFile: File | null;
}
type ChangeEventType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>;
interface StepProps {
    formData: FormData;
    nextStep: () => void;
    prevStep: () => void;
    handleChange: (e: ChangeEventType) => void;
    errors: Record<keyof FormData, string>;
}
interface StepFourProps extends Omit<StepProps, 'handleChange'> { setFormData: React.Dispatch<React.SetStateAction<FormData>>; }
interface StepFiveProps extends Omit<StepProps, 'handleChange'> { submitForm: (data: FormData) => void; }
interface SubmissionSuccessProps { goBack: () => void; formData: FormData; }
interface SubmissionFormContainerProps { goBack: () => void; }

const initialFormData: FormData = {
    rulesAgreed: false,
    titleUz: '',
    authorName: '',
    authorEmail: '',
    authorPhone: '',
    articleLanguage: 'uz',
    abstract: '',
    keywords: '',
    articleFile: null,
};

const SUBMISSION_STEPS = [
    "Qoidalarni tasdiqlash",
    "Muallif ma'lumotlari",
    "Annotatsiya va kalit so'zlar",
    "Qo'lyozmani yuklash",
    "Yakuniy yuborish"
];

const TELEGRAM_BOT_TOKEN = '8540928406:AAFum6dli-GRi3QuqfKjsOg3NkDkno11b7Q';
const TELEGRAM_CHAT_ID = '959288654';
//const TEMPLATE_FILE_URL = "/public/Template.pdf";


const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone: string) => /^\+?\d[\d\s-]{7,20}$/.test(phone);
const isFilled = (value: string | File | null | boolean): boolean => {
    if (typeof value === 'boolean') return value;
    if (value === null) return false;
    if (typeof value === 'object' && 'name' in value) return !!value.name;
    return value.toString().trim().length > 0;
};

const validateStep = (step: number, formData: FormData): Record<keyof FormData, string> => {
    const errors: Record<string, string> = {};

    if (step === 0) {
        if (!formData.rulesAgreed) errors.rulesAgreed = "Qoidalarni tasdiqlash majburiy.";
    }

    else if (step === 1) {
        if (!isFilled(formData.titleUz)) errors.titleUz = "Sarlavha kiritilishi shart.";
        if (!isFilled(formData.authorName)) errors.authorName = "Muallif F.I.Sh kiritilishi shart.";

        if (!isFilled(formData.authorEmail)) {
            errors.authorEmail = "Email kiritilishi shart.";
        } else if (!validateEmail(formData.authorEmail)) {
            errors.authorEmail = "Email formati noto'g'ri.";
        }

        if (isFilled(formData.authorPhone) && !validatePhone(formData.authorPhone)) {
            errors.authorPhone = "Telefon raqami formati noto'g'ri. (+998XX...)";
        }
    }

    else if (step === 2) {
        if (!isFilled(formData.abstract)) errors.abstract = "Abstrakt (xulosa) kiritilishi shart.";
        if (formData.abstract.length > 3000) errors.abstract = "Abstrakt juda uzun (3000 belgidan kam bo'lishi kerak).";
        if (!isFilled(formData.keywords)) errors.keywords = "Kalit so'zlar kiritilishi shart.";
    }

    else if (step === 3) {
        if (!isFilled(formData.articleFile)) errors.articleFile = "Qo'lyozma faylini yuklash majburiy.";
    }

    return errors as Record<keyof FormData, string>;
};


const UsefulLinks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPdfUrl, setCurrentPdfUrl] = useState('');
    const [currentPdfTitle, setCurrentPdfTitle] = useState('');

    // const handleOpenTemplate = () => {
    //     setCurrentPdfUrl(TEMPLATE_FILE_URL);
    //     setCurrentPdfTitle("Shablonni Yuklab Olish");
    //     setIsModalOpen(true);
    // };



    // function downloadLocalDocx() {
    // const filePath = "/public/Template.docx"; // lokal docx manzili
    // const fileName = "Template.docx";  // yuklab olish nomi

    // fetch(filePath)
    //     .then(response => response.blob())
    //     .then(blob => {
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = fileName;
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    //     setTimeout(() => URL.revokeObjectURL(url), 500);
    //     })
    //     .catch(err => console.error("Fayl yuklanmadi:", err));
    // }


    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPdfUrl('');
        setCurrentPdfTitle('');
    };

    return (
        <>
            <Box
                mt={4}
                p={4}
                bgcolor="#E8EAF6"
                borderRadius={2}
                textAlign="center"
                sx={{ border: `1px solid ${PRIMARY_COLOR}`, boxShadow: 'none' }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, color: PRIMARY_COLOR, mb: 1 }}>
                    <MenuBookIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Maqola namunasi
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Maqolani formatlash bo'yicha rasmiy namunaviy faylni (.docx) yuklab olishingiz mumkin
                </Typography>
                <a href='/public/Template.docx' download={"Template.docx"} >
                <Button
                    variant="contained"
                    //  onClick={downloadLocalDocx}
                    startIcon={<DownloadIcon />}
                    sx={{
                        bgcolor: SECONDARY_COLOR,
                        color: PRIMARY_COLOR,
                        fontWeight: 700,
                        '&:hover': { bgcolor: '#FFD700' }
                    }}
                >
                    
                    Shablonni yuklab olish
                </Button>
                </a>
            </Box>

            <PdfViewerModal
                open={isModalOpen}
                onClose={handleCloseModal}
                pdfUrl={currentPdfUrl}
                title={currentPdfTitle}
            />
        </>
    );
};



const sendToTelegram = async (data: FormData) => {
    const message = `
📝 *Yangi maqola yuborildi!*

📌 *Sarlavha:* ${data.titleUz}
👤 *Muallif:* ${data.authorName}
📧 *Email:* ${data.authorEmail}
📞 *Telefon:* ${data.authorPhone || '—'}
🌐 *Til:* ${data.articleLanguage.toUpperCase()}

🔑 *Kalit so'zlar:* ${data.keywords}

🧾 *Abstrakt:*
${data.abstract}
`;

    try {
        if (data.articleFile) {
            const form = new FormData();
            form.append('chat_id', TELEGRAM_CHAT_ID);
            form.append('document', data.articleFile, data.articleFile.name);
            form.append('caption', message);
            form.append('parse_mode', 'Markdown');

            const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
                method: 'POST',
                body: form
            });

            if (!res.ok) {
                await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' })
                });
            }
        } else {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' })
            });
        }
    } catch (err) {
        console.error('❌ Telegramga yuborishda xatolik:', err);
    }
};


const StepOne: React.FC<StepProps> = ({ formData, handleChange, nextStep, errors }) => (
    <Paper elevation={4} sx={{ p: 5, bgcolor: 'white', borderRadius: 2, borderLeft: `5px solid ${PRIMARY_COLOR}` }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: PRIMARY_COLOR }}>
            1. Jurnal Qoidalarini Tasdiqlash
        </Typography>
        <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 3, fontWeight: 500, borderLeft: '4px solid #1A237E' }}>
            Maqolani yuborishdan oldin, barcha rasmiy talablarni diqqat bilan o'qib chiqing.
        </Alert>
        <FormControlLabel
            control={
                <Checkbox
                    checked={formData.rulesAgreed}
                    onChange={(e) => handleChange(e)}
                    name="rulesAgreed"
                    sx={{ color: SECONDARY_COLOR, '&.Mui-checked': { color: PRIMARY_COLOR } }}
                />
            }
            label={
                <Typography variant="body1" sx={{ fontWeight: 500, color: errors.rulesAgreed ? 'error.main' : 'text.primary' }}>
                    Men barcha jurnal qoidalari va formatlash shartlariga **to'liq rozilik bildiraman**.
                </Typography>
            }
            sx={{ mb: 3 }}
        />
        {errors.rulesAgreed && (
            <Typography color="error" variant="caption" sx={{ display: 'block', mt: -2, mb: 2, fontWeight: 500 }}>
                {errors.rulesAgreed}
            </Typography>
        )}
        <Box display="flex" justifyContent="flex-end" pt={2}>
            <Button
                variant="contained"
                sx={{
                    bgcolor: PRIMARY_COLOR,
                    '&:hover': { bgcolor: SECONDARY_COLOR, color: PRIMARY_COLOR },
                    borderRadius: '8px',
                    py: 1.2,
                    px: 4,
                    fontWeight: 600,
                }}
                onClick={nextStep}
                disabled={!formData.rulesAgreed}
                endIcon={<SendIcon />}
            >
                Keyingi Bosqich
            </Button>
        </Box>
    </Paper>
);

const StepTwo: React.FC<StepProps> = ({ formData, handleChange, nextStep, prevStep, errors }) => {
    const isStepValid = !errors.titleUz && !errors.authorName && !errors.authorEmail && !errors.authorPhone && isFilled(formData.titleUz) && isFilled(formData.authorName) && isFilled(formData.authorEmail) && validateEmail(formData.authorEmail);

    return (
        <Paper elevation={4} sx={{ p: 5, bgcolor: 'white', borderRadius: 2, borderLeft: `5px solid ${PRIMARY_COLOR}` }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, color: PRIMARY_COLOR }}>
                2. Muallif va Maqola Ma'lumotlari
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                <TextField
                    fullWidth
                    label="Maqola Sarlavhasi (O'zbek tilida)"
                    name="titleUz"
                    value={formData.titleUz}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    error={!!errors.titleUz}
                    helperText={errors.titleUz}
                    sx={{ width: '100%', mb: 1 }}
                />

                <TextField
                    label="Bosh Muallifning To'liq Ismi (F.I.Sh)"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    error={!!errors.authorName}
                    helperText={errors.authorName}
                    sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}
                />
                <TextField
                    label="Elektron Pochta (Email)"
                    name="authorEmail"
                    value={formData.authorEmail}
                    onChange={handleChange}
                    type="email"
                    required
                    variant="outlined"
                    error={!!errors.authorEmail}
                    helperText={errors.authorEmail}
                    sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}
                />

                <TextField
                    label="Telefon raqami"
                    name="authorPhone"
                    value={formData.authorPhone}
                    onChange={handleChange}
                    placeholder="+998 XX YYY ZZ AA"
                    variant="outlined"
                    error={!!errors.authorPhone}
                    helperText={errors.authorPhone}
                    sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}
                />

                <FormControl required variant="outlined" sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <InputLabel id="article-language-label">Maqola Tili</InputLabel>
                    <Select
                        labelId="article-language-label"
                        name="articleLanguage"
                        value={formData.articleLanguage}
                        label="Maqola Tili"
                        onChange={handleChange}
                    >
                        <MenuItem value="uz">O'zbek tili</MenuItem>
                        <MenuItem value="en">Ingliz tili</MenuItem>
                        <MenuItem value="ru">Rus tili</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={5}>
                <Button variant="outlined" onClick={prevStep} startIcon={<ArrowBackIcon />} sx={{ borderRadius: '8px', color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}>
                    Orqaga
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: PRIMARY_COLOR,
                        '&:hover': { bgcolor: SECONDARY_COLOR, color: PRIMARY_COLOR },
                        borderRadius: '8px',
                        py: 1.2,
                        px: 4,
                        fontWeight: 600,
                    }}
                    onClick={nextStep}
                    disabled={!isStepValid}
                    endIcon={<SendIcon />}
                >
                    Keyingi Bosqich
                </Button>
            </Box>
        </Paper>
    );
};

const StepThree: React.FC<StepProps> = ({ formData, handleChange, nextStep, prevStep, errors }) => {
    const isStepValid = !errors.abstract && !errors.keywords && isFilled(formData.abstract) && isFilled(formData.keywords);

    return (
        <Paper elevation={4} sx={{ p: 5, bgcolor: 'white', borderRadius: 2, borderLeft: `5px solid ${PRIMARY_COLOR}` }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, color: PRIMARY_COLOR }}>
                3. Abstrakt (Annotatsiya) va Kalit So'zlar
            </Typography>

            <Box mb={4}>
                <TextField
                    fullWidth
                    label="Abstrakt (Xulosa)"
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    multiline
                    rows={7}
                    placeholder="Maqsadi, usullari, natijalari va xulosani kiriting (Maksimal 250 so'z)."
                    required
                    variant="outlined"
                    error={!!errors.abstract}
                    helperText={errors.abstract}
                />
            </Box>

            <Box mb={4}>
                <TextField
                    fullWidth
                    label="Kalit So'zlar"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    placeholder="Kalit so'zlarni vergul bilan ajrating (Masalan: Innovatsiya, Raqamli, Ta'lim)"
                    required
                    variant="outlined"
                    error={!!errors.keywords}
                    helperText={errors.keywords}
                />
            </Box>

            <Box display="flex" justifyContent="space-between" mt={5}>
                <Button variant="outlined" onClick={prevStep} startIcon={<ArrowBackIcon />} sx={{ borderRadius: '8px', color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}>
                    Orqaga
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: PRIMARY_COLOR,
                        '&:hover': { bgcolor: SECONDARY_COLOR, color: PRIMARY_COLOR },
                        borderRadius: '8px',
                        py: 1.2,
                        px: 4,
                        fontWeight: 600,
                    }}
                    onClick={nextStep}
                    disabled={!isStepValid}
                    endIcon={<SendIcon />}
                >
                    Keyingi Bosqich
                </Button>
            </Box>
        </Paper>
    );
};

const StepFour: React.FC<StepFourProps> = ({ formData, setFormData, nextStep, prevStep, errors }) => {
    const [fileMessage, setFileMessage] = useState(errors.articleFile || '');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileMessage('');
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setFileMessage("Xatolik: Fayl hajmi 5MB dan oshmasligi kerak!");
                setFormData(prev => ({ ...prev, articleFile: null }));
                return;
            }
        } else {
            setFileMessage("Qo'lyozma faylini yuklash majburiy.");
        }
        setFormData(prev => ({ ...prev, articleFile: file }));
    };

    const isStepValid = isFilled(formData.articleFile) && !fileMessage;

    return (
        <Paper elevation={4} sx={{ p: 5, bgcolor: 'white', borderRadius: 2, borderLeft: `5px solid ${PRIMARY_COLOR}` }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, color: PRIMARY_COLOR }}>
                4. Qo'lyozmani Yuklash
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    p: 5,
                    mb: 3,
                    textAlign: 'center',
                    borderStyle: 'dashed',
                    borderColor: formData.articleFile ? 'success.main' : (fileMessage ? 'error.main' : PRIMARY_COLOR),
                    cursor: 'pointer',
                    bgcolor: LIGHT_BACKGROUND,
                    borderRadius: 2,
                    '&:hover': {
                        borderColor: SECONDARY_COLOR,
                    }
                }}
            >
                <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                    <UploadFileIcon sx={{ fontSize: 50, color: formData.articleFile ? 'success.main' : (fileMessage ? 'error.main' : PRIMARY_COLOR), mb: 1 }} />
                    <Typography sx={{ fontWeight: 700, mb: 1, color: PRIMARY_COLOR }}>
                        {formData.articleFile ? "Fayl Muvaffaqiyatli Yuklandi" : "Maqola faylini tanlang (.pdf yoki .docx)"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Faqat **5MB** dan kichik PDF yoki DOCX fayllarni yuklang. Rasmiy shablonlardan foydalaning.
                    </Typography>
                </label>

                {formData.articleFile && (
                    <Box mt={3} p={1.5} bgcolor="#E8F5E9" borderRadius={1} border="1px solid #4CAF50">
                        <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.dark' }}>
                            {formData.articleFile.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Hajmi: {(formData.articleFile.size / 1024 / 1024).toFixed(2)} MB
                        </Typography>
                    </Box>
                )}

                {fileMessage && (
                    <Box mt={2}>
                        <Typography variant="body2" color="error" sx={{ fontWeight: 600 }}>
                            {fileMessage}
                        </Typography>
                    </Box>
                )}
            </Paper>

            <Box display="flex" justifyContent="space-between" mt={5}>
                <Button variant="outlined" onClick={prevStep} startIcon={<ArrowBackIcon />} sx={{ borderRadius: '8px', color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}>
                    Orqaga
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: PRIMARY_COLOR,
                        '&:hover': { bgcolor: SECONDARY_COLOR, color: PRIMARY_COLOR },
                        borderRadius: '8px',
                        py: 1.2,
                        px: 4,
                        fontWeight: 600,
                    }}
                    onClick={nextStep}
                    disabled={!isStepValid}
                    endIcon={<SendIcon />}
                >
                    Keyingi Bosqich
                </Button>
            </Box>
        </Paper>
    );
};

const StepFive: React.FC<StepFiveProps> = ({ formData, submitForm, prevStep }) => {
    const [isConfirmed, setIsConfirmed] = useState(false);

    return (
        <Paper elevation={4} sx={{ p: 5, bgcolor: 'white', borderRadius: 2, borderLeft: `5px solid ${PRIMARY_COLOR}` }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, color: PRIMARY_COLOR }}>
                5. Yakuniy Ko'rik va Yuborish
            </Typography>

            <Paper elevation={2} sx={{ p: 4, mb: 4, bgcolor: LIGHT_BACKGROUND, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: PRIMARY_COLOR, borderBottom: `2px solid ${PRIMARY_COLOR}`, pb: 1 }}>
                    Ma'lumotlar Xulosasi
                </Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                    fontSize: '0.95rem'
                }}>
                    <Box><Typography><strong>Sarlavha:</strong> {formData.titleUz}</Typography></Box>
                    <Box><Typography><strong>Muallif:</strong> {formData.authorName}</Typography></Box>
                    <Box><Typography><strong>Email:</strong> {formData.authorEmail}</Typography></Box>
                    <Box><Typography><strong>Telefon:</strong> {formData.authorPhone || '—'}</Typography></Box>
                    <Box sx={{ gridColumn: 'span 2' }}><Typography><strong>Fayl Nomi:</strong> {formData.articleFile?.name || 'Mavjud emas'}</Typography></Box>
                </Box>

                <Box mt={3} p={2} bgcolor="#FFFFFF" borderRadius={1} border={`1px solid #E0E0E0`}>
                    <Typography variant="body2" color={PRIMARY_COLOR} sx={{ fontWeight: 600, mb: 0.5 }}>Abstrakt:</Typography>
                    <Typography variant="body2" fontStyle="italic" color="text.secondary">{formData.abstract}</Typography>
                </Box>
            </Paper>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={isConfirmed}
                        onChange={(e) => setIsConfirmed(e.target.checked)}
                        color="success"
                    />
                }
                label={
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Men yuqoridagi ma'lumotlar to'g'ri ekanligini tasdiqlayman va uni **rasmiy yuborishga** rozilik bildiraman.
                    </Typography>
                }
                sx={{ mb: 3 }}
            />

            <Box display="flex" justifyContent="space-between" mt={5}>
                <Button variant="outlined" onClick={prevStep} startIcon={<ArrowBackIcon />} sx={{ borderRadius: '8px', color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}>
                    Orqaga
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => submitForm(formData)}
                    disabled={!isConfirmed}
                    endIcon={<CheckCircleOutlineIcon />}
                    sx={{ borderRadius: '8px', py: 1.2, px: 4, fontWeight: 700, bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' } }}
                >
                    Jo'natish
                </Button>
            </Box>
        </Paper>
    );
};

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ goBack, formData }) => (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Paper elevation={8} sx={{ p: 7, borderRadius: 2, backgroundColor: '#E8F5E9', border: '3px solid #4CAF50' }}>
            <Typography variant="h3" color="success.dark" sx={{ mb: 3, fontWeight: 700 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 60, mb: 1 }} />
                <br /> Muvaffaqiyatli Yuborildi!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', color: PRIMARY_COLOR }}>
                Hurmatli **{formData.authorName}**, sizning tadqiqotingiz rasmiy ravishda qabul qilindi.
            </Typography>
            <Box mb={4} p={3} bgcolor="#FFFFFF" borderRadius={2} textAlign="left" border={`1px solid ${PRIMARY_COLOR}`}>
                <Typography variant="body2" color={PRIMARY_COLOR} sx={{ mb: 1, fontWeight: 700 }}>
                    KEYINGI QADAMLAR:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    1. Hujjatlaringiz Tahririyat Kengashiga yuborildi.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    2. Taqriz jarayoni boshlanadi. Tahririyat siz bilan **{formData.authorEmail}** orqali bog'lanadi.
                </Typography>
            </Box>

            <Button
                variant="contained"
                sx={{
                    bgcolor: PRIMARY_COLOR,
                    '&:hover': { bgcolor: SECONDARY_COLOR, color: PRIMARY_COLOR },
                    borderRadius: '8px',
                    py: 1.2,
                    px: 5,
                    mt: 2,
                    fontWeight: 600
                }}
                size="large"
                onClick={goBack}
                startIcon={<ArrowBackIcon />}
            >
                Asosiy Yoʻriqnomaga Qaytish
            </Button>
        </Paper>
    </Container>
);


const stepIcons: { [key: number]: React.ReactElement } = {
    1: <GavelIcon />,
    2: <EditNoteIcon />,
    3: <CloudUploadIcon />,
    4: <TimerIcon />,
    5: <VerifiedIcon />,
};

const CustomStepIcon = (props: StepIconProps) => {
    const { active, completed, icon } = props;
    const isCompleted = completed;
    const isActive = active;

    return (
        <Box
            sx={{
                zIndex: 1,
                color: isCompleted ? 'white' : (isActive ? SECONDARY_COLOR : PRIMARY_COLOR),
                width: 38,
                height: 38,
                display: 'flex',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: isCompleted ? PRIMARY_COLOR : (isActive ? PRIMARY_COLOR : LIGHT_BACKGROUND),
                border: isActive ? `3px solid ${SECONDARY_COLOR}` : (isCompleted ? `3px solid ${PRIMARY_COLOR}` : `2px solid ${PRIMARY_COLOR}`),
                boxShadow: isActive ? `0 4px 10px 0 rgba(0,0,0,.25)` : 'none',
            }}
        >
            {isCompleted ? (
                <CheckCircleOutlineIcon sx={{ color: SECONDARY_COLOR, fontSize: 24 }} />
            ) : (
                <Box sx={{ color: isActive ? SECONDARY_COLOR : PRIMARY_COLOR, fontSize: 22 }}>
                    {stepIcons[Number(icon)]}
                </Box>
            )}
        </Box>
    );
};


interface StructureItem {
    id: string;
    title: string;
    icon: React.ReactElement;
    languages?: string;
    description: string;
    note?: string;
}

const ARTICLE_STRUCTURE_RULES: StructureItem[] = [
    {
        id: "author-info",
        title: "Muallif to'g'risida ma'lumot",
        icon: <PersonIcon sx={{ color: PRIMARY_COLOR }} />,
        languages: "O'zbek, Rus, Ingliz",
        description: "Muallif(lar)ning ism-familiyasi va otasining ismi to'liq yozilishi, lavozimi, ilmiy unvoni va darjasi, e-maili, telefon raqami yozilishi shart.",
        note: "Barcha maʼlumotlar uch tilda taqdim etilishi kerak."
    },
    {
        id: "title",
        title: "Maqola mavzusi (Title)",
        icon: <TitleIcon sx={{ color: PRIMARY_COLOR }} />,
        languages: "O'zbek, Rus, Ingliz",
        description: "Mavzu qisqa, lo'nda shakllantirilgan bo'lib, tadqiqot yo'nalishini aniq ifoda etishi lozim."
    },
    {
        id: "abstract",
        title: "Maqola annotatsiyasi (Abstract)",
        icon: <DescriptionIcon sx={{ color: PRIMARY_COLOR }} />,
        languages: "O'zbek, Rus, Ingliz",
        description: "5 qatordan kam, 15 qatordan oshmagan holda beriladi. Unda tadqiqat muammosi, dolzarbligi, metodologiya, tadqiqat natijalari va ilmiy/amaliy hissasi qisqacha bayon qilinadi.",
        note: "Annotatsiya strukturasi: Muammo > Dolzarblik > Metodologiya > Natijalar > Xulosa."
    },
    {
        id: "keywords",
        title: "Kalit so'zlar (Key words)",
        icon: <VpnKeyIcon sx={{ color: PRIMARY_COLOR }} />,
        languages: "O'zbek, Rus, Ingliz",
        description: "Maqola mazmuni va maqsadini ochib beruvchi kalit so'zlar hisoblanadi. Har biri asosiy matnda ko'proq takrorlanishi tavsiya etiladi."
    },
    {
        id: "introduction",
        title: "Kirish (Introduction)",
        icon: <LaunchIcon sx={{ color: PRIMARY_COLOR }} />,
        languages: "Yo'q",
        description: "Tadqiqat muammosi, uning maqsad va vazifalari yoritiladi. Mavzuning tanlanish asosi, dolzarbligi va ilmiy ahamiyati tushuntiriladi."
    },
    {
        id: "lit-review",
        title: "Mavzuga oid adabiyotlarning tahlili",
        icon: <MenuBookIcon sx={{ color: PRIMARY_COLOR }} />,
        languages: "Yo'q",
        description: "Tadqiq etilayotgan muammo yuzasidan muallifning bilim darajasi, mavjud intellektual hududni baholash va tanqidiy tahlil orqali tadqiqat savollarini oydinlashtirishni ko'rsatadi."
    },
    {
        id: "methodology",
        title: "Tadqiqat metodologiyasi",
        icon: <ScienceIcon sx={{ color: PRIMARY_COLOR }} />,
        languages: "Yo'q",
        description: "Tadqiqatning umumiy xaritasi, falsafasi (deduksion/induksion), dizayni, ma'lumot olish yo'llari, tadqiqat obyektining tanlovi (sampling), strategiya (eksperiment, keys-stadi va h.k.) va tadqiqat etikasini belgilash. Metodologiya ishonchlilik (reliability) va aniqlilikni (validity) asoslashi kerak."
    },
    {
        id: "analysis-results",
        title: "Tahlil va natijalar",
        icon: <AnalyticsIcon sx={{ color: PRIMARY_COLOR }} />,
        languages: "Yo'q",
        description: "Metodologiyada belgilangan tahlil usullari orqali yig'ilgan ma'lumotlarning tahlilini amalga oshiradi. Faqat tahlil usulining natijalari ifoda etiladi, muhokama keyingi qismda bo'ladi."
    },
    {
        id: "conclusion",
        title: "Xulosa va takliflar",
        icon: <LightbulbIcon sx={{ color: PRIMARY_COLOR }} />,
        languages: "Yo'q",
        description: "Tadqiqat maqsad va vazifalarining bajarilganligi, tadqiqat savollarining javob topganligi, asosiy natijalar bo'yicha umumiy xulosalar, takliflar va kelajak tadqiqot yo'nalishlari maqolaning asosini tashkil etishi lozim."
    },
    {
        id: "references",
        title: "Foydalanilgan adabiyotlar ro'yxati",
        icon: <BookmarksIcon sx={{ color: PRIMARY_COLOR }} />,
        languages: "Yo'q",
        description: "Tadqiqatda foydalanilgan barcha adabiyotlarning ro'yxati [1], [2] ketma-ketligida qo'yiladi. Matnda havola [1; 25–26-b.] shaklida berilishi kerak. Kitob va maqola ma'lumotlari to'liq ko'rsatilishi shart."
    }
];

const ArticleStructure: React.FC = () => {
    const [expanded, setExpanded] = useState<string | false>('author-info');

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Paper elevation={4} sx={{ p: 5, mb: 4, bgcolor: 'white', borderRadius: 2, border: `1px solid #E0E0E0` }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 800, color: PRIMARY_COLOR, borderBottom: `3px solid ${PRIMARY_COLOR}`, pb: 1 }}>
                Maqola tuzilmasining rasmiy talablari
            </Typography>

            {ARTICLE_STRUCTURE_RULES.map((item) => (
                <Accordion
                    key={item.id}
                    expanded={expanded === item.id}
                    onChange={handleChange(item.id)}
                    sx={{
                        border: expanded === item.id ? `2px solid ${PRIMARY_COLOR}` : '1px solid #E0E0E0',
                        mb: 1.5,
                        borderRadius: '6px !important',
                        '&.Mui-expanded': { m: '10px 0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: PRIMARY_COLOR }} />}
                        aria-controls={`${item.id}-content`}
                        id={`${item.id}-header`}
                        sx={{
                            bgcolor: expanded === item.id ? '#F0F3F7' : 'inherit',
                            borderRadius: '5px',
                            '& .MuiAccordionSummary-content': { alignItems: 'center' }
                        }}
                    >
                        <Box display="flex" alignItems="center" width="100%">
                            <Box sx={{ mr: 2, p: 1, borderRadius: '4px', bgcolor: LIGHT_BACKGROUND, border: `1px solid #D0D0D0` }}>
                                {item.icon}
                            </Box>
                            <Typography sx={{ flexShrink: 0, fontWeight: 700, fontSize: '1.05rem', color: expanded === item.id ? PRIMARY_COLOR : 'text.primary' }}>
                                {item.title}
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ borderTop: `1px dashed #D0D0D0`, bgcolor: '#FFFFFF', py: 3, borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
                        <Typography variant="body1" sx={{ mb: 1.5, color: 'text.primary', lineHeight: 1.7, fontSize: '1.0rem' }}>
                            {item.description}
                        </Typography>
                        {item.note && (
                            <Box sx={{ p: 2, bgcolor: '#F0F8FF', borderLeft: '4px solid #1A73E8', pl: 2, borderRadius: 1 }}>
                                <Typography variant="body2" sx={{ display: 'block', fontWeight: 700, color: '#1A73E8' }}>
                                    QO'SHIMCHA KO'RSATMA:
                                </Typography>
                                <Typography variant="body2" sx={{ display: 'block', color: 'text.secondary' }}>
                                    {item.note}
                                </Typography>
                            </Box>
                        )}
                    </AccordionDetails>
                </Accordion>
            ))}

            <Box mt={5} p={4} borderRadius={2} border={`2px solid #D32F2F`} bgcolor="#FFF3F3" textAlign="left" boxShadow="0 0 8px rgba(211,47,47,0.1)">
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#D32F2F', mb: 1 }}>
                    <WarningIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: 30 }} />
                    RASMIY OGOHLANTIRISH
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                    Yuqoridagi rasmiy talablar va tuzilmaga to'liq javob bermagan qo'lyozmalar, tahririyat tomonidan ko'rib chiqilmasdan rad etilishi mumkin. Iltimos, barcha qoidalarga qat'iy rioya qiling.
                </Typography>
            </Box>

            <Box mt={3} p={4} borderRadius={2} border={`2px solid ${PRIMARY_COLOR}`} bgcolor="#F0F8FF" textAlign="left" boxShadow="0 0 8px rgba(26,35,126,0.1)">
                <Typography variant="h6" sx={{ fontWeight: 700, color: PRIMARY_COLOR, mb: 1 }}>
                    <CheckCircleOutlineIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: 30 }} />
                    Nashr qilish turi
                </Typography>
                <Typography variant="body1" color="text.primary">
                    Online
                </Typography>
            </Box>
        </Paper>
    );
};


const SubmissionFormContainer: React.FC<SubmissionFormContainerProps> = ({ goBack }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const errors = useMemo(() => {
        return validateStep(activeStep, formData);
    }, [formData, activeStep]);

    const handleChange = useCallback((e: ChangeEventType) => {
        const target = (e as SelectChangeEvent<string>).target || (e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>).target;

        const name = target.name as keyof FormData;
        if (!name) return;

        if ('type' in target && target.type === 'checkbox') {
            const checkedValue = (target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checkedValue as FormData[keyof FormData] }));
        } else {
            const inputValue = target.value;
            setFormData(prev => ({ ...prev, [name]: inputValue as FormData[keyof FormData] }));
        }
    }, []);

    const nextStep = () => {
        const stepErrors = validateStep(activeStep, formData);
        if (Object.keys(stepErrors).length === 0) {
            setActiveStep(prev => prev + 1);
        } else {
            console.log("Validatsiya xatolari mavjud:", stepErrors);
        }
    };
    const prevStep = () => setActiveStep(prev => Math.max(0, prev - 1));

    const submitForm = async (data: FormData) => {
        setIsSending(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        await sendToTelegram(data);
        setIsSending(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return <SubmissionSuccess goBack={goBack} formData={formData} />;
    }

    const stepsContent = [
        <StepOne key={0} formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={activeStep === 0 ? errors : {} as Record<keyof FormData, string>} />,
        <StepTwo key={1} formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={activeStep === 1 ? errors : {} as Record<keyof FormData, string>} />,
        <StepThree key={2} formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={activeStep === 2 ? errors : {} as Record<keyof FormData, string>} />,
        <StepFour key={3} formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} errors={activeStep === 3 ? errors : {} as Record<keyof FormData, string>} />,
        <StepFive key={4} formData={formData} submitForm={submitForm} prevStep={prevStep} nextStep={nextStep} errors={{} as Record<keyof FormData, string>} />
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 6, bgcolor: LIGHT_BACKGROUND, minHeight: '100vh' }}>
            <Box mb={5} display="flex" justifyContent="space-between" alignItems="center" borderBottom={`3px solid ${PRIMARY_COLOR}`} pb={2}>
                <Typography variant="h4" component="h1" fontWeight={800} sx={{ color: PRIMARY_COLOR }}>
                    Rasmiy maqola yuborish formasi
                </Typography>
                <Button
                    variant="outlined"
                    onClick={goBack}
                    startIcon={<ArrowBackIcon />}
                    sx={{ borderRadius: '8px', fontWeight: 600, color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR, '&:hover': { bgcolor: '#F0F3F7' } }}
                >
                    Yoʻriqnomaga qaytish
                </Button>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 5
            }}>
                <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0 }}>
                    <Paper elevation={4} sx={{ p: 4, position: 'sticky', top: 30, bgcolor: 'white', borderRadius: 2, borderLeft: `5px solid ${SECONDARY_COLOR}` }}>
                        <Stepper activeStep={activeStep} orientation="vertical" connector={<Divider orientation="vertical" flexItem sx={{ mx: 'auto', bgcolor: PRIMARY_COLOR }} />}>
                            {SUBMISSION_STEPS.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconProps={{
                                        style: { color: activeStep >= SUBMISSION_STEPS.indexOf(label) ? PRIMARY_COLOR : '#E0E0E0' }
                                    }}>
                                        <Typography variant="body1" fontWeight={activeStep >= SUBMISSION_STEPS.indexOf(label) ? 700 : 500} sx={{ color: activeStep >= SUBMISSION_STEPS.indexOf(label) ? PRIMARY_COLOR : 'text.secondary' }}>
                                            {label}
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Paper>
                </Box>

                <Box sx={{ flexGrow: 1, width: { xs: '100%', md: 'calc(100% - 280px - 40px)' } }}>
                    {isSending ? (
                        <Paper elevation={4} sx={{ p: 8, textAlign: 'center', borderRadius: 2, bgcolor: '#FFF8E1' }}>
                            <CircularProgress sx={{ color: PRIMARY_COLOR }} size={50} thickness={5} />
                            <Typography variant="h6" color={PRIMARY_COLOR} sx={{ mt: 3, fontWeight: 600 }}>
                                <SendIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Maqolangiz jo'natilyapti...
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Iltimos, jarayon tugashini kuting. Bu bir necha soniya davom etishi mumkin.
                            </Typography>
                        </Paper>
                    ) : (
                        stepsContent[activeStep]
                    )}
                </Box>
            </Box>
        </Container>
    );
};


const ForAuthors: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (isSubmitting) {
        return <SubmissionFormContainer goBack={() => setIsSubmitting(false)} />;
    }

    const submissionSteps = [
        "Rasmiy qoidalarni ko'rib chiqish",
        "Qo'lyozmani ilmiy tayyorlash",
        "Onlayn yuborish (Tizim orqali)",
        "Taqriz jarayonini kutish",
        "Nashr etishga ruxsat olish",
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <CustomBreadcrumbs currentPage="Mualliflar uchun" />

            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 2, fontWeight: 900, color: PRIMARY_COLOR }}>
                <SchoolIcon sx={{ fontSize: 45, verticalAlign: 'middle', mr: 2, color: PRIMARY_COLOR }} /> Ilmiy maqolani taqdim etish
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 5, fontWeight: 400 }}>
                Ilmiy maqolani tadqim qilish bo'yicha yo'riqnoma
            </Typography>

            <Paper elevation={8} sx={{
                p: 6,
                mb: 6,
                backgroundColor: PRIMARY_COLOR,
                borderRadius: 2,
                color: 'white',
                border: `3px solid ${SECONDARY_COLOR}`,
                transition: 'all 0.3s',
                '&:hover': {
                    boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                }
            }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: SECONDARY_COLOR }}>
                    Maqolani yuborish tizimi
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                    Jarayonni  boshlash uchun quyidagi tugmani bosing
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => setIsSubmitting(true)}
                    endIcon={<SendIcon />}
                    sx={{
                        borderRadius: '8px',
                        fontWeight: 700,
                        py: 1.5,
                        px: 6,
                        bgcolor: SECONDARY_COLOR,
                        color: PRIMARY_COLOR,
                        transition: 'all 0.3s',
                        '&:hover': { bgcolor: '#FFD700' }
                    }}
                >
                    Maqolani yuborish
                </Button>
            </Paper>

            <Paper elevation={4} sx={{ p: 5, mb: 6, borderRadius: 2, bgcolor: LIGHT_BACKGROUND }}>
                <Typography variant="h6" color={PRIMARY_COLOR} sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
                    Tadqiqotni taqdim qilish bosqichlari
                </Typography>

                <Stepper alternativeLabel connector={<Divider sx={{ bgcolor: PRIMARY_COLOR }} />}>
                    {submissionSteps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={CustomStepIcon} icon={index + 1}>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600, color: PRIMARY_COLOR }}
                                >
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>

            <Divider sx={{ my: 5, bgcolor: '#D0D0D0', height: '1px' }} />

            <ArticleStructure />

            <UsefulLinks />
        </Container>
    );
};

export default ForAuthors;
