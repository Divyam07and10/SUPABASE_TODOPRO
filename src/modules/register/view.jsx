'use client';

import React from 'react';
import { Container, Box, Typography, TextField, Button, Avatar, Paper, CircularProgress, MenuItem, Checkbox, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Link from 'next/link';
import { useRegister } from '@/context/RegisterContext';

export default function RegisterView() {
    const {
        loading,
        showPassword,
        showConfirmPassword,
        termsAccepted,
        formErrors,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
        setTerms,
        handleRegister
    } = useRegister();

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{ mt: 3, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <PersonAddOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
                        Sign up
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 3, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="phone_no"
                        label="Phone Number"
                        name="phone_no"
                        autoComplete="tel"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="gender"
                        name="gender"
                        label="Gender"
                        select
                        defaultValue=""
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
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        error={!!formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Checkbox
                            color="primary"
                            checked={termsAccepted}
                            onChange={(e) => setTerms(e.target.checked)}
                            sx={{ p: 0, mr: 1.5 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            I agree to the <Link href="/terms" style={{ color: '#1976d2', textDecoration: 'none' }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: '#1976d2', textDecoration: 'none' }}>Privacy Policy</Link>
                        </Typography>
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, height: 48 }}
                        disabled={loading || !termsAccepted}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href="/login" passHref legacyBehavior>
                            <Button variant="text" size="small">
                                Already have an account? Sign In
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
