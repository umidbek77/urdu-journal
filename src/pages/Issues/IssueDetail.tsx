import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Paper, Divider, Button, Alert } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PdfViewerModal from '../../components/ui/PdfViewerModal';
import CurrentIssue from './CurrentIssue';


const MOCK_ISSUES = [
    {
        id: 1,
        number: '2025/1',
        year: 2025,
        publishedDate: '2025-01-15',
        seriesName: 'Axborot texnologiyalari va raqamli iqtisodiyot',
        series: 'ITR-2025-01',
        coverImage: '/img_1.png',
        pdfLink: '/public/pdfs/xorazm-jurnali-2025-1.pdf', 
        articles: [
            { 
                id: 101, 
                title: "Blokcheyn asosidagi ma'lumotlar xavfsizligi", 
                authors: "Aliyev K.N., Valiyeva G.S.", 
                abstract: "Maqolada blokcheyn texnologiyasi orqali ma'lumotlar himoyasini kuchaytirish usullari ko'rib chiqilgan...", 
                pageRange: '3-15', 
                doi: '10.5281/zenodo.123456', 
                keywords: ['Blokcheyn', 'Xavfsizlik', 'Kriptografiya'], 
                pdfLink: '/articles/article-101.pdf'
            },
            { 
                id: 102, 
                title: "Sun'iy intellektning ta'lim jarayoniga integratsiyasi", 
                authors: "Zokirov A.U.", 
                abstract: "AI asboblarining o'qitish metodlariga ta'sirini o'rganish va samaradorligini baholash.", 
                pageRange: '16-28', 
                doi: '10.5281/zenodo.123457', 
                keywords: ['AI', "Ta'lim", 'Integratsiya', 'E-Learning'], 
                pdfLink: '#'
            },
        ],
    },
];


interface BreadcrumbProps {
    currentPage: string;
    parentPage?: { name: string; path: string };
}

const CustomBreadcrumbs: React.FC<BreadcrumbProps> = ({ currentPage, parentPage }) => (
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 600, fontSize: 17 }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
        {' / '}
        {parentPage && (
            <>
                <Link to={parentPage.path} style={{ color: 'inherit', textDecoration: 'none' }}>{parentPage.name}</Link>
                {' / '}
            </>
        )}
        {currentPage}
    </Typography>
);

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

