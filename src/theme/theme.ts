import { createTheme } from '@mui/material/styles';

const PrimaryColor = '#004A99';
const SecondaryColor = '#FFCC00';
const TextDark = '#1A1A1A';
const BackgroundLight = '#F8F9FA';

export const theme = createTheme({
    palette: {
        primary: {
            main: PrimaryColor,
        },
        secondary: {
            main: SecondaryColor,
        },
        background: {
            default: BackgroundLight,
            paper: '#FFFFFF',
        },
        text: {
            primary: TextDark,
            secondary: PrimaryColor,
        },
    },
    typography: {
        fontFamily: ['"Roboto"', '"Arial"', 'sans-serif'].join(','),
        h4: {
            fontWeight: 700,
            color: PrimaryColor,
            marginTop: '1.5rem',
            marginBottom: '1rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    padding: '10px 20px',
                    fontWeight: 600,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                    }
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderBottom: `2px solid ${SecondaryColor}`,
                }
            }
        }
    }
});