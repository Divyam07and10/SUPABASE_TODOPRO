import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

export default function ProfileStats({ stats }) {
    return (
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
    );
}
