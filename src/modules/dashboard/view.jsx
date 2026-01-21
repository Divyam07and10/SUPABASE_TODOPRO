'use client';

import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TodoTable from '@/components/todo/TodoTable';
import TodoDialog from '@/components/todo/TodoDialog';
import { toast } from 'react-toastify';

const TodoView = ({
    todos,
    loading,
    dialogOpen,
    selectedTodo,
    onOpenDialog,
    onCloseDialog,
    onSubmitDialog,
    onDeleteTodo,
    onToggleComplete,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [statusFilter, setStatusFilter] = useState('all');

    const processedTodos = useMemo(() => {
        let result = [...todos];

        // Search filter
        if (searchQuery.trim()) {
            const term = searchQuery.toLowerCase();
            result = result.filter((todo) =>
                todo.title.toLowerCase().includes(term) ||
                (todo.description && todo.description.toLowerCase().includes(term))
            );
        }

        // Status Filter
        if (statusFilter !== 'all') {
            result = result.filter((todo) => {
                const isCompleted = todo.is_complete || todo.status === 'completed';
                if (statusFilter === 'completed') return isCompleted;
                if (statusFilter === 'pending') return !isCompleted && todo.status !== 'overdue' && todo.status !== 'delayed';
                if (statusFilter === 'overdue') return todo.status === 'overdue' || todo.status === 'delayed';
                return true;
            });
        }

        // Sorting
        result.sort((a, b) => {
            switch (sortBy) {
                case 'start_asc':
                    return new Date(a.task_startdate) - new Date(b.task_startdate);
                case 'start_desc':
                    return new Date(b.task_startdate) - new Date(a.task_startdate);
                case 'end_asc':
                    return new Date(a.task_enddate) - new Date(b.task_enddate);
                case 'end_desc':
                    return new Date(b.task_enddate) - new Date(a.task_enddate);
                case 'default':
                default:
                    return (a.id || 0) - (b.id || 0);
            }
        });

        return result;
    }, [todos, searchQuery, sortBy, statusFilter]);

    const handleAddClick = () => {
        onOpenDialog(null);
    };

    const handleReset = () => {
        setSearchQuery('');
        setSortBy('default');
        setStatusFilter('all');
        toast.info('Filters reset');
    };

    return (
        <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                Task Management
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 4,
                    borderRadius: 4,
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    border: '1px solid #e0e0e0',
                }}
            >
                <TextField
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ flexGrow: 1, minWidth: 250 }}
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <SearchIcon color="action" sx={{ mr: 1 }} />
                        ),
                        sx: { borderRadius: 2 }
                    }}
                />

                <FormControl sx={{ minWidth: 150 }} size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={statusFilter}
                        label="Status"
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{ borderRadius: 2 }}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="overdue">Overdue</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }} size="small">
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortBy}
                        label="Sort By"
                        onChange={(e) => setSortBy(e.target.value)}
                        sx={{ borderRadius: 2 }}
                    >
                        <MenuItem value="default">Default (ID)</MenuItem>
                        <MenuItem value="start_asc">Start Date: Oldest First</MenuItem>
                        <MenuItem value="start_desc">Start Date: Newest First</MenuItem>
                        <MenuItem value="end_asc">End Date: Oldest First</MenuItem>
                        <MenuItem value="end_desc">End Date: Newest First</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="outlined"
                    onClick={handleReset}
                    startIcon={<RefreshIcon />}
                    sx={{ height: 40, borderRadius: 2, textTransform: 'none' }}
                >
                    Reset
                </Button>
                <Button
                    variant="contained"
                    onClick={handleAddClick}
                    startIcon={<AddIcon />}
                    sx={{ height: 40, ml: 'auto', borderRadius: 2, textTransform: 'none', px: 3 }}
                >
                    Add Task
                </Button>
            </Paper>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <Typography>Loading tasks...</Typography>
                </Box>
            ) : (
                <TodoTable
                    todos={processedTodos}
                    onEdit={onOpenDialog}
                    onDelete={onDeleteTodo}
                    onToggleComplete={onToggleComplete}
                />
            )}

            <TodoDialog
                open={dialogOpen}
                onClose={onCloseDialog}
                onSubmit={onSubmitDialog}
                initialData={selectedTodo}
            />
        </Box>
    );
};

export default TodoView;
