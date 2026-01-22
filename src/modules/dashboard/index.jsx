'use client';

import React from 'react';
import TodoView from './view';
import DeleteConfirmDialog from '@/shared/components/DeleteConfirmDialog';
import { useDashboard } from '@/context/DashboardContext';

const TodoDashboard = () => {
    const {
        todos,
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
    } = useDashboard();

    return (
        <>
            <TodoView
                todos={todos}
                loading={loading}
                dialogOpen={dialogOpen}
                selectedTodo={selectedTodo}
                searchQuery={searchQuery}
                sortBy={sortBy}
                statusFilter={statusFilter}
                onSearchChange={setSearchQuery}
                onSortChange={setSortBy}
                onStatusFilterChange={setStatusFilter}
                onReset={handleReset}
                onOpenDialog={handleOpenDialog}
                onCloseDialog={handleCloseDialog}
                onSubmitDialog={handleSubmitDialog}
                onDeleteClick={handleDeleteClick}
                onToggleComplete={handleToggleComplete}
            />
            <DeleteConfirmDialog open={!!deleteId} onClose={() => handleDeleteClick(null)} onConfirm={handleConfirmDelete} />
        </>
    );
};

export default TodoDashboard;