const IssueDetail: React.FC = () => {
    const { issueId } = useParams<{ issueId?: string }>();
    const issue: Issue | undefined = MOCK_ISSUES.find(i => i.id === Number(issueId));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const handleOpenModal = (article: Article) => {
        if (article.pdfLink && article.pdfLink !== '/public/pdfs/xorazm-jurnali-2025-1.pdf') {
            setSelectedArticle(article);
            setIsModalOpen(true);
        } else {
            alert(`"${article.title}" maqolasining PDF ko'rinishi hozircha mavjud emas.`);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedArticle(null);
    };

    if (!issue) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <CustomBreadcrumbs currentPage="Xatolik: Jurnal topilmadi" />
                <Typography variant="h5" color="error" align="center">
                    Jurnal soni topilmadi.
                </Typography>
            </Container>
        );
    }

    const issueFileName = `Xorazm-Jurnali-soni-${issue.number.replace('/', '-')}.pdf`;
    
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs
                currentPage={`Jurnal soni: ${issue.number}`}
                parentPage={{ name: "Arxiv", path: "/issues" }}
            />

            {/* <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, color: '#1A237E' }}>
                Xorazm axborot texnologiyalari jurnali — {issue.number}
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                {issue.year}-yil | Nashr sanasi: {issue.publishedDate}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 5 }}>
                <Box sx={{ width: { xs: '100%', sm: '33%', md: '300px' } }}>
                    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                        <img
                            src={issue.coverImage}
                            alt={`Jurnal muqovasi ${issue.number}`}
                            style={{ 
                                width: '100%', 
                                height: 'auto', 
                                aspectRatio: '1 / 1.4',
                                borderRadius: '6px', 
                                display: 'block' 
                            }}
                        />

                        <Button
                            component="a"
                            variant="contained"
                            fullWidth
                            href={issue.pdfLink ?? undefined}
                            target="_blank"
                            download={issue.pdfLink && issue.pdfLink !== '#' ? issueFileName : undefined}
                            startIcon={<DownloadIcon />}
                            sx={{ 
                                mt: 2, 
                                fontWeight: 600, 
                                bgcolor: '#1A237E', 
                                '&:hover': { bgcolor: '#0D47A1' } 
                            }}
                            disabled={!issue.pdfLink || issue.pdfLink === '#'} 
                        >
                            To‘liq jurnal PDF yuklab olish
                        </Button>
                    </Paper>
                </Box>

                <Box sx={{ flexGrow: 1, width: { xs: '100%', sm: '63%' } }}>
                    <Paper elevation={1} sx={{ p: 4, borderRadius: 2, borderLeft: '5px solid #FFC107' }}>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
                            {issue.seriesName}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Seriya kodi:</strong> {issue.series}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Maqolalar soni:</strong> {issue.articles?.length ?? 0}
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.7, textAlign: 'justify', color: 'text.primary' }}>
                            Ushbu jurnal sonida Xorazm axborot texnologiyalari jurnali tomonidan taqdim etilgan eng so'nggi ilmiy-amaliy tadqiqotlar, innovatsion ishlanmalar va raqamli yechimlar jamlangan. Nashr zamonaviy IT yo‘nalishidagi dolzarb mavzularni yoritadi va tadqiqotchilar hamjamiyatiga xizmat qiladi.
                        </Typography>

                        <Box mt={3} p={2} bgcolor="#F0F8FF" borderRadius={1} border="1px dashed #1A237E">
                            <Typography variant="body2" sx={{ fontWeight: 600, fontSize:16, color: '#1A237E' }}>
                                Maqola talablari:
                            </Typography>
                            <Typography variant="body2" color="text.secondary" fontSize={"15px"}>
                                Maqolalar milliy PhD/DSc standartlariga mos bo‘lishi, Times New Roman shriftida, 11 hajmda va kamida 6 sahifadan iborat bo‘lishi kerak. Tahririyat maqolalarni qisqartirish va tahrir qilish huquqiga ega.
                            </Typography>
                        </Box>
                        
                        <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.7, textAlign: 'justify',fontSize:16 }}>
                            Jurnal tadqiqotchilar va IT sohasidagi mutaxassislarga ilmiy-amaliy manba sifatida xizmat qiladi.
                        </Typography>
                    </Paper>
                </Box>
            </Box> */}
            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
                <CurrentIssue />
            </Box>

            {/* <Divider sx={{ my: 4 }} />

            <Typography
                variant="h5"
                sx={{
                    mb: 4,
                    fontWeight: 700,
                    borderLeft: '6px solid',
                    pl: 2,
                    borderColor: '#FFC107', 
                    color: '#1A237E'
                }}
            >
                Ushbu son tarkibidagi maqolalar ({issue.articles?.length ?? 0})
            </Typography>

            <Box>
                {issue.articles?.length === 0 && (
                    <Alert severity="info">
                        Bu sonda hali maqolalar mavjud emas.
                    </Alert>
                )}
                {issue.articles?.map((article: Article, index: number) => {
                    const articleFileName = `${article.title.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}-ID-${article.id}.pdf`;

                    return (
                        <Paper key={article.id} elevation={2} sx={{ p: 4, mb: 3, borderRadius: 2, borderLeft: '3px solid #1A237E' }}>
                            
                            <Typography variant="h6" color="#1A237E" sx={{ fontWeight: 700, mb: 1 }}>
                                {index + 1}. {article.title}
                            </Typography>
                            

                            <Button
                                component="a"
                                variant="contained"
                                size="small"
                                href={article.pdfLink && article.pdfLink !== '#' ? article.pdfLink : undefined}
                                target="_blank"
                                download={article.pdfLink && article.pdfLink !== '#' ? articleFileName : undefined}
                                startIcon={<DownloadIcon />}
                                sx={{ fontWeight: 600, bgcolor: '#FFC107', color: '#1A237E', '&:hover': { bgcolor: '#FFD740' } }}
                                disabled={!article.pdfLink || article.pdfLink === '#'}
                            >
                                Maqola PDF yuklab olish
                            </Button>

                            <Button
                                variant="outlined"
                                size="small"
                                sx={{ ml: 2, fontWeight: 600, color: '#1A237E', borderColor: '#1A237E' }}
                                onClick={() => handleOpenModal(article)} 
                                disabled={!article.pdfLink || article.pdfLink === '#'} 
                            >
                                Batafsil ko‘rish (Modal)
                            </Button>

                        </Paper>
                    );
                })}
            </Box>

            {isModalOpen && selectedArticle && (
                <PdfViewerModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    pdfUrl={selectedArticle.pdfLink || ''} 
                    title={`Maqola: ${selectedArticle.title}`}
                />
            )} */}
        </Container>
    );
};

export default IssueDetail;