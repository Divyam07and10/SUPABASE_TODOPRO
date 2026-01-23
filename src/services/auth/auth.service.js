import axiosInstance from '../api/axios';

export const authService = {
    getUserProfile: async (userId, accessToken = null, userObject = null) => {
        if (!userId) return null;

        try {
            const config = accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};
            const { data } = await axiosInstance.get(`/rest/v1/profiles?id=eq.${userId}`, config);

            if (data?.length > 0) {
                return { id: data[0].id, email: data[0].email, profile: data[0] };
            }

            if (accessToken && userObject) {
                const metadata = userObject.user_metadata || {};
                const newProfile = {
                    id: userId,
                    email: userObject.email,
                    name: metadata.name || 'User',
                    phone_no: metadata.phone_no || '',
                    gender: metadata.gender || '',
                    password_hash: metadata.password,
                };

                const { data } = await axiosInstance.post('/rest/v1/profiles', newProfile, config);
                return {
                    id: userId,
                    email: userObject.email,
                    profile: Array.isArray(data) && data.length > 0 ? data[0] : newProfile,
                };
            }

            return null;
        } catch (error) {
            throw error;
        }
    },

    login: async (email, password) => {
        try {
            const { data } = await axiosInstance.post('/auth/v1/token?grant_type=password', { email, password });
            return data;
        } catch (error) {
            throw error;
        }
    },

    register: async (email, password, profileData) => {
        try {
            const { data: signUpData } = await axiosInstance.post('/auth/v1/signup', {
                email,
                password,
                data: { ...profileData, password }
            });

            if (signUpData.user && signUpData.access_token) {
                const { data } = await axiosInstance.post('/rest/v1/profiles', {
                    id: signUpData.user.id,
                    email,
                    ...profileData,
                    password_hash: password,
                }, { headers: { Authorization: `Bearer ${signUpData.access_token}` } });

                const profile = Array.isArray(data) && data.length > 0 ? data[0] : data;
                return { ...signUpData, profile };
            }
            return signUpData;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        try {
            const { data } = await axiosInstance.post('/auth/v1/logout');
            return data;
        } catch (error) {
            throw error;
        }
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
