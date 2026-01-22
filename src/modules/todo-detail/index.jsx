'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { todoService } from '@/services/todos/todos.service';
import { useAuth } from '@/shared/context/AuthContext';
import { useTodo } from '@/context/TodoContext';
import TodoDetailView from './view';
import TodoDialog from '@/components/todo/TodoDialog';
import DeleteConfirmDialog from '@/components/todo/DeleteConfirmDialog';
import { toast } from 'react-toastify';

const TodoDetailContainer = () => {
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
        } catch (error) {
            toast.error('Failed to load task details');
        } finally {
            setLoading(false);
        }
    }, [user, title]);

    useEffect(() => { fetchDetail(); }, [fetchDetail]);

    const handleEditSubmit = async (data) => {
        await updateTodo(todo.id, data);
        setIsEditDialogOpen(false);
        data.title && data.title !== todo.title ? router.push(`/todo/${encodeURIComponent(data.title)}`) : await fetchDetail();
    };

    const handleConfirmDelete = async () => {
        await deleteTodo(todo.id);
        setIsDeleteDialogOpen(false);
        router.push('/');
    };

    const handleToggleComplete = async () => {
        if (!todo) return;
        const isComp = !(todo.status?.toLowerCase() === 'completed' || !!todo.completed_at || !!todo.is_complete);
        await updateTodo(todo.id, { status: isComp ? 'completed' : 'pending', completed_at: isComp ? new Date().toISOString() : null, is_complete: isComp });
        await fetchDetail();
    };

    return (
        <>
            <TodoDetailView
                todo={todo}
                loading={loading}
                onEdit={() => setIsEditDialogOpen(true)}
                onDelete={() => setIsDeleteDialogOpen(true)}
                onToggleComplete={handleToggleComplete}
            />
            {todo && (
                <>
                    <TodoDialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} onSubmit={handleEditSubmit} initialData={todo} />
                    <DeleteConfirmDialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={handleConfirmDelete} />
                </>
            )}
        </>
    );
};

export default TodoDetailContainer;
