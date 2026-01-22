'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Stack, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const TodoDialog = ({ open, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({ title: '', description: '', status: 'pending', task_startdate: '', task_enddate: '' });

    useEffect(() => {
        const formatDate = (date) => date ? new Date(date).toISOString().slice(0, 16) : '';
        if (open) {
            if (initialData) {
                const isComplete = !!(initialData.is_complete || initialData.completed_at || initialData.status?.toLowerCase() === 'completed');
                setFormData({
                    title: initialData.title || '',
                    description: initialData.description || '',
                    status: isComplete ? 'completed' : 'pending',
                    task_startdate: formatDate(initialData.task_startdate),
                    task_enddate: formatDate(initialData.task_enddate),
                });
            } else {
                const now = new Date();
                setFormData({
                    title: '', description: '', status: 'pending',
                    task_startdate: now.toISOString().slice(0, 16),
                    task_enddate: new Date(now.getTime() + 3600000).toISOString().slice(0, 16),
                });
            }
        }
    }, [initialData, open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isCompleted = formData.status === 'completed';
        await onSubmit({
            ...formData,
            status: isCompleted ? 'completed' : 'pending',
            is_complete: isCompleted,
            completed_at: isCompleted ? (initialData?.completed_at || new Date().toISOString()) : null
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {initialData ? 'Edit Task' : 'Add Task'}
                    <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={2.5} sx={{ mt: 1 }}>
                        <TextField required label="Title" fullWidth value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        <TextField label="Description" fullWidth multiline minRows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        <Stack direction="row" spacing={2}>
                            <TextField required label="Start Date" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} value={formData.task_startdate} onChange={(e) => setFormData({ ...formData, task_startdate: e.target.value })} />
                            <TextField required label="End Date" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} value={formData.task_enddate} onChange={(e) => setFormData({ ...formData, task_enddate: e.target.value })} />
                        </Stack>
                        {initialData && (
                            <FormControlLabel
                                control={<Checkbox checked={formData.status === 'completed'} onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'completed' : 'pending' })} color="success" />}
                                label="Mark as Completed"
                            />
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TodoDialog;
