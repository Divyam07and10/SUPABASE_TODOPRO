import axiosInstance from '../api/axios';

export const authService = {
    getUserProfile: async (userId, accessToken = null) => {
        if (!userId) return null;
        try {
            const config = accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};
            const { data } = await axiosInstance.get(`/rest/v1/profiles?id=eq.${userId}`, config);
            if (data?.length > 0) {
                return { id: data[0].id, email: data[0].email, profile: data[0] };
            }
        } catch { }
        return null;
    },

    login: async (email, password) => {
        const { data } = await axiosInstance.post('/auth/v1/token?grant_type=password', { email, password });
        return data;
    },

    register: async (email, password, profileData) => {
        const { data: signUpData } = await axiosInstance.post('/auth/v1/signup', { email, password });
        if (signUpData.user && signUpData.access_token && profileData) {
            try {
                await axiosInstance.post('/rest/v1/profiles', {
                    id: signUpData.user.id,
                    email,
                    name: profileData.name,
                    phone_no: profileData.phone_no || null,
                    gender: profileData.gender || null,
                    password_hash: 'managed_by_supabase_auth',
                }, { headers: { Authorization: `Bearer ${signUpData.access_token}` } });
            } catch { }
        }
        return signUpData;
    },

    logout: async () => {
        const { data } = await axiosInstance.post('/auth/v1/logout');
        return data;
    },

    getProfile: async (id) => {
        const { data } = await axiosInstance.get(`/rest/v1/profiles?id=eq.${id}`);
        if (data?.length > 0) return data[0];
        throw new Error('Profile not found');
    },

    updateProfile: async (id, updates) => {
        const { data } = await axiosInstance.patch(`/rest/v1/profiles?id=eq.${id}`, updates);
        if (data?.length > 0) return data[0];
        throw new Error('Failed to update profile');
    },
};
