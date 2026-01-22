'use client';

import axios from 'axios';
import { store } from '@/store/store';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = store.getState().auth.session?.access_token;
            if (token && !config.url?.startsWith('/auth/v1')) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
