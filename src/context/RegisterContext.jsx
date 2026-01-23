'use client';

import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '@/shared/context/AuthContext';
import { toast } from 'react-toastify';

const RegisterContext = createContext(undefined);

export const RegisterProvider = ({ children }) => {
    const { register, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

    const handleRegister = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');
        const name = data.get('name');
        const phone_no = data.get('phone_no');
        const gender = data.get('gender');

        if (!email || !password || !name) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        if (!passwordRegex.test(password)) {
            toast.error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            return;
        }

        if (password !== confirmPassword) {
            setFormErrors({ confirmPassword: 'Passwords do not match' });
            return;
        }

        setFormErrors({});
        await register(email, password, { name, phone_no, gender });
    };

    return (
        <RegisterContext.Provider value={{
            loading,
            showPassword,
            showConfirmPassword,
            termsAccepted,
            formErrors,
            togglePasswordVisibility,
            toggleConfirmPasswordVisibility,
            setTerms: setTermsAccepted,
            handleRegister
        }}>
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = () => {
    const context = useContext(RegisterContext);
    if (!context) throw new Error('useRegister must be used within a RegisterProvider');
    return context;
};