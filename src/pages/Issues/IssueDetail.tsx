// src/pages/Issues/IssueDetail.tsx (Yangi sahifa: Maqolalar ro'yxati)
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Paper, Divider, Button, Chip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { MOCK_ISSUES } from '../../utils/mockData';
import CustomBreadcrumbs from '../../components/ui/Breadcrumbs';

type Article = {
    id: number;
    title: string;
    authors?: string;
    abstract?: string;
    doi?: string;
    pageRange?: string;
    pdfLink?: string;
    keywords?: string[];
};

type Issue = {
    id: number;
    number: number | string;
    year?: number | string;
    publishedDate?: string;
    coverImage?: string;
    pdfLink?: string;
    seriesName?: string;
    series?: string;
    articles?: Article[];
};

const IssueDetail: React.FC = () => {
    const { issueId } = useParams<{ issueId?: string }>();
    const issue = (MOCK_ISSUES as Issue[]).find((i) => i.id === Number(issueId));

    if (!issue) {
        return (
            <Container maxWidth="lg" sx={{ py: 4, minHeight: '50vh' }}>
                <Typography variant="h5" color="error" align="center">Issue not found.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <CustomBreadcrumbs currentPage={`Issue ${issue.number}`} parentPage={{ name: "Issues Archive", path: "/issues" }} />

            <Typography variant="h4" component="h1" gutterBottom>
                Issue Content: {issue.number}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                Volume {issue.year} - Published: {issue.publishedDate}
            </Typography>

            {/* Muqova va asosiy ma'lumotlar (Box/Flex) */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 4, alignItems: 'flex-start' }}>

                {/* Chap ustun: Muqova (md=3 ga mos) */}
                <Box sx={{ width: { xs: '100%', sm: '33.3333%' }, flexShrink: 0 }}>
                    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                        <img
                            src={issue.coverImage}
                            alt={`Cover of Issue ${issue.number}`}
                            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
                        />
                        <Button
                            component="a"
                            variant="contained"
                            color="primary"
                            startIcon={<DownloadIcon />}
                            href={issue.pdfLink ?? undefined}
                            target="_blank"
                            fullWidth
                            sx={{ mt: 2, fontWeight: 600 }}
                        >
                            Download Full Issue PDF
                        </Button>
                    </Paper>
                </Box>

                {/* O'ng ustun: Umumiy ma'lumot (md=9 ga mos) */}
                <Box sx={{ width: { xs: '100%', sm: 'calc(66.6667% - 16px)' }, flexGrow: 1 }}>
                    <Paper elevation={1} sx={{ p: 4, height: '100%' }}>
                        <Typography variant="h5" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
                            {issue.seriesName}
                        </Typography>
                        <Typography variant="body1">
                            \*\*Series Code:\*\* {issue.series}
                        </Typography>
                        <Typography variant="body1">
                            \*\*Total Articles:\*\* {issue.articles?.length ?? 0}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
                            "This issue brings together leading research in {issue.seriesName?.toLowerCase()}."
                        </Typography>
                    </Paper>
                </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Maqolalar ro'yxati */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, borderLeft: '5px solid', pl: 2, borderColor: 'secondary.main' }}>
                Articles in this Issue
            </Typography>

            <Box>
                {issue.articles?.map((article: Article, index: number) => (
                    <Paper key={article.id} elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 0.5 }}>
                            {article.pageRange} | DOI: {article.doi}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 600, lineHeight: 1.4, mb: 1 }}>
                            {index + 1}. {article.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1.5, fontStyle: 'italic' }}>
                            \*\*Authors:\*\* {article.authors}
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 2 }}>
                            \*\*Abstract:\*\* {article.abstract ? `${article.abstract.substring(0, 150)}...` : ''}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {article.keywords?.map((keyword: string) => (
                                <Chip key={`${article.id}-${keyword}`} label={keyword} size="small" color="default" variant="outlined" />
                            ))}
                        </Box>

                        <Button
                            component="a"
                            variant="text"
                            size="small"
                            href={article.pdfLink ?? undefined}
                            target="_blank"
                            startIcon={<DownloadIcon />}
                            sx={{ fontWeight: 600 }}
                        >
                            Download Article PDF
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ ml: 2, fontWeight: 600 }}
                            component={Link}
                            to={`/articles/${article.id}`}
                        >
                            View Details
                        </Button>
                    </Paper>
                ))}
            </Box>
        </Container>
    );
};

export default IssueDetail;