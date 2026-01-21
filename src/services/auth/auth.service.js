import axiosInstance from '../api/axios';

export const authService = {
    getUserProfile: async (userId, accessToken = null) => {
        if (userId) {
            try {
                const config = {};
                if (accessToken) {
                    config.headers = { Authorization: `Bearer ${accessToken}` };
                }
                const { data: profiles } = await axiosInstance.get(`/rest/v1/profiles?id=eq.${userId}`, config);

                if (profiles && profiles.length > 0) {
                    const profile = profiles[0];
                    return {
                        id: profile.id,
                        email: profile.email,
                        profile,
                    };
                }
            } catch (error) {
                console.error('Profile fetch failed', error);
            }
        }
        return null;
    },

    login: async (email, password) => {
        const { data } = await axiosInstance.post('/auth/v1/token?grant_type=password', {
            email,
            password,
        });
        return data;
    },

    register: async (email, password, profileData) => {
        const { data } = await axiosInstance.post('/auth/v1/signup', {
            email,
            password,
        });

        if (data.user && data.access_token && profileData) {
            try {
                await axiosInstance.post(
                    '/rest/v1/profiles',
                    {
                        id: data.user.id,
                        email: email,
                        name: profileData.name,
                        phone_no: profileData.phone_no || null,
                        gender: profileData.gender || null,
                        password_hash: 'managed_by_supabase_auth',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${data.access_token}`,
                        },
                    }
                );
            } catch (error) {
                console.error('Profile creation failed', error);
            }
        }

        return data;
    },

    logout: async () => {
        const { data } = await axiosInstance.post('/auth/v1/logout');
        return data;
    },

    getProfile: async (id) => {
        const { data } = await axiosInstance.get(`/rest/v1/profiles?id=eq.${id}`);
        if (data && data.length > 0) {
            return data[0];
        }
        throw new Error('Profile not found');
    },

    updateProfile: async (id, updates) => {
        const { data } = await axiosInstance.patch(`/rest/v1/profiles?id=eq.${id}`, updates);
        if (data && data.length > 0) {
            return data[0];
        }
        throw new Error('Failed to update profile');
    },
};

