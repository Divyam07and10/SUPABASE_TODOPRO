'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TodoDialog = ({ open, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        task_startdate: '',
        task_enddate: '',
    });

    useEffect(() => {
        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const d = new Date(dateStr);
            return d.toISOString().slice(0, 16);
        };

        if (open) {
            if (initialData) {
                const isComplete = Boolean(
                    initialData.is_complete === true ||
                    initialData.is_complete === 'true' ||
                    initialData.status?.toLowerCase() === 'completed' ||
                    !!initialData.completed_at
                );

                setFormData({
                    title: initialData.title || '',
                    description: initialData.description || '',
                    status: isComplete ? 'completed' : 'pending',
                    task_startdate: formatDate(initialData.task_startdate),
                    task_enddate: formatDate(initialData.task_enddate),
                });
            } else {
                const now = new Date();
                const end = new Date(now.getTime() + 60 * 60 * 1000);
                setFormData({
                    title: '',
                    description: '',
                    status: 'pending',
                    task_startdate: now.toISOString().slice(0, 16),
                    task_enddate: end.toISOString().slice(0, 16),
                });
            }
        }
    }, [initialData, open]);

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.task_startdate || !formData.task_enddate) return;

        // Synchronize is_complete and completed_at based on status
        const isCompleted = formData.status === 'completed';
        const submissionData = {
            ...formData,
            status: isCompleted ? 'completed' : 'pending',
            is_complete: isCompleted,
            completed_at: isCompleted ? (initialData?.completed_at || new Date().toISOString()) : null
        };

        try {
            await onSubmit(submissionData);
            onClose();
        } catch (error) {
            // Error handling is managed by the context (toast.error)
            // We catch it here to prevent the dialog from closing
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {initialData ? 'Edit Task' : 'Add Task'}
                    <IconButton
                        onClick={onClose}
                        sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            required
                            label="Title"
                            fullWidth
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            minRows={3}
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                        />
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField
                                required
                                label="Start Date"
                                type="datetime-local"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={formData.task_startdate}
                                onChange={(e) => handleChange('task_startdate', e.target.value)}
                            />
                            <TextField
                                required
                                label="End Date"
                                type="datetime-local"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={formData.task_enddate}
                                onChange={(e) => handleChange('task_enddate', e.target.value)}
                            />
                        </Stack>
                        {initialData && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.status?.toLowerCase() === 'completed'}
                                        onChange={(e) => handleChange('status', e.target.checked ? 'completed' : 'pending')}
                                        color="success"
                                    />
                                }
                                label="Mark as Completed"
                                sx={{ mt: 1 }}
                            />
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TodoDialog;
