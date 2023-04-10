import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '../helpers/rootRouter';


const App = () => {
    return (
        <main>
            <RouterProvider router={router} />
            <h1 className="text-3xl font-bold underline">
                Tailwind css working
            </h1>
        </main>
    );
}

export default App