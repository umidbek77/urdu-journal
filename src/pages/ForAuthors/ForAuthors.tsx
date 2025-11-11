import React, { useState, useCallback } from 'react';
import {
    Container, Typography, Box, Paper, Stepper, Step, StepLabel, Divider,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Checkbox, FormControlLabel,
    Select, MenuItem, InputLabel, FormControl, type SelectChangeEvent
} from '@mui/material';

// ====================================================================
// TELEGRAM MA’LUMOTLARI
// ====================================================================
const TELEGRAM_BOT_TOKEN = '7701762434:AAHXxVMHAYyklqIwag2YgnUjXIdSLTRddAM';
const TELEGRAM_CHAT_ID = '5995539756';

// ====================================================================
// QO‘LLANMA VA QADAMLAR (dizayn uchun)
// ====================================================================
const SUBMISSION_STEPS = [
    "Qoidalar va shartlarni tasdiqlash",
    "Muallif va maqola ma'lumotlari",
    "Abstrakt va kalit so'zlar",
    "Qo'lyozmani yuklash",
    "Yakuniy ko'rik va yuborish"
];

const CustomBreadcrumbs: React.FC<{ currentPage: string }> = ({ currentPage }) => (
    <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
        Bosh Sahifa / {currentPage}
    </Typography>
);

// ====================================================================
// TYPESCRIPT INTERFEYSLAR
// ====================================================================
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

// Change event union: Text inputs and MUI SelectChangeEvent
type ChangeEventType =
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent<string>;

interface StepProps {
    formData: FormData;
    nextStep: () => void;
    prevStep: () => void;
    handleChange: (e: ChangeEventType) => void;
}

