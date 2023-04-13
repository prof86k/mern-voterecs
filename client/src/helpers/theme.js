import { createTheme } from '@mui/material/styles';
import { pink, green, purple } from '@mui/material/colors';

const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        openTitle: '#3f4771',
        protectedTitle: pink['400'],
        type: 'light',
        primary: {
            light: '#42a5f5',
            main: '#1976d2',
            dark: '#1565c0',

        },
        secondary: {
            main: green[900]
        },
        error: {
            main: '#d32f2f',
            light: '#ef5350',
            dark: '#c62828'
        },
        warning: {
            main: '#ed6c02',
            light: '#ff9800',
            dark: '#e65100'
        },
        info: {
            main: '#0288d1',
            light: '#03a9f4',
            dark: '#01579b'
        },
        success: {
            light: '#4caf50',
            main: '#2e7d32',
            dark: '#1b5e20'
        }
    }
});

export default theme;