// src/components/articles/ArticleCard.tsx (Optimallashtirilgan)
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import type {Issue} from "../../types";

interface ArticleCardProps {
    issue: Issue;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ issue }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                maxWidth: 300,
                padding: 2,
                margin: 'auto',
                transition: 'transform 0.3s, box-shadow 0.3s',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                }
            }}
            elevation={3}
        >
            {/* Vertikal rasm konteyneri */}
            <Box
                sx={{
                    width: '100%',
                    height: 420,
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: theme.palette.grey[100],
                    borderBottom: `1px solid ${theme.palette.grey[300]}`,
                }}
            >
                <CardMedia
                    component="img"
                    image={'/img_1.png'}
                    alt={`${issue.number}-son muqovasi`}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
            </Box>

            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                <Box>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 600, color: 'primary.main', minHeight: 48 }}
                    >
                        {`Jild ${issue.year}, Son ${issue.number}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '1rem' }}>
                        Seriyasi: {issue.seriesName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Nashr qilingan: {issue.publishedDate}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    component={Link}
                    to={`/issues/${issue.id}`}
                    sx={{ fontWeight: 700 }}
                >
                    Maqolalarni ko'rish
                </Button>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;
