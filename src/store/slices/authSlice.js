import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    session: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user;
            state.session = action.payload.session;
            state.isAuthenticated = !!action.payload.session;
        },
        clearAuth: (state) => {
            state.user = null;
            state.session = null;
            state.isAuthenticated = false;
        },
        updateUser: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        }
    },
});

export const { setAuth, clearAuth, updateUser } = authSlice.actions;
export default authSlice.reducer;
