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
                <h1 className="text-3xl font-bold underline">
                Tailwind css working
                </h1>
            </ThemeProvider>
        </main>
    );
}

export default App