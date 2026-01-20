import axiosInstance from '../api/axios';

export const todoService = {
    fetchTodos: async (userId) => {
        const { data } = await axiosInstance.get(`/rest/v1/todos?select=*&user_id=eq.${userId}&order=created_at.desc`);
        return data;
    },

    addTodo: async (todo) => {
        const { data } = await axiosInstance.post('/rest/v1/todos', todo);
        return data;
    },

    updateTodo: async (id, updates) => {
        const { data } = await axiosInstance.patch(`/rest/v1/todos?id=eq.${id}`, updates);
        return data;
    },

    deleteTodo: async (id) => {
        await axiosInstance.delete(`/rest/v1/todos?id=eq.${id}`);
    }
};
