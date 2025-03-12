// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2563eb', // Azul profesional
            light: '#60a5fa',
            dark: '#1e40af',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#7c3aed', // Púrpura distintivo
            light: '#a78bfa',
            dark: '#5b21b6',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        error: {
            main: '#dc2626',
        },
        success: {
            main: '#16a34a',
        },
        info: {
            main: '#0284c7',
        },
        warning: {
            main: '#ea580c',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 16px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                },
                contained: {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                },
                elevation1: {
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                },
                elevation2: {
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f8fafc',
                    '& .MuiTableCell-root': {
                        fontWeight: 600,
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.04) !important',
                    },
                },
            },
        },
    },
});

export default theme;
