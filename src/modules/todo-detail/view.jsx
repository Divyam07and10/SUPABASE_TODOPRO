'use client';

import React from 'react';
import { Container, Paper, Box, Typography, Grid, Avatar, Button, Stack, CircularProgress, Chip } from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';
import { ChevronLeft, Edit2, Trash2, Calendar, Clock, CheckCircle } from 'lucide-react';

const InfoCard = ({ icon: Icon, label, value, subValue, color, bgcolor }) => (
    <Box
        sx={{
            p: 2,
            borderRadius: 2,
            bgcolor,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: 0 // Prevent overflow in flex items
        }}
    >
        <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Box sx={{ p: 0.7, borderRadius: 1.5, bgcolor: 'white', color, display: 'flex', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <Icon size={14} />
            </Box>
            <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.65rem', whiteSpace: 'nowrap' }}>
                {label}
            </Typography>
        </Box>
        <Typography variant="body2" fontWeight={700} sx={{ wordBreak: 'break-word', lineHeight: 1.2, fontSize: '0.9rem' }}>
            {value}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.75rem' }}>
            {subValue}
        </Typography>
    </Box>
);

const TodoDetailView = ({ todo, loading, onEdit, onDelete }) => {
    const BackButton = (
        <Box mb={3}>
            <Link href="/" legacyBehavior>
                <Button
                    startIcon={<ChevronLeft size={20} />}
                    sx={{ color: 'text.secondary', fontWeight: 600 }}
                >
                    Back to Dashboard
                </Button>
            </Link>
        </Box>
    );

    if (loading) return (
        <Container sx={{ mt: 8, textAlign: 'center' }}>
            {BackButton}
            <CircularProgress thickness={4} />
        </Container>
    );

    if (!todo) return (
        <Container sx={{ mt: 8 }}>
            {BackButton}
            <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2, bgcolor: '#f8fafc', border: '1px dashed #cbd5e1' }}>
                <Typography variant="h6" fontWeight={700} color="text.primary">Task not found</Typography>
                <Typography color="text.secondary">We couldn't find the task you're looking for</Typography>
            </Paper>
        </Container>
    );

    const isCompleted = todo.status?.toLowerCase() === 'completed' || !!todo.completed_at || !!todo.is_complete;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 12 }}>
            {BackButton}

            <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, pb: { xs: 5, md: 6 }, borderRadius: 2, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
                {/* Header */}
                <Box display="flex" gap={3} mb={5} alignItems="flex-start" flexWrap="wrap">
                    <Avatar
                        sx={{
                            width: 80, height: 80, bgcolor: 'primary.main',
                            fontSize: '2rem', fontWeight: 800, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
                        }}
                    >
                        {todo.title?.[0]?.toUpperCase()}
                    </Avatar>

                    <Box sx={{ flex: 1, minWidth: 0, pt: 1 }}>
                        <Chip
                            size="small"
                            label={isCompleted ? 'COMPLETED' : 'PENDING'}
                            color={isCompleted ? 'success' : 'warning'}
                            sx={{ fontWeight: 800, mb: 1, borderRadius: 1 }}
                        />
                        <Typography
                            variant="h4"
                            fontWeight={800}
                            sx={{
                                color: 'text.primary',
                                width: '100%',
                                overflowWrap: 'anywhere',
                                wordBreak: 'break-word',
                                whiteSpace: 'normal',
                                lineHeight: 1.2,
                                pb: 1
                            }}
                        >
                            {todo.title}
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0, pt: 1 }}>
                        <Button
                            variant="contained"
                            startIcon={<Edit2 size={18} />}
                            onClick={onEdit}
                            sx={{ px: 3, height: 42 }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<Trash2 size={18} />}
                            onClick={onDelete}
                            sx={{ px: 3, height: 42 }}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Box>

                {/* Description */}
                <Box mb={6}>
                    <Typography variant="subtitle2" fontWeight={800} color="text.secondary" sx={{ textTransform: 'uppercase', mb: 1.5, letterSpacing: 1.5 }}>
                        Description
                    </Typography>
                    <Box sx={{ p: 3, bgcolor: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 2 }}>
                        <Typography sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'text.secondary', lineHeight: 1.7, fontSize: '1rem' }}>
                            {todo.description || 'No description provided.'}
                        </Typography>
                    </Box>
                </Box>

                {/* Info Grid */}
                <Box sx={{ mt: 4 }}>
                    <Grid container spacing={2}>
                        {[
                            { icon: Calendar, label: 'Start Date', value: format(new Date(todo.task_startdate), 'MMM d, yyyy'), subValue: format(new Date(todo.task_startdate), 'HH:mm'), color: '#3b82f6', bgcolor: '#f1f5f9' },
                            { icon: Calendar, label: 'End Date', value: format(new Date(todo.task_enddate), 'MMM d, yyyy'), subValue: format(new Date(todo.task_enddate), 'HH:mm'), color: '#ef4444', bgcolor: '#fef2f2' },
                            { icon: CheckCircle, label: 'Completed', value: todo.completed_at ? format(new Date(todo.completed_at), 'MMM d, yyyy') : 'Pending', subValue: todo.completed_at ? format(new Date(todo.completed_at), 'HH:mm') : 'Not yet', color: '#10b981', bgcolor: '#f0fdf4' },
                            { icon: Clock, label: 'Created', value: format(new Date(todo.created_at), 'MMM d, yyyy'), subValue: format(new Date(todo.created_at), 'HH:mm'), color: '#6366f1', bgcolor: '#f5f3ff' },
                            { icon: Clock, label: 'Updated', value: format(new Date(todo.updated_at), 'MMM d, yyyy'), subValue: format(new Date(todo.updated_at), 'HH:mm'), color: '#8b5cf6', bgcolor: '#fdf4ff' }
                        ].map((item, i) => (
                            <Grid item xs={12} sm={6} md={4} lg={2.4} key={i}>
                                <InfoCard {...item} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default TodoDetailView;
