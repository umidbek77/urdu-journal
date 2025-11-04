// src/main.tsx (Vite default faylini yangilaymiz)

import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router'; // Siz yaratgan Router
import { ThemeProvider, CssBaseline } from '@mui/material'; // MUI uchun
import { theme } from './theme/theme'; // Global tema sozlamalari

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* 1. ThemeProvider: Barcha MUI stilini ta'minlaydi */}
        <ThemeProvider theme={theme}>
            {/* 2. CssBaseline: Browserlarning default stillarini tozalaydi */}
            <CssBaseline />

            {/* 3. Router: Navigatsiyani boshqaradi */}
            <Router />

        </ThemeProvider>
    </React.StrictMode>,
);