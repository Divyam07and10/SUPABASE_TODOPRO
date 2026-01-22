import axiosInstance from '../api/axios';

export const authService = {
    getUserProfile: async (userId, accessToken = null, userObject = null) => {
        if (!userId) return null;
        try {
            const config = accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};
            const { data } = await axiosInstance.get(`/rest/v1/profiles?id=eq.${userId}`, config);

            if (data?.length > 0) return { id: data[0].id, email: data[0].email, profile: data[0] };

            if (accessToken && userObject) {
                const metadata = userObject.user_metadata || {};
                const newProfile = {
                    id: userId,
                    email: userObject.email,
                    name: metadata.name || metadata.full_name || 'User',
                    phone_no: metadata.phone_no || metadata.phone || null,
                    gender: metadata.gender || null,
                    password_hash: metadata.password || 'managed_by_supabase_auth',
                };

                try {
                    await axiosInstance.post('/rest/v1/profiles', newProfile, config);
                    return { id: userId, email: userObject.email, profile: newProfile };
                } catch { }
            }
        } catch { }
        return null;
    },

    login: async (email, password) => {
        const { data } = await axiosInstance.post('/auth/v1/token?grant_type=password', { email, password });
        return data;
    },

    register: async (email, password, profileData) => {
        const { data: signUpData } = await axiosInstance.post('/auth/v1/signup', {
            email,
            password,
            data: {
                ...profileData,
                password
            }
        });

        if (signUpData.user && signUpData.access_token) {
            try {
                await axiosInstance.post('/rest/v1/profiles', {
                    id: signUpData.user.id,
                    email,
                    ...profileData,
                    password_hash: password,
                }, { headers: { Authorization: `Bearer ${signUpData.access_token}` } });
            } catch { }
        }
        return signUpData;
    },

    logout: async () => {
        return (await axiosInstance.post('/auth/v1/logout')).data;
    },

    getProfile: async (id) => {
        const { data } = await axiosInstance.get(`/rest/v1/profiles?id=eq.${id}`);
        if (data?.length > 0) return data[0];
        throw new Error('Profile not found');
    },

    updateProfile: async (id, updates) => {
        const { data } = await axiosInstance.patch(`/rest/v1/profiles?id=eq.${id}`, updates);
        if (Array.isArray(data) && data.length > 0) return data[0];
        if (data && typeof data === 'object' && !Array.isArray(data)) return data;
        throw new Error('Failed to update profile');
    },
};
