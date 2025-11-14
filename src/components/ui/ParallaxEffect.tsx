import React from 'react';
import { Box } from '@mui/material';

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
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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