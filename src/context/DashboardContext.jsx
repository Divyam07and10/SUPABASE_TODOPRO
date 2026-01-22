'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { useTodo } from '@/shared/context/TodoContext';
import { toast } from 'react-toastify';

const DashboardContext = createContext(undefined);

export const DashboardProvider = ({ children }) => {
    const { todos, loading, addTodo, updateTodo, deleteTodo } = useTodo();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [statusFilter, setStatusFilter] = useState('all');

    const processedTodos = useMemo(() => {
        let result = [...todos];
        if (searchQuery.trim()) {
            const term = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.title.toLowerCase().includes(term) ||
                (t.description && t.description.toLowerCase().includes(term))
            );
        }
        if (statusFilter !== 'all') {
            result = result.filter(t => {
                const isComp = t.is_complete;
                if (statusFilter === 'completed') return isComp;
                if (statusFilter === 'pending') return !isComp && t.status !== 'delayed';
                if (statusFilter === 'overdue') return t.status === 'delayed';
                return true;
            });
        }
        result.sort((a, b) => {
            if (sortBy === 'start_asc') return new Date(a.task_startdate) - new Date(b.task_startdate);
            if (sortBy === 'start_desc') return new Date(b.task_startdate) - new Date(a.task_startdate);
            if (sortBy === 'end_asc') return new Date(a.task_enddate) - new Date(b.task_enddate);
            if (sortBy === 'end_desc') return new Date(b.task_enddate) - new Date(a.task_enddate);
            return (a.id || 0) - (b.id || 0);
        });
        return result;
    }, [todos, searchQuery, sortBy, statusFilter]);

    const handleOpenDialog = (todo) => { setSelectedTodo(todo); setDialogOpen(true); };
    const handleCloseDialog = () => { setDialogOpen(false); setSelectedTodo(null); };
    const handleSubmitDialog = async (data) => {
        if (selectedTodo) {
            await updateTodo(selectedTodo.id, data);
        } else {
            await addTodo(data);
        }
    };
    const handleDeleteClick = (id) => setDeleteId(id);
    const handleConfirmDelete = async () => { if (deleteId) { await deleteTodo(deleteId); setDeleteId(null); } };
    const handleReset = () => { setSearchQuery(''); setSortBy('default'); setStatusFilter('all'); toast.info('All filters are reseted'); };

    const handleToggleComplete = async (todo) => {
        const isComp = !todo.is_complete;
        await updateTodo(todo.id, {
            status: isComp ? 'completed' : 'pending',
            is_complete: isComp,
            completed_at: isComp ? new Date().toISOString() : null,
        });
    };

    const value = {
        todos: processedTodos,
        loading,
        dialogOpen,
        selectedTodo,
        deleteId,
        searchQuery,
        sortBy,
        statusFilter,
        setSearchQuery,
        setSortBy,
        setStatusFilter,
        handleOpenDialog,
        handleCloseDialog,
        handleSubmitDialog,
        handleDeleteClick,
        handleConfirmDelete,
        handleReset,
        handleToggleComplete,
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const ctx = useContext(DashboardContext);
    if (!ctx) throw new Error('useDashboard must be used within a DashboardProvider');
    return ctx;
};