interface StepFourProps extends Omit<StepProps, 'handleChange'> {
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface StepFiveProps extends Omit<StepProps, 'handleChange'> {
    submitForm: (data: FormData) => void;
}

interface SubmissionSuccessProps {
    goBack: () => void;
    formData: FormData;
}

interface SubmissionFormContainerProps {
    goBack: () => void;
}

// ====================================================================
// BOSHLANG‘ICH MA’LUMOTLAR
// ====================================================================
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

// ====================================================================
// 1–5 BOSQICH — FORM KOMPONENTLARI (dizayn saqlangan)
// ====================================================================

const StepOne: React.FC<StepProps> = ({ formData, handleChange, nextStep }) => (
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: 'grey.50' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>1. Jurnal Qoidalarini Tasdiqlash</Typography>

        <Paper variant="outlined" sx={{ p: 2, mb: 3, backgroundColor: '#fff8e1', borderColor: '#ffb300' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#ff6f00' }}>
                Maqolani yuborishdan oldin, barcha talablarni diqqat bilan o'qib chiqing.
            </Typography>
        </Paper>

        <FormControlLabel
            control={
                <Checkbox
                    checked={formData.rulesAgreed}
                    onChange={(e) => handleChange(e)}
                    name="rulesAgreed"
                    color="primary"
                />
            }
            label={
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Men barcha jurnal qoidalari, talablari va formatlash shartlariga rioya qilishga rozilik bildiraman.
                </Typography>
            }
            sx={{ mb: 3 }}
        />

        <Box display="flex" justifyContent="flex-end">
            <Button
                variant="contained"
                color="primary"
                onClick={nextStep}
                disabled={!formData.rulesAgreed}
                sx={{ borderRadius: 2, py: 1.5, px: 4 }}
            >
                Keyingi bosqich
            </Button>
        </Box>
    </Box>
);

const StepTwo: React.FC<StepProps> = ({ formData, handleChange, nextStep, prevStep }) => (
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: 'grey.50' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>2. Muallif va Maqola Ma'lumotlari</Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            <Box sx={{ width: '100%' }}>
                <TextField
                    fullWidth
                    label="Maqola Sarlavhasi (O'zbek tilida)"
                    name="titleUz"
                    value={formData.titleUz}
                    onChange={(e) => handleChange(e)}
                    required
                />
            </Box>

            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                <TextField
                    fullWidth
                    label="Bosh Muallifning To'liq Ismi (F.I.Sh)"
                    name="authorName"
                    value={formData.authorName}
                    onChange={(e) => handleChange(e)}
                    required
                />
            </Box>

            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                <TextField
                    fullWidth
                    label="Elektron Pochta (Email)"
                    name="authorEmail"
                    value={formData.authorEmail}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    required
                />
            </Box>

            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                <TextField
                    fullWidth
                    label="Telefon raqami"
                    name="authorPhone"
                    value={formData.authorPhone}
                    onChange={(e) => handleChange(e)}
                    placeholder="+998 XX YYY ZZ AA"
                />
            </Box>

            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                <FormControl fullWidth required>
                    <InputLabel id="article-language-label">Maqola Tili</InputLabel>
                    <Select
                        labelId="article-language-label"
                        id="articleLanguage"
                        name="articleLanguage"
                        value={formData.articleLanguage}
                        label="Maqola Tili"
                        // handleChange supports SelectChangeEvent<string>
                        onChange={(e) => handleChange(e)}
                    >
                        <MenuItem value="uz">O'zbek tili</MenuItem>
                        <MenuItem value="en">Ingliz tili</MenuItem>
                        <MenuItem value="ru">Rus tili</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={4}>
            <Button variant="outlined" onClick={prevStep} sx={{ borderRadius: 2 }}>
                Orqaga
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={nextStep}
                disabled={!formData.titleUz || !formData.authorName || !formData.authorEmail}
                sx={{ borderRadius: 2, py: 1.5, px: 4 }}
            >
                Keyingi bosqich
            </Button>
        </Box>
    </Box>
);

const StepThree: React.FC<StepProps> = ({ formData, handleChange, nextStep, prevStep }) => (
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: 'grey.50' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>3. Abstrakt va Kalit So'zlar</Typography>

        <Box mb={3}>
            <TextField
                fullWidth
                label="Abstrakt (Xulosa)"
                name="abstract"
                value={formData.abstract}
                onChange={(e) => handleChange(e)}
                multiline
                rows={6}
                placeholder="Maqsadi, usullari, natijalari va xulosani kiriting (Max. 250 so'z)."
                required
            />
        </Box>

        <Box mb={3}>
            <TextField
                fullWidth
                label="Kalit So'zlar"
                name="keywords"
                value={formData.keywords}
                onChange={(e) => handleChange(e)}
                placeholder="Kalit so'zlarni vergul bilan ajrating (Masalan: Kvant, Algoritm, Samaradorlik)"
                required
            />
        </Box>

        <Box display="flex" justifyContent="space-between" mt={4}>
            <Button variant="outlined" onClick={prevStep} sx={{ borderRadius: 2 }}>
                Orqaga
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={nextStep}
                disabled={!formData.abstract || !formData.keywords}
                sx={{ borderRadius: 2, py: 1.5, px: 4 }}
            >
                Keyingi bosqich
            </Button>
        </Box>
    </Box>
);

const StepFour: React.FC<StepFourProps> = ({ formData, setFormData, nextStep, prevStep }) => {
    const [fileMessage, setFileMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileMessage('');
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setFileMessage("Xatolik: Fayl hajmi 5MB dan oshmasligi kerak!");
                setFormData(prev => ({ ...prev, articleFile: null }));
                return;
            }
        }
        setFormData(prev => ({ ...prev, articleFile: file }));
    };

    return (
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: 'grey.50' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>4. Qo'lyozmani Yuklash</Typography>

            <Paper
                variant="outlined"
                sx={{
                    p: 4,
                    mb: 3,
                    textAlign: 'center',
                    borderStyle: 'dashed',
                    borderColor: 'primary.main',
                    cursor: 'pointer',
                    bgcolor: 'white'
                }}
            >
                <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                    <Typography color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                        Maqola faylini tanlang (.pdf yoki .docx)
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Faqat 5MB dan kichik PDF yoki DOCX fayllarni yuklang.
                    </Typography>
                </label>

                {formData.articleFile && (
                    <Box mt={2}>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: 'success.main' }}>
                            Yuklandi: {formData.articleFile.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
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

            <Box display="flex" justifyContent="space-between" mt={4}>
                <Button variant="outlined" onClick={prevStep} sx={{ borderRadius: 2 }}>
                    Orqaga
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={nextStep}
                    disabled={!formData.articleFile}
                    sx={{ borderRadius: 2, py: 1.5, px: 4 }}
                >
                    Keyingi bosqich
                </Button>
            </Box>
        </Box>
    );
};

const StepFive: React.FC<StepFiveProps> = ({ formData, submitForm, prevStep }) => {
    const [isConfirmed, setIsConfirmed] = useState(false);

    return (
        <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: 'grey.50' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>5. Yakuniy Ko'rik va Yuborish</Typography>

            <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: 'white' }}>
                <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 600 }}>Kiritilgan Ma'lumotlar Xulosasi:</Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    fontSize: '0.9rem'
                }}>
                    <Box><Typography><strong>Sarlavha:</strong> {formData.titleUz}</Typography></Box>
                    <Box><Typography><strong>Muallif:</strong> {formData.authorName} ({formData.authorEmail})</Typography></Box>
                    <Box><Typography><strong>Tel/Til:</strong> {formData.authorPhone || '—'} / {formData.articleLanguage.toUpperCase()}</Typography></Box>
                    <Box><Typography><strong>Kalit So'zlar:</strong> {formData.keywords}</Typography></Box>
                    <Box><Typography><strong>Fayl Nomi:</strong> {formData.articleFile?.name || 'Mavjud emas'}</Typography></Box>
                </Box>

                <Box mt={2} p={2} bgcolor="grey.100" borderRadius={1}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>Abstrakt:</Typography>
                    <Typography variant="body2" fontStyle="italic">{formData.abstract}</Typography>
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
                        Men yuqoridagi ma'lumotlar to'g'ri ekanligini tasdiqlayman va uni yuborishga rozilik bildiraman.
                    </Typography>
                }
                sx={{ mb: 3 }}
            />

            <Box display="flex" justifyContent="space-between" mt={4}>
                <Button variant="outlined" onClick={prevStep} sx={{ borderRadius: 2 }}>
                    Orqaga
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => submitForm(formData)}
                    disabled={!isConfirmed}
                    sx={{ borderRadius: 2, py: 1.5, px: 4, fontWeight: 700 }}
                >
                    Jo'natish
                </Button>
            </Box>
        </Box>
    );
};

