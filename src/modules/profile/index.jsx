'use client';

import React, { useEffect, useState } from 'react';
import ProfileView from './view';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/user/user.service';
import { todoService } from '@/services/todos/todos.service';
import { toast } from 'react-toastify';

export default function ProfileContainer() {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [todos, setTodos] = useState([]);
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, delayed: 0, completionRate: 0 });

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const [profileData, todosData] = await Promise.all([
                    userService.getProfile(user.id),
                    todoService.fetchTodos(user.id)
                ]);

                setProfile(profileData);
                setTodos(todosData || []);

                // Calculate Stats
                const total = todosData?.length || 0;
                const completed = todosData?.filter(t => t.is_complete || t.status === 'completed').length || 0;
                const delayed = todosData?.filter(t => t.status === 'delayed').length || 0;
                // Pending is everything else not completed or delayed
                const pending = total - completed - delayed;

                const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

                setStats({ total, completed, pending, delayed, completionRate });

            } catch (error) {
                console.error('Error fetching data', error);
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
        };

        fetchData();
    }, [user]);

    const handleSave = async (updates) => {
        if (!user) return;
        try {
            setSaving(true);
            const updated = await userService.updateProfile(user.id, updates);
            setProfile(updated);
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile', error);
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const joinDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'recently';

    return <ProfileView profile={profile} todos={todos} stats={stats} loading={loading} saving={saving} onSave={handleSave} joinDate={joinDate} />;
}
