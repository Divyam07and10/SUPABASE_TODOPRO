'use client';

import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton
} from '@mui/material';
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
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setFormData({
                    title: initialData.title || '',
                    description: initialData.description || '',
                    status: initialData.status || 'pending',
                    task_startdate: formatDate(initialData.task_startdate),
                    task_enddate: formatDate(initialData.task_enddate),
                });
            } else {
                const now = new Date();
                const end = new Date(now.getTime() + 60 * 60 * 1000);
                // eslint-disable-next-line react-hooks/set-state-in-effect
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
        await onSubmit(formData);
        onClose();
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
                        <FormControl fullWidth>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                value={formData.status}
                                label="Status"
                                onChange={(e) => handleChange('status', e.target.value)}
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                                <MenuItem value="delayed">Delayed</MenuItem>
                            </Select>
                        </FormControl>
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