// --- Muvaffaqiyat Xabari Sahifasi ---
const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ goBack, formData }) => (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Paper elevation={5} sx={{ p: 6, borderRadius: 3, backgroundColor: '#e8f5e9' }}>
            <Typography variant="h3" color="success.main" sx={{ mb: 3, fontWeight: 700 }}>
                ✓ Muvaffaqiyatli Yuborildi!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
                Hurmatli <strong>{formData.authorName}</strong>, maqolangiz (Sarlavha: <strong>{formData.titleUz}</strong>) tizim orqali muvaffaqiyatli qabul qilindi.
            </Typography>
            <Box mb={4} p={3} bgcolor="#fff" borderRadius={2} textAlign="left">
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontWeight: 600 }}>
                    SIMULYATSIYA XULOSASI:
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Ma'lumotlar botga yuborildi.
                </Typography>
                <Typography variant="body2">
                    Mas'ul xodim tez orada <strong>{formData.authorEmail}</strong> orqali siz bilan bog'lanadi.
                </Typography>
            </Box>

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={goBack}
                sx={{ borderRadius: 2, py: 1.5, px: 4, mt: 2 }}
            >
                Asosiy Yoʻriqnomaga Qaytish
            </Button>
        </Paper>
    </Container>
);

// ====================================================================
// Telegram yuborish: text + (agar mavjud bo'lsa) fayl
// ====================================================================
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
            // sendDocument with multipart/form-data (file + caption)
            const form = new FormData();
            form.append('chat_id', TELEGRAM_CHAT_ID);
            // 'document' field: append File object
            form.append('document', data.articleFile, data.articleFile.name);
            // caption (Telegram limits length) — pass message as caption
            form.append('caption', message);
            // Use parse_mode via query param (can't set in multipart easily), so use sendDocument?caption and parse_mode may work via form field 'parse_mode'
            form.append('parse_mode', 'Markdown');

            const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
                method: 'POST',
                body: form
            });

            if (!res.ok) {
                // fallback: send message only
                console.error('sendDocument failed, fallback to sendMessage', await res.text());
                await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' })
                });
            }
        } else {
            // If no file, send simple message
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' })
            });
        }
        console.log('✅ Telegramga yuborildi');
    } catch (err) {
        console.error('❌ Telegramga yuborishda xatolik:', err);
    }
};

