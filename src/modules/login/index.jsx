'use client';

import React from 'react';
import LoginView from './view';
import { useAuth } from '@/shared/context/AuthContext';

export default function LoginContainer() {
    const { login, loading } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        if (email && password) {
            await login(email, password);
        }
    };

    return <LoginView loading={loading} onSubmit={handleSubmit} />;
}
