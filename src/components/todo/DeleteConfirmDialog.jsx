'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteConfirmDialog = ({ open, onClose, onConfirm, title = 'Delete Task', message = 'Are you sure you want to delete this task? This action cannot be undone.' }) => (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>
        <DialogContent>
            <Typography variant="body1">{message}</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={onClose} sx={{ color: 'text.secondary', fontWeight: 600 }}>Cancel</Button>
            <Button onClick={onConfirm} variant="contained" color="error" sx={{ fontWeight: 700 }}>Delete</Button>
        </DialogActions>
    </Dialog>
);

export default DeleteConfirmDialog;
