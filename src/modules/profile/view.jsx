'use client';

import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, CircularProgress, MenuItem, Grid, Card, CardContent, CardHeader, Avatar, Chip, LinearProgress } from '@mui/material';
import { Edit, Mail, Calendar, CheckCircle, Clock, AlertTriangle, List } from 'lucide-react';
import { format } from 'date-fns';

export default function ProfileView({ profile, todos, stats, loading, saving, onSave, joinDate }) {
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    React.useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                phone_no: profile.phone_no || '',
                gender: profile.gender || '',
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
        setIsEditing(false);
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
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa', pb: 8 }}>
            <Container maxWidth="lg" sx={{ pt: 4 }}>
                {/* Header Card */}
                <Card sx={{ mb: 4, borderRadius: 2, overflow: 'visible' }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'center' }, gap: 4 }}>
                            <Avatar sx={{ width: 96, height: 96, bgcolor: 'primary.main', fontSize: '2.5rem' }}>
                                {profile.name ? profile.name[0].toUpperCase() : 'U'}
                            </Avatar>
                            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                    <Box>
                                        <Typography variant="h4" fontWeight="700" sx={{ color: '#111827' }}>
                                            {profile.name || 'User'}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mt: 0.5, color: 'text.secondary', gap: 1 }}>
                                            <Mail size={16} />
                                            <Typography variant="body1">{profile.email}</Typography>
                                        </Box>
                                    </Box>
                                    {!isEditing && (
                                        <Button
                                            variant="contained"
                                            onClick={() => setIsEditing(true)}
                                            startIcon={<Edit size={16} />}
                                            sx={{ mt: { xs: 2, sm: 0 }, textTransform: 'none', borderRadius: 2 }}
                                        >
                                            Update Profile
                                        </Button>
                                    )}
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2, mt: 2 }}>
                                    <Chip icon={<Calendar size={14} />} label={`Joined ${joinDate}`} sx={{ bgcolor: '#e5e7eb' }} />
                                    <Chip variant="outlined" label={`${stats.completionRate}% Completion Rate`} color="primary" />
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {isEditing ? (
                    <Card sx={{ maxWidth: 800, mx: 'auto', borderRadius: 2 }}>
                        <CardHeader title="Edit Profile" />
                        <CardContent>
                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField margin="normal" label="Email" fullWidth value={profile.email || ''} disabled helperText="Email cannot be changed" />
                                <TextField margin="normal" name="name" label="Full Name" fullWidth value={formData.name || ''} onChange={handleChange} />
                                <TextField margin="normal" name="phone_no" label="Phone Number" fullWidth value={formData.phone_no || ''} onChange={handleChange} />
                                <TextField margin="normal" name="gender" label="Gender" select fullWidth value={formData.gender || ''} onChange={handleChange}>
                                    <MenuItem value="">Select Gender</MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>

                                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                                    <Button type="button" variant="outlined" fullWidth onClick={() => setIsEditing(false)} disabled={saving} sx={{ borderRadius: 2, textTransform: 'none' }}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="contained" fullWidth disabled={saving} sx={{ borderRadius: 2, textTransform: 'none' }}>
                                        {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    <Grid container spacing={4}>
                        {/* Stats Column */}
                        <Grid item xs={12} lg={8}>
                            <Grid container spacing={2} sx={{ mb: 4 }}>
                                {[
                                    { label: 'Total Tasks', value: stats.total, color: '#2563eb', icon: List },
                                    { label: 'Completed', value: stats.completed, color: '#16a34a', icon: CheckCircle },
                                    { label: 'Pending', value: stats.pending, color: '#ca8a04', icon: Clock },
                                    { label: 'Overdue', value: stats.overdue, color: '#dc2626', icon: AlertTriangle },
                                ].map((stat, index) => (
                                    <Grid item xs={6} sm={3} key={index}>
                                        <Card sx={{ height: '100%', borderRadius: 2 }}>
                                            <CardContent sx={{ textAlign: 'center', p: 2, '&:last-child': { pb: 2 } }}>
                                                <Typography variant="h4" fontWeight="700" sx={{ color: stat.color, mb: 0.5 }}>
                                                    {stat.value}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: 'text.secondary' }}>
                                                    {/* <stat.icon size={14} /> */}
                                                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{stat.label}</Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            <Card sx={{ borderRadius: 2 }}>
                                <CardHeader title="Recent Activity" titleTypographyProps={{ fontWeight: 700 }} />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {todos && todos.slice(0, 5).map((todo) => (
                                            <Box key={todo.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#f9fafb', borderRadius: 2 }}>
                                                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: todo.is_complete || todo.status === 'completed' ? '#22c55e' : '#eab308', flexShrink: 0 }} />
                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                    <Typography variant="subtitle2" fontWeight="600" sx={{ opacity: todo.is_complete || todo.status === 'completed' ? 0.6 : 1, textDecoration: todo.is_complete || todo.status === 'completed' ? 'line-through' : 'none' }}>
                                                        {todo.title || 'Untitled Task'}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {(todo.is_complete || todo.status === 'completed') ? 'Completed' : 'Pending'} • {todo.created_at ? format(new Date(todo.created_at), 'MMM d, yyyy') : '-'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                        {(!todos || todos.length === 0) && (
                                            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>No recent activity</Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Sidebar Column */}
                        <Grid item xs={12} lg={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <Card sx={{ borderRadius: 2 }}>
                                    <CardHeader title="Profile Information" titleTypographyProps={{ fontWeight: 700 }} />
                                    <CardContent>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Full Name</Typography>
                                            <Typography variant="body1" fontWeight="500">{profile.name}</Typography>
                                        </Box>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Email</Typography>
                                            <Typography variant="body1" fontWeight="500" sx={{ wordBreak: 'break-all' }}>{profile.email}</Typography>
                                        </Box>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Phone</Typography>
                                            <Typography variant="body1" fontWeight="500">{profile.phone_no || '-'}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Gender</Typography>
                                            <Typography variant="body1" fontWeight="500">{profile.gender || '-'}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>

                                <Card sx={{ borderRadius: 2 }}>
                                    <CardHeader title="Productivity Insights" titleTypographyProps={{ fontWeight: 700 }} />
                                    <CardContent>
                                        <Box sx={{ mb: 2 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2" fontWeight="600">Completion Rate</Typography>
                                                <Typography variant="body2" fontWeight="600">{stats.completionRate}%</Typography>
                                            </Box>
                                            <LinearProgress variant="determinate" value={stats.completionRate} sx={{ height: 8, borderRadius: 4, bgcolor: '#e5e7eb', '& .MuiLinearProgress-bar': { bgcolor: '#2563eb' } }} />
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Typography variant="body2" color="text.secondary">• {stats.completed} tasks completed</Typography>
                                            <Typography variant="body2" color="text.secondary">• {stats.pending} tasks remaining</Typography>
                                            {stats.overdue > 0 && (
                                                <Typography variant="body2" sx={{ color: '#dc2626' }}>• {stats.overdue} overdue tasks</Typography>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
}
