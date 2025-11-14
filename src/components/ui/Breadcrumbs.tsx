// src/components/ui/Breadcrumbs.tsx

import React from 'react';
import { Breadcrumbs, Typography, Link as MuiLink, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';

interface CustomBreadcrumbsProps {
    currentPage: string;
    parentPage?: { name: string; path: string };
}

const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({ currentPage, parentPage }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <MuiLink
                    component={Link}
                    underline="hover"
                    color="inherit"
                    to="/"
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Home
                </MuiLink>

                {parentPage && (
                    <MuiLink
                        component={Link}
                        underline="hover"
                        color="inherit"
                        to={parentPage.path}
                    >
                        {parentPage.name}
                    </MuiLink>
                )}

                <Typography color="text.primary" sx={{ fontWeight: 600 }}>
                    {currentPage}
                </Typography>
            </Breadcrumbs>
        </Box>
    );
};

export default CustomBreadcrumbs;