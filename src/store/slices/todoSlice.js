import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.items = action.payload;
        },
        addTodo: (state, action) => {
            state.items.unshift(action.payload);
        },
        updateTodo: (state, action) => {
            const index = state.items.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...action.payload };
            }
        },
        deleteTodo: (state, action) => {
            state.items = state.items.filter((todo) => todo.id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setTodos, addTodo, updateTodo, deleteTodo, setLoading, setError } = todoSlice.actions;
export default todoSlice.reducer;
