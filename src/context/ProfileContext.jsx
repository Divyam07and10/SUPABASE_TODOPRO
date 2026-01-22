'use client';

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { useAuth } from '@/shared/context/AuthContext';
import { useTodo } from '@/shared/context/TodoContext';
import { authService } from '@/services/auth/auth.service';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const ProfileContext = createContext(undefined);

export const ProfileProvider = ({ children }) => {
    const { user, syncUserProfile } = useAuth();
    const { todos } = useTodo();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const loadProfile = useCallback(async () => {
        if (!user) {
            setProfile(null);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const profileData = await authService.getProfile(user.id);
            setProfile(profileData || {
                id: user.id,
                email: user.email,
                name: '',
            });
        } catch {
            if (user) {
                setProfile({
                    id: user.id,
                    email: user.email,
                    name: '',
                });
            }
        } finally {
            setLoading(false);
        }
    }, [user]);

    const handleEditClick = () => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                phone_no: profile.phone_no || '',
                gender: profile.gender || '',
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (updates) => {
        if (!user) return;
        try {
            setSaving(true);
            const updated = await authService.updateProfile(user.id, updates);
            setProfile(updated);
            syncUserProfile(updated);
            toast.success('Profile updated successfully');
        } catch {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await handleSave(formData);
        setOpen(false);
    };

    const stats = useMemo(() => {
        const total = todos?.length || 0;
        const completed = todos?.filter(t => t.is_complete || t.status === 'completed').length || 0;
        const delayed = todos?.filter(t => t.status === 'delayed').length || 0;
        const pending = total - completed - delayed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { total, completed, pending, delayed, completionRate };
    }, [todos]);

    const joinDate = useMemo(() => {
        const source = profile?.created_at || user?.created_at;
        return source ? format(new Date(source), 'MMM d, yyyy • h:mm a') : 'recently';
    }, [profile, user]);

    const value = {
        profile,
        loading,
        saving,
        todos,
        stats,
        joinDate,
        open,
        formData,
        loadProfile,
        handleEditClick,
        handleClose,
        handleFormChange,
        handleFormSubmit,
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const ctx = useContext(ProfileContext);
    if (!ctx) throw new Error('useProfile must be used within a ProfileProvider');
    return ctx;
};
