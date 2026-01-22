'use client';

import React, { createContext, useContext, useCallback, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { todoService } from '@/services/todos/todos.service';
import { useAuth } from '@/shared/context/AuthContext';
import { useTodo } from '@/shared/context/TodoContext';
import { toast } from 'react-toastify';

const TodoDetailContext = createContext(undefined);

export const TodoDetailProvider = ({ children }) => {
    const { title } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const { updateTodo, deleteTodo } = useTodo();

    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const fetchDetail = useCallback(async () => {
        if (!user || !title) return;
        try {
            setLoading(true);
            const data = await todoService.getTodoByTitle(user.id, decodeURIComponent(title));
            setTodo(data);
        } catch {
            toast.error('Failed to load task details');
        } finally {
            setLoading(false);
        }
    }, [user, title]);

    const handleEditSubmit = async (data) => {
        await updateTodo(todo.id, data);
        setIsEditDialogOpen(false);
        if (data.title && data.title !== todo.title) {
            router.push(`/todo/${encodeURIComponent(data.title)}`);
        } else {
            await fetchDetail();
        }
    };

    const handleConfirmDelete = async () => {
        await deleteTodo(todo.id);
        setIsDeleteDialogOpen(false);
        router.push('/');
    };

    const handleToggleComplete = async () => {
        if (!todo) return;
        const isComp = !(todo.is_complete || todo.status === 'completed');
        await updateTodo(todo.id, {
            status: isComp ? 'completed' : 'pending',
            is_complete: isComp,
            completed_at: isComp ? new Date().toISOString() : null,
        });
        await fetchDetail();
    };

    const value = {
        todo,
        loading,
        isEditDialogOpen,
        isDeleteDialogOpen,
        setIsEditDialogOpen,
        setIsDeleteDialogOpen,
        fetchDetail,
        handleEditSubmit,
        handleConfirmDelete,
        handleToggleComplete,
    };

    return (
        <TodoDetailContext.Provider value={value}>
            {children}
        </TodoDetailContext.Provider>
    );
};

export const useTodoDetail = () => {
    const ctx = useContext(TodoDetailContext);
    if (!ctx) throw new Error('useTodoDetail must be used within a TodoDetailProvider');
    return ctx;
};
