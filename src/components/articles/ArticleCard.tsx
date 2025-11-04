// src/components/articles/ArticleCard.tsx

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import type {Issue} from "../../types";

interface ArticleCardProps {
    issue: Issue;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ issue }) => {
    useTheme();
    return (
        <Card
            sx={{
                maxWidth: 345,
                height: '100%',
                margin: 'auto',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                }
            }}
            elevation={3}
        >
            <CardMedia
                component="img"
                height="200"
                image={issue.coverImage} // Mock rasmdan olinadi
                alt={`Cover of Issue ${issue.number}`}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 600, color: 'primary.main', minHeight: 50 }}
                    >
                        {`Volume ${issue.year}, ${issue.number}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        **Series:** {issue.seriesName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        **Published:** {issue.publishedDate}
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
                    View Articles
                </Button>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;