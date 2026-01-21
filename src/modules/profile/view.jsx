'use client';

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress, MenuItem, Grid, Avatar, Chip, Paper, Divider, List, ListItem, ListItemText, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Edit2, CheckCircle, Clock, Activity } from 'lucide-react';
import { format } from 'date-fns';

export default function ProfileView({ profile, todos, stats, loading, saving, onSave, joinDate }) {
    const [formData, setFormData] = useState({});
    const [open, setOpen] = useState(false);

    const handleEditClick = () => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                phone_no: profile.phone_no || '',
                gender: profile.gender || '',
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
        setOpen(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!profile) return null;

    return (
        <Container component="main" maxWidth="lg">
            <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>

                {/* 1. Header/Details Card */}
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: 'primary.main',
                                    fontSize: '2rem',
                                }}
                            >
                                {profile.name ? profile.name[0].toUpperCase() : 'U'}
                            </Avatar>
                        </Grid>
                        <Grid item xs>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="subtitle2" color="text.secondary">Name</Typography>
                                    <Typography variant="body1" fontWeight={600}>{profile.name || '-'}</Typography>

                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                                        <Typography variant="body1">{profile.email}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                                    <Typography variant="body1">{profile.phone_no || 'Not set'}</Typography>

                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle2" color="text.secondary">Gender</Typography>
                                        <Typography variant="body1">{profile.gender || 'Not set'}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="subtitle2" color="text.secondary">Joined On</Typography>
                                    <Typography variant="body1">{joinDate}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ ml: 'auto' }}>
                            <Button
                                variant="contained"
                                startIcon={<Edit2 size={16} />}
                                onClick={handleEditClick}
                                sx={{ whiteSpace: 'nowrap' }}
                            >
                                Edit Profile
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                {/* 2. Stats & Activity Card */}
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                        <Grid item xs={6} sm={3}>
                            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h4" fontWeight={700} color="primary.main">{stats.total}</Typography>
                                <Typography variant="caption" fontWeight={600} color="text.secondary">TOTAL</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Box sx={{ p: 2, bgcolor: '#f0fdf4', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h4" fontWeight={700} color="success.main">{stats.completed}</Typography>
                                <Typography variant="caption" fontWeight={600} color="text.secondary">DONE</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Box sx={{ p: 2, bgcolor: '#fff7ed', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h4" fontWeight={700} color="warning.main">{stats.pending}</Typography>
                                <Typography variant="caption" fontWeight={600} color="text.secondary">PENDING</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Box sx={{ p: 2, bgcolor: '#fef2f2', borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="h4" fontWeight={700} color="error.main">{stats.delayed}</Typography>
                                <Typography variant="caption" fontWeight={600} color="text.secondary">DELAYED</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ mb: 3 }} />

                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
                        Recent Activity
                    </Typography>

                    <List disablePadding>
                        {todos && todos.length > 0 ? (
                            todos.slice(0, 5).map((todo, index) => {
                                const isCompleted = todo.is_complete || todo.status === 'completed';
                                let statusLabel = 'Pending';
                                let statusColor = 'warning';

                                if (isCompleted) {
                                    statusLabel = 'Completed';
                                    statusColor = 'success';
                                } else if (todo.status === 'delayed') {
                                    statusLabel = 'Delayed';
                                    statusColor = 'error';
                                }

                                return (
                                    <React.Fragment key={todo.id}>
                                        <ListItem alignItems="flex-start" sx={{ px: 0, py: 2 }}>
                                            <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                                                {isCompleted ?
                                                    <CheckCircle size={20} color="#16a34a" /> :
                                                    todo.status === 'delayed' ?
                                                        <Activity size={20} color="#dc2626" /> :
                                                        <Clock size={20} color="#ea580c" />
                                                }
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="subtitle1" fontWeight={500} sx={{
                                                        textDecoration: isCompleted ? 'line-through' : 'none',
                                                        color: isCompleted ? 'text.secondary' : 'text.primary'
                                                    }}>
                                                        {todo.title}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="caption" color="text.secondary">
                                                        {todo.created_at ? format(new Date(todo.created_at), 'MMM d, yyyy • h:mm a') : ''}
                                                    </Typography>
                                                }
                                            />
                                            <Chip label={statusLabel} size="small" color={statusColor} variant="outlined" />
                                        </ListItem>
                                        {index < Math.min(todos.length, 5) - 1 && <Divider component="li" />}
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <Box sx={{ py: 4, textAlign: 'center' }}>
                                <Typography variant="body1" color="text.secondary">
                                    No recent tasks found.
                                </Typography>
                            </Box>
                        )}
                    </List>
                </Paper>
            </Box>

            {/* Edit Profile Dialog */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 700 }}>Edit Profile</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Full Name"
                            name="name"
                            fullWidth
                            value={formData.name || ''}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Phone Number"
                            name="phone_no"
                            fullWidth
                            value={formData.phone_no || ''}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Gender"
                            name="gender"
                            select
                            fullWidth
                            value={formData.gender || ''}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose} color="inherit">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" disabled={saving}>Save Changes</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
