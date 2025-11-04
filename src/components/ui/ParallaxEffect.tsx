// src/components/ui/ParallaxEffect.tsx

import React from 'react';
import { Box } from '@mui/material';

// Haqiqiy Parallax uchun 'react-scroll-parallax' kabi kutubxona kerak,
// ammo biz hozir MUI bilan oddiy vizual effekt yaratamiz.

interface ParallaxProps {
    children: React.ReactNode;
    backgroundImage: string;
    height?: string;
}

const ParallaxEffect: React.FC<ParallaxProps> = ({ children, backgroundImage, height = '45vh' }) => {
    return (
        <Box
            sx={{
                height: height,
                backgroundImage: `url(${backgroundImage})`,
                backgroundAttachment: 'fixed', // Parallax effektining asosiy xossasi
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                // Overlay qo'shish (Matnni o'qish uchun)
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // To'q rangli overlay
                },
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                {children}
            </Box>
        </Box>
    );
};

export default ParallaxEffect;