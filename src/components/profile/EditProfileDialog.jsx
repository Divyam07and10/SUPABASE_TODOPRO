import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, MenuItem, Button } from '@mui/material';

export default function EditProfileDialog({ open, onClose, formData, onFormChange, onFormSubmit, saving }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 700 }}>Edit Profile</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={onFormSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Full Name"
                        name="name"
                        fullWidth
                        value={formData.name || ''}
                        onChange={onFormChange}
                    />
                    <TextField
                        label="Phone Number"
                        name="phone_no"
                        fullWidth
                        value={formData.phone_no || ''}
                        onChange={onFormChange}
                    />
                    <TextField
                        label="Gender"
                        name="gender"
                        select
                        fullWidth
                        value={formData.gender || ''}
                        onChange={onFormChange}
                    >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={onFormSubmit} variant="contained" disabled={saving}>Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
}
