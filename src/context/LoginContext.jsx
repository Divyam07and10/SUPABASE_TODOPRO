'use client';

import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '@/shared/context/AuthContext';

const LoginContext = createContext(undefined);

export const LoginProvider = ({ children }) => {
    const { login, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        if (email && password) {
            await login(email, password);
        }
    };

    return (
        <LoginContext.Provider value={{
            loading,
            showPassword,
            togglePasswordVisibility,
            handleLogin
        }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) throw new Error('useLogin must be used within a LoginProvider');
    return context;
};
