import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '../helpers/rootRouter';
import { ThemeProvider } from '@emotion/react';
import theme from '../helpers/theme';


const App = () => {
    return (
        <main>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </main>
    );
}

export default App