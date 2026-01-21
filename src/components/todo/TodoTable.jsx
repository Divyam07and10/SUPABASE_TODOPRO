'use client';

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Typography } from '@mui/material';
import { format } from 'date-fns';

const TodoTable = ({ todos, onEdit, onDelete, onToggleComplete }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'success';
            case 'delayed':
            case 'overdue':
                return 'error';
            case 'pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{ borderRadius: 4, border: '1px solid #e0e0e0' }}
        >
            <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="todo table">
                <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', width: '60px' }}>Done</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '18%' }}>Title</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '22%' }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '8%' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '12%' }}>Start Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '12%' }}>End Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '12%' }}>Completed At</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {todos.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No tasks found.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        todos.map((todo) => {
                            const isCompleted = todo.is_complete || todo.status === 'completed';
                            return (
                                <TableRow
                                    key={todo.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <Checkbox
                                            checked={isCompleted}
                                            onChange={() => onToggleComplete(todo)}
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                            color="success"
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{
                                            textDecoration: isCompleted ? 'line-through' : 'none',
                                            opacity: isCompleted ? 0.6 : 1
                                        }}
                                    >
                                        {todo.title}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            maxWidth: 300,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            opacity: isCompleted ? 0.6 : 1
                                        }}
                                    >
                                        {todo.description || '-'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={isCompleted ? 'completed' : todo.status}
                                            color={getStatusColor(isCompleted ? 'completed' : todo.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {todo.task_startdate ? format(new Date(todo.task_startdate), 'MMM d, HH:mm') : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {todo.task_enddate ? format(new Date(todo.task_enddate), 'MMM d, HH:mm') : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {todo.completed_at ? format(new Date(todo.completed_at), 'MMM d, HH:mm') : '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => onEdit(todo)}
                                            disabled={isCompleted}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => onDelete(todo.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TodoTable;
