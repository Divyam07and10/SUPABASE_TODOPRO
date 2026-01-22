'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authService } from '@/services/auth/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, clearAuth } from '@/store/slices/authSlice';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const { user, session } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const init = async () => {
            const id = user?.id || session?.user?.id;
            if (id) {
                const profile = await authService.getUserProfile(id, session?.access_token, user || session?.user);
                if (profile) dispatch(setAuth({ user: profile, session }));
                else dispatch(clearAuth());
            }
            setLoading(false);
        };
        init();
    }, [dispatch]);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const data = await authService.login(email, password);
            if (data.access_token) {
                const profile = await authService.getUserProfile(data.user?.id, data.access_token, data.user);
                if (profile) {
                    dispatch(setAuth({ user: profile, session: data }));
                    toast.success('Login successful!');
                    router.push('/');
                    return;
                }
            }
            throw new Error();
        } catch (e) {
            toast.error(e.response?.data?.error_description || e.response?.data?.msg || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password, profileData) => {
        try {
            setLoading(true);
            const data = await authService.register(email, password, profileData);
            if (data.access_token) {
                const profile = await authService.getUserProfile(data.user?.id, data.access_token, data.user);
                if (profile) {
                    dispatch(setAuth({ user: profile, session: data }));
                    toast.success('Registration successful!');
                    router.push('/');
                    return;
                }
            } else if (data.user) {
                toast.success('Registration successful! Please verify your email.');
                router.push('/login');
            }
        } catch (e) {
            toast.error(e.response?.data?.error_description || e.response?.data?.msg || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        dispatch(clearAuth());
        router.push('/login');
        toast.info('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
