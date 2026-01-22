'use client';

import React from 'react';
import { Box, Typography, Button, TextField, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import TodoTable from '@/components/todo/TodoTable';
import TodoDialog from '@/components/todo/TodoDialog';

const TodoView = ({
    todos, loading, dialogOpen, selectedTodo, searchQuery, sortBy, statusFilter,
    onSearchChange, onSortChange, onStatusFilterChange, onReset,
    onOpenDialog, onCloseDialog, onSubmitDialog, onDeleteClick, onToggleComplete
}) => (
    <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Task Management</Typography>
        <Paper elevation={0} sx={{ p: 2, mb: 4, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', border: '1px solid #e0e0e0' }}>
            <TextField
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                sx={{ flexGrow: 1, minWidth: 250 }}
                size="small"
                InputProps={{ startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />, sx: { borderRadius: 2 } }}
            />
            <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} label="Status" onChange={(e) => onStatusFilterChange(e.target.value)} sx={{ borderRadius: 2 }}>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="overdue">Overdue</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} label="Sort By" onChange={(e) => onSortChange(e.target.value)} sx={{ borderRadius: 2 }}>
                    <MenuItem value="default">Default (ID)</MenuItem>
                    <MenuItem value="start_asc">Start Date: Oldest First</MenuItem>
                    <MenuItem value="start_desc">Start Date: Newest First</MenuItem>
                    <MenuItem value="end_asc">End Date: Oldest First</MenuItem>
                    <MenuItem value="end_desc">End Date: Newest First</MenuItem>
                </Select>
            </FormControl>
            <Button variant="outlined" onClick={onReset} startIcon={<RefreshIcon />} sx={{ height: 40, borderRadius: 2, textTransform: 'none' }}>Reset</Button>
            <Button variant="contained" onClick={() => onOpenDialog(null)} startIcon={<AddIcon />} sx={{ height: 40, ml: 'auto', borderRadius: 2, textTransform: 'none', px: 3 }}>Add Task</Button>
        </Paper>
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><Typography>Loading tasks...</Typography></Box>
        ) : (
            <TodoTable todos={todos} onEdit={onOpenDialog} onDelete={onDeleteClick} onToggleComplete={onToggleComplete} />
        )}
        <TodoDialog key={selectedTodo?.id || 'new'} open={dialogOpen} onClose={onCloseDialog} onSubmit={onSubmitDialog} initialData={selectedTodo} />
    </Box>
);

export default TodoView;
