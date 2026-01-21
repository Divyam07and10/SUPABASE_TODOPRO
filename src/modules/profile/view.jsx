'use client';

import React from 'react';
import { Container, Box, CircularProgress, Paper, Divider } from '@mui/material';
import ProfileDetails from '@/components/profile/ProfileDetails';
import ProfileStats from '@/components/profile/ProfileStats';
import RecentActivity from '@/components/profile/RecentActivity';
import EditProfileDialog from '@/components/profile/EditProfileDialog';

export default function ProfileView({
    profile,
    todos,
    stats,
    loading,
    saving,
    joinDate,
    open,
    formData,
    onEditClick,
    onClose,
    onFormChange,
    onFormSubmit
}) {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!profile) return null;

    return (
        <Container component="main" maxWidth="lg">
            <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>

                <ProfileDetails
                    profile={profile}
                    joinDate={joinDate}
                    onEditClick={onEditClick}
                />

                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <ProfileStats stats={stats} />
                    <Divider sx={{ mb: 3 }} />
                    <RecentActivity todos={todos} />
                </Paper>
            </Box>

            <EditProfileDialog
                open={open}
                onClose={onClose}
                formData={formData}
                onFormChange={onFormChange}
                onFormSubmit={onFormSubmit}
                saving={saving}
            />
        </Container>
    );
}
