import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
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

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs
                currentPage={`Jurnal soni: ${issue.number}`}
                parentPage={{ name: "Arxiv", path: "/issues" }}
            />
            <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
                <CurrentIssue />
            </Box>
        </Container>
    );
};

export default IssueDetail;