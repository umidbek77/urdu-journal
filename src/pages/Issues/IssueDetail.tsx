import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Paper, Divider, Button, Chip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { MOCK_ISSUES } from '../../utils/mockData';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';

// ===== TIPLAR =====
interface Article {
    id: number;
    title: string;
    authors: string;
    abstract?: string;
    pageRange?: string;
    doi?: string;
    keywords?: string[];
    pdfLink?: string;
}

interface Issue {
    id: number;
    number: string;
    year: number;
    publishedDate: string;
    seriesName: string;
    series: string;
    coverImage: string;
    pdfLink?: string;
    articles?: Article[];
}

// ===== COMPONENT =====
const IssueDetail: React.FC = () => {
    const { issueId } = useParams<{ issueId?: string }>();
    const issue: Issue | undefined = MOCK_ISSUES.find(i => i.id === Number(issueId));

    if (!issue) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h5" color="error" align="center">
                    Jurnal soni topilmadi.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs
                currentPage={`Jurnal soni: ${issue.number}`}
                parentPage={{ name: "Arxiv", path: "/issues" }}
            />

            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                Xorazm Axborot Texnologiyalari Jurnali — {issue.number}
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                {issue.year}-yil | Nashr sanasi: {issue.publishedDate}
            </Typography>

            {/* Left = Cover image | Right = Info */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 5 }}>
                {/* COVER + PDF DOWNLOAD */}
                <Box sx={{ width: { xs: '100%', sm: '33%' } }}>
                    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                        <img
                            src={issue.coverImage}
                            alt={`Jurnal muqovasi ${issue.number}`}
                            style={{ width: '100%', borderRadius: '6px', display: 'block' }}
                        />

                        <Button
                            component="a"
                            variant="contained"
                            fullWidth
                            href={issue.pdfLink ?? undefined}
                            target="_blank"
                            startIcon={<DownloadIcon />}
                            sx={{ mt: 2, fontWeight: 600 }}
                        >
                            To‘liq jurnal PDF yuklab olish
                        </Button>
                    </Paper>
                </Box>

                {/* INFO ABOUT ISSUE */}
                <Box sx={{ width: { xs: '100%', sm: '63%' } }}>
                    <Paper elevation={1} sx={{ p: 4 }}>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
                            {issue.seriesName}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Seriya kodi:</strong> {issue.series}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Maqolalar soni:</strong> {issue.articles?.length ?? 0}
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.7, textAlign: 'justify' }}>
                            Ushbu jurnal sonida Xorazm viloyati va O‘zbekiston bo‘ylab axborot texnologiyalari sohasidagi ilmiy-amaliy tadqiqotlar, innovatsion ishlanmalar va raqamli yechimlar jamlangan. Nashr zamonaviy IT yo‘nalishidagi dolzarb mavzularni yoritadi va tadqiqotchilar hamjamiyatiga xizmat qiladi.

Maqolalar milliy PhD/DSc standartlariga mos bo‘lishi, Times New Roman shriftida, 11 hajmda va kamida 6 sahifadan iborat bo‘lishi kerak. Tahririyat maqolalarni qisqartirish va tahrir qilish huquqiga ega.

Maqolada quyidagi bo‘limlar mavjud bo‘lishi zarur:

Muallif ma’lumotlari: ism-familiya, lavozim, ilmiy daraja, e-mail va telefon.

Maqola mavzusi: tadqiqot yo‘nalishini ifodalovchi qisqa sarlavha.

Annotatsiya (Abstract): tadqiqot muammosi, metodologiyasi va natijalari qisqacha bayon qilinadi.

Kalit so‘zlar (Keywords): maqola mazmunini ochib beruvchi asosiy so‘zlar.

Kirish (Introduction): tadqiqot muammosi va maqsadlari.

Adabiyotlar tahlili (Literature review): mavzuga oid ilmiy manbalar va ularning tahlili.

Metodologiya (Research Methodology): tadqiqot usullari, dizayni va axborot manbalari.

Foydalanilgan adabiyotlar (References): barcha manbalar ketma-ket raqam bilan ko‘rsatiladi.

Jurnal tadqiqotchilar va IT sohasidagi mutaxassislarga ilmiy-amaliy manba sifatida xizmat qiladi.
                        </Typography>
                    </Paper>
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* ARTICLES */}
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    fontWeight: 700,
                    borderLeft: '6px solid',
                    pl: 2,
                    borderColor: 'secondary.main'
                }}
            >
                Ushbu son tarkibidagi maqolalar
            </Typography>

            <Box>
                {issue.articles?.map((article: Article, index: number) => (
                    <Paper key={article.id} elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                            {article.pageRange} | DOI: {article.doi}
                        </Typography>

                        <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                            {index + 1}. {article.title}
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Mualliflar:</strong> {article.authors}
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 2 }}>
                            <strong>Annotatsiya:</strong>{" "}
                            {article.abstract ? `${article.abstract.substring(0, 200)}...` : ''}
                        </Typography>

                        {/* Keywords */}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                            {article.keywords?.map((k: string) => (
                                <Chip key={k} label={k} size="small" variant="outlined" />
                            ))}
                        </Box>

                        {/* PDF + DETAILS */}
                        <Button
                            component="a"
                            variant="text"
                            size="small"
                            href={article.pdfLink ?? undefined}
                            target="_blank"
                            startIcon={<DownloadIcon />}
                            sx={{ fontWeight: 600 }}
                        >
                            Maqola PDF yuklab olish
                        </Button>

                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ ml: 2, fontWeight: 600 }}
                            component={Link}
                            to={`/articles/${article.id}`}
                        >
                            Batafsil ko‘rish
                        </Button>

                    </Paper>
                ))}
            </Box>

        </Container>
    );
};

export default IssueDetail;
