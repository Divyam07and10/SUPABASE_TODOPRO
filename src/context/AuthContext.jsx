'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authService } from '@/services/auth/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, clearAuth } from '@/store/slices/authSlice';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const { user: reduxUser, session: reduxSession } = useSelector((state) => state.auth);
    const [user, setUser] = useState(reduxUser);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeAuth = async () => {
            const userId = reduxUser?.id || reduxSession?.user?.id;
            if (userId) {
                // Optional: Verify session with server or just trust persisted state
                // For robustness, let's fetch fresh profile
                const fetchedUser = await authService.getUserProfile(userId);
                if (fetchedUser) {
                    setUser(fetchedUser);
                    // Update Redux with fresh profile if needed, or just ensure consistency
                    if (JSON.stringify(fetchedUser) !== JSON.stringify(reduxUser)) {
                        dispatch(setAuth({ user: fetchedUser, session: reduxSession }));
                    }
                } else {
                    // Session invalid or profile missing
                    dispatch(clearAuth());
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };
        initializeAuth();
    }, [dispatch, reduxUser?.id, reduxSession?.user?.id]); // Depend on Redux state changes

    const login = async (email, password) => {
        try {
            setLoading(true);
            const data = await authService.login(email, password);

            if (data.access_token) {
                // No manual localStorage setItem here. Redux persist handles it.
                // We just need to get the profile.
                // But wait, authService.login returns session, not profile (usually).
                // We need to fetch profile after login? `data.user.id` is in session.

                const userId = data.user?.id;
                const fetchedUser = await authService.getUserProfile(userId, data.access_token);

                if (fetchedUser) {
                    setUser(fetchedUser);
                    dispatch(setAuth({ user: fetchedUser, session: data }));
                    toast.success('Login successful!');
                    router.push('/');
                } else {
                    authService.logout();
                    setUser(null);
                    dispatch(clearAuth());
                    toast.error('Login failed: user profile not found');
                }
            }
        } catch (error) {
            console.error('Login error', error);
            toast.error('Login failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password, profileData) => {
        try {
            setLoading(true);
            const data = await authService.register(email, password, profileData);

            if (data.access_token) {
                const userId = data.user?.id;
                const fetchedUser = await authService.getUserProfile(userId, data.access_token);

                if (fetchedUser) {
                    setUser(fetchedUser);
                    dispatch(setAuth({ user: fetchedUser, session: data }));
                    toast.success('Registration successful!');
                    router.push('/');
                } else {
                    authService.logout();
                    setUser(null);
                    dispatch(clearAuth());
                    toast.error('Registration failed: user profile not created');
                }
            } else if (data.user) {
                toast.success('Registration successful! Please check your email to confirm.');
                router.push('/login');
            }

        } catch (error) {
            console.error('Registration error', error);
            toast.error('Registration failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
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
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
