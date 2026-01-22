import React from 'react';
import { Typography, List, Box, ListItem, ListItemIcon, ListItemText, Chip, Divider } from '@mui/material';
import { CheckCircle, Activity, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function RecentActivity({ todos }) {
    return (
        <>
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
                                                wordBreak: 'break-word',
                                                overflowWrap: 'anywhere'
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
        </>
    );
}