// ====================================================================
// SUBMISSION FORM CONTAINER (dizayn: sidebar + content)
// ====================================================================
const SubmissionFormContainer: React.FC<SubmissionFormContainerProps> = ({ goBack }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleChange = useCallback((e: ChangeEventType) => {
        // handle both TextField/Checkbox and SelectChangeEvent
        if ((e as SelectChangeEvent<string>).target && 'value' in (e as SelectChangeEvent<string>).target && (e as SelectChangeEvent<string>).target.name) {
            const ev = e as SelectChangeEvent<string>;
            const name = ev.target.name as keyof FormData;
            const value = ev.target.value as FormData[keyof FormData];
            setFormData(prev => ({ ...prev, [name]: value }));
            return;
        }

        const ev = e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
        const name = ev.target.name as keyof FormData;
        if (!name) return;

        if (ev.target.type === 'checkbox') {
            const checkedValue = (ev.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checkedValue as FormData[keyof FormData] }));
        } else {
            const inputValue = ev.target.value;
            setFormData(prev => ({ ...prev, [name]: inputValue as FormData[keyof FormData] }));
        }
    }, []);

    const nextStep = () => setActiveStep(prev => prev + 1);
    const prevStep = () => setActiveStep(prev => Math.max(0, prev - 1));

    const submitForm = async (data: FormData) => {
        setIsSending(true);
        await sendToTelegram(data);
        setIsSending(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return <SubmissionSuccess goBack={goBack} formData={formData} />;
    }

    const stepsContent = [
        <StepOne key={0} formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />,
        <StepTwo key={1} formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />,
        <StepThree key={2} formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />,
        <StepFour key={3} formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />,
        <StepFive
            key={4}
            formData={formData}
            submitForm={submitForm}
            prevStep={prevStep}
            nextStep={nextStep}
        />

    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h1" fontWeight={700} color="primary">
                    Maqola Yuborish Formasi
                </Typography>
                <Button
                    variant="outlined"
                    onClick={goBack}
                    startIcon={<span style={{ transform: 'scaleX(-1)' }}>→</span>}
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                >
                    Yoʻriqnomaga Qaytish
                </Button>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4
            }}>
                <Box sx={{ width: { xs: '100%', md: '25%' } }}>
                    <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {SUBMISSION_STEPS.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Paper>
                </Box>

                <Box sx={{ flexGrow: 1, width: { xs: '100%', md: '75%' } }}>
                    {isSending ? (
                        <Paper sx={{ p: 6, textAlign: 'center' }}>
                            <Typography variant="h6">Jo'natilyapti... Iltimos kuting</Typography>
                        </Paper>
                    ) : (
                        stepsContent[activeStep]
                    )}
                </Box>
            </Box>
        </Container>
    );
};

// ====================================================================
// ASOSIY ForAuthors (avvalgi dizayn saqlangan)
// ====================================================================
const ForAuthors: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (isSubmitting) {
        return <SubmissionFormContainer goBack={() => setIsSubmitting(false)} />;
    }

    const submissionSteps = [
        "Jurnal doirasi va qoidalarini ko'rib chiqish",
        "Qo'lyozmani talablarga muvofiq tayyorlash",
        "Maqolani onlayn tizim orqali yuborish (Mock)",
        "Taqriz (Peer Review) jarayoni",
        "Qabul qilish va nashr etish",
    ];

    const requirements = [
        { rule: 'Formatlash', desc: "Shrift: Times New Roman, Hajmi 12, 1.5 qator oralig'i." },
        { rule: 'Annotatsiya', desc: "250 so'zdan oshmasligi kerak, tuzilishi (Maqsadi, Usullari, Natijalari, Xulosa)." },
        { rule: 'Adabiyotlar', desc: "APA yoki Vancouver uslubiga rioya qilish shart (Qaysi birini aniqlang)." },
        { rule: "O'ziga xoslik", desc: "Plagiat tekshiruvi (O'xshashlik indeksi 15% dan kam bo'lishi shart)." },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage="Mualliflar uchun" />
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
                Mualliflar uchun Yoʻriqnomalar
            </Typography>

            <Paper elevation={4} sx={{ p: 4, mb: 4, backgroundColor: '#f5f5f5', borderLeft: '5px solid', borderColor: 'secondary.main' }}>
                <Typography variant="h5" color="textPrimary" sx={{ mb: 2, fontWeight: 700 }}>
                    Maqolangizni Chop Ettiring!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Yosh tadqiqotchilar va olimlar uchun maqolani tez va oson yuborish tizimi. 5 bosqichli oddiy jarayonni boshlash uchun quyidagi tugmani bosing.
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => setIsSubmitting(true)}
                    sx={{
                        borderRadius: '15px',
                        fontWeight: 700,
                        py: 1.5,
                        px: 4,
                        boxShadow: '0 4px 15px rgba(255, 204, 0, 0.4)'
                    }}
                >
                    Maqolani Yuborishni Boshlash
                </Button>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 600 }}>
                    Maqola Yuborish Jarayoni
                </Typography>

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

            <Box sx={{ mt: 4, p: 3, border: '1px solid #FFCC00', borderRadius: 2, backgroundColor: '#FFFBEA' }}>
                <Typography variant="h6" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                    Yordam kerakmi?
                </Typography>
                <Typography variant="body1">
                    Yuborish yoki taqriz jarayoni bo'yicha har qanday savollar yuzasidan Mas'ul xodimga murojaat qiling:
                    <a href="mailto:uktamjon@urdu.uz" style={{ marginLeft: '8px', color: '#004A99' }}>
                        uktamjon@urdu.uz
                    </a>
                </Typography>
            </Box>
        </Container>
    );
};

export default ForAuthors;
