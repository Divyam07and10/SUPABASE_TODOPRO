'use client';

import React from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Paper, CircularProgress, MenuItem, Checkbox } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterView({ loading, onSubmit }) {
    const [termsAccepted, setTermsAccepted] = useState(false);
    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 200px)', // Adjust for header/footer
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
            }}
        >
            <Container component="main" maxWidth="xs">
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                        <PersonAddOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#333' }}>
                        Create Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Join us to manage your tasks efficiently
                    </Typography>

                    <Box component="form" onSubmit={onSubmit} noValidate sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: 2 } }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            InputProps={{ sx: { borderRadius: 2 } }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="phone_no"
                            label="Phone Number"
                            name="phone_no"
                            autoComplete="tel"
                            InputProps={{ sx: { borderRadius: 2 } }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="gender"
                            name="gender"
                            label="Gender"
                            select
                            InputProps={{ sx: { borderRadius: 2 } }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            helperText="At least 6 characters"
                            InputProps={{ sx: { borderRadius: 2 } }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
                            <Checkbox
                                value="allowExtraEmails"
                                color="primary"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                sx={{ p: 0, mr: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                I agree to the <Link href="/terms" style={{ color: '#1976d2', textDecoration: 'none' }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: '#1976d2', textDecoration: 'none' }}>Privacy Policy</Link>
                            </Typography>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 2,
                                mb: 2,
                                height: 50,
                                borderRadius: 2,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem'
                            }}
                            disabled={loading || !termsAccepted}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                            <Link href="/login" passHref legacyBehavior>
                                <Button variant="text" sx={{ textTransform: 'none', fontWeight: 500 }}>
                                    Already have an account? Sign In
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
