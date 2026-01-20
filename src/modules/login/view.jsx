'use client';

import React from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Paper, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from 'next/link';

export default function LoginView({ loading, onSubmit }) {
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
                    Sign in
                </Typography>
                <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, height: 48 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href="/register" passHref legacyBehavior>
                            <Button variant="text" size="small">
                                {"Don't have an account? Sign Up"}
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
