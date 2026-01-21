'use client';

import axios from 'axios';
import { store } from '@/store/store';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const axiosInstance = axios.create({
    baseURL: supabaseUrl,
    headers: {
        'apikey': supabaseKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const state = store.getState();
            const token = state.auth.session?.access_token;
            const isAuthRoute = config.url?.startsWith('/auth/v1');

            if (token && !isAuthRoute) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
