import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './slices/authSlice';
import todoReducer from './slices/todoSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    todos: todoReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // Only persist auth state for now, maybe todos later if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
