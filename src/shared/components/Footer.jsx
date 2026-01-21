'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useAuth } from '@/shared/context/AuthContext';

export default function Footer() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[100], textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
                &copy; {new Date().getFullYear()} TodoPro. All rights reserved.
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.875rem' }}>
                    Terms
                </Link>
                <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.875rem' }}>
                    Privacy Policy
                </Link>
            </Box>
        </Box>
    );
}
