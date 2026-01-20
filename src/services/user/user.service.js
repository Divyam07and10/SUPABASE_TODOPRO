import axiosInstance from '../api/axios';

export const userService = {
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
    }
};
