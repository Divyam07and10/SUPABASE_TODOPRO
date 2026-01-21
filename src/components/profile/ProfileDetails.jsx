import React from 'react';
import { Paper, Grid, Avatar, Typography, Box, Button } from '@mui/material';
import { Edit2 } from 'lucide-react';

export default function ProfileDetails({ profile, joinDate, onEditClick }) {
    return (
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
                        onClick={onEditClick}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        Edit Profile
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
