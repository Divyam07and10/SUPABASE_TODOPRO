'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { todoService } from '@/services/todos/todos.service';
import { useAuth } from '@/shared/context/AuthContext';
import { useTodo } from '@/context/TodoContext';
import TodoDetailView from './view';
import TodoDialog from '@/components/todo/TodoDialog';
import { toast } from 'react-toastify';

const TodoDetailContainer = () => {
    const { title } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const { updateTodo, deleteTodo } = useTodo();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const fetchDetail = useCallback(async () => {
        if (!user || !title) return;
        try {
            setLoading(true);
            const decodedTitle = decodeURIComponent(title);
            const data = await todoService.getTodoByTitle(user.id, decodedTitle);
            setTodo(data);
        } catch (error) {
            toast.error('Failed to load task details');
        } finally {
            setLoading(false);
        }
    }, [user, title]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    const handleEditClick = () => {
        setIsEditDialogOpen(true);
    };

    const handleEditSubmit = async (data) => {
        try {
            await updateTodo(todo.id, data);
            setIsEditDialogOpen(false);
            if (data.title && data.title !== todo.title) {
                router.push(`/todo/${encodeURIComponent(data.title)}`);
            } else {
                await fetchDetail();
            }
        } catch (error) {
            // Error toast handled by context
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTodo(todo.id);
                setTodo(null); // This will trigger the "Task not found" view
            } catch (error) {
                // Error toast handled by context
            }
        }
    };

    const handleToggleComplete = async (e) => {
        if (e) e.stopPropagation();
        if (!todo) return;

        // Robust check for completion status
        const isCurrentlyCompleted = todo.status?.toLowerCase() === 'completed' || !!todo.completed_at || !!todo.is_complete;

        const updates = {
            status: isCurrentlyCompleted ? 'pending' : 'completed',
            completed_at: isCurrentlyCompleted ? null : new Date().toISOString(),
            is_complete: !isCurrentlyCompleted
        };

        try {
            await updateTodo(todo.id, updates);
            await fetchDetail();
        } catch (error) {
            // Error toast handled by context
        }
    };

    return (
        <>
            <TodoDetailView
                todo={todo}
                loading={loading}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
            />
            {todo && (
                <TodoDialog
                    open={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    onSubmit={handleEditSubmit}
                    initialData={todo}
                />
            )}
        </>
    );
};

export default TodoDetailContainer;
