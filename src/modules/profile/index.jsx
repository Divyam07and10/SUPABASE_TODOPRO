'use client';

import React, { useEffect } from 'react';
import ProfileView from './view';
import { useProfile } from '@/context/ProfileContext';

export default function ProfileContainer() {
    const {
        profile,
        todos,
        stats,
        loading,
        saving,
        joinDate,
        open,
        formData,
        loadProfile,
        handleEditClick,
        handleClose,
        handleFormChange,
        handleFormSubmit,
    } = useProfile();

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    return (
        <ProfileView
            profile={profile}
            todos={todos}
            stats={stats}
            loading={loading}
            saving={saving}
            joinDate={joinDate}
            open={open}
            formData={formData}
            onEditClick={handleEditClick}
            onClose={handleClose}
            onFormChange={handleFormChange}
            onFormSubmit={handleFormSubmit}
        />
    );
}
