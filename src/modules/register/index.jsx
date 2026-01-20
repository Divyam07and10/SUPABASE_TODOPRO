'use client';

import React from 'react';
import RegisterView from './view';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

export default function RegisterContainer() {
    const { register, loading } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const name = data.get('name');
        const phone_no = data.get('phone_no');
        const gender = data.get('gender');

        if (!email || !password || !name) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        await register(email, password, { name, phone_no, gender });
    };

    return <RegisterView loading={loading} onSubmit={handleSubmit} />;
}
