'use client';

import React, { useEffect } from 'react';
import TodoDetailView from './view';
import TodoDialog from '@/shared/components/TodoDialog';
import DeleteConfirmDialog from '@/shared/components/DeleteConfirmDialog';
import { useTodoDetail } from '@/context/TodoDetailContext';

const TodoDetailContainer = () => {
    const {
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
    } = useTodoDetail();

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

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
                    <TodoDialog key={todo.id} open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} onSubmit={handleEditSubmit} initialData={todo} />
                    <DeleteConfirmDialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={handleConfirmDelete} />
                </>
            )}
        </>
    );
};

export default TodoDetailContainer;
