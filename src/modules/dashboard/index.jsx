'use client';

import React, { useState } from 'react';
import TodoView from './view';
import { useTodo } from '@/context/TodoContext';

const TodoDashboard = () => {
    const { todos, loading, addTodo, updateTodo, deleteTodo } = useTodo();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const handleOpenDialog = (todo) => {
        setSelectedTodo(todo);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedTodo(null);
    };

    const handleSubmitDialog = async (data) => {
        if (selectedTodo) {
            await updateTodo(selectedTodo.id, data);
        } else {
            await addTodo(data);
        }
    };

    const handleToggleComplete = async (todo) => {
        const newIsComplete = !todo.is_complete;
        const newStatus = newIsComplete ? 'completed' : 'pending';
        await updateTodo(todo.id, {
            status: newStatus,
            is_complete: newIsComplete,
            completed_at: newIsComplete ? new Date().toISOString() : null
        });
    };

    return (
        <TodoView
            todos={todos}
            loading={loading}
            dialogOpen={dialogOpen}
            selectedTodo={selectedTodo}
            onOpenDialog={handleOpenDialog}
            onCloseDialog={handleCloseDialog}
            onSubmitDialog={handleSubmitDialog}
            onDeleteTodo={deleteTodo}
            onToggleComplete={handleToggleComplete}
        />
    );
};

export default TodoDashboard;
