'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/shared/context/AuthContext';
import { toast } from 'react-toastify';
import { todoService } from '@/services/todos/todos.service';

const TodoContext = createContext(undefined);

export const TodoProvider = ({ children }) => {
    const { user } = useAuth();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTodos = useCallback(async () => {
        if (!user) return;
        try {
            setLoading(true);
            const data = await todoService.fetchTodos(user.id);
            setTodos(data);
        } catch {
            toast.error('Failed to fetch todos');
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchTodos();
        } else {
            setTodos([]);
        }
    }, [user, fetchTodos]);

    const addTodo = async (todo) => {
        if (!user) return;

        const isDuplicate = todos.some(t => t.title.toLowerCase() === todo.title.toLowerCase());
        if (isDuplicate) {
            const error = new Error('A task with this title already exists');
            toast.error(error.message);
            throw error;
        }

        try {
            setLoading(true);
            const newTodo = {
                ...todo,
                user_id: user.id,
            };
            const data = await todoService.addTodo(newTodo);
            if (data && data.length > 0) {
                setTodos((prev) => [data[0], ...prev]);
                toast.success('Todo added successfully');
            }
        } catch (error) {
            toast.error('Failed to add todo');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateTodo = async (id, updates) => {
        if (updates.title) {
            const isDuplicate = todos.some(t => t.id !== id && t.title.toLowerCase() === updates.title.toLowerCase());
            if (isDuplicate) {
                const error = new Error('A task with this title already exists');
                toast.error(error.message);
                throw error;
            }
        }

        try {
            setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));

            const data = await todoService.updateTodo(id, updates);

            if (data && data.length > 0) {
                setTodos((prev) => prev.map((t) => (t.id === id ? data[0] : t)));
            }
            toast.success('Todo updated');
        } catch (error) {
            toast.error('Failed to update todo');
            fetchTodos();
            throw error;
        }
    };

    const deleteTodo = async (id) => {
        try {
            setTodos((prev) => prev.filter((t) => t.id !== id));
            await todoService.deleteTodo(id);
            toast.success('Todo deleted');
        } catch {
            toast.error('Failed to delete todo');
            fetchTodos();
        }
    };

    return (
        <TodoContext.Provider value={{ todos, loading, fetchTodos, addTodo, updateTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};
