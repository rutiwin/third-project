import React, { useState } from 'react';
import AppRoutes from './components/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App: React.FC = () => {
    return (
        <>
            <ToastContainer />
            <AppRoutes />
        </>
    );
};

export default App;