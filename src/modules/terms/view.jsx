'use client';

import { Container, Typography, Box, Card, CardContent, Grid, Chip } from '@mui/material';
import { FileText, Users, Shield, Gavel, Scale, AlertTriangle } from 'lucide-react';

const iconMap = {
    FileText: FileText,
    Users: Users,
    Shield: Shield,
    Gavel: Gavel,
    AlertTriangle: AlertTriangle,
    Scale: Scale,
};

export default function TermsView({ lastUpdated, sections }) {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa', pb: 8 }}>
            <Container maxWidth="lg" sx={{ pt: 8, px: { xs: 2, sm: 3, lg: 4 } }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 800, color: '#111827', mb: 2 }}>
                        Terms of Service
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        Last Updated: <Chip label={lastUpdated} variant="filled" size="small" sx={{ ml: 1, bgcolor: '#e5e7eb', fontWeight: 500 }} />
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {sections.map((section, index) => {
                        const Icon = iconMap[section.icon];
                        return (
                            <Grid item xs={12} lg={6} key={index}>
                                <Card sx={{ height: '100%', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 }, borderRadius: 2 }}>
                                    <CardContent sx={{ p: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Icon size={40} color="#2563eb" style={{ marginBottom: '16px' }} />
                                        </Box>
                                        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: '#111827', mb: 2 }}>
                                            {section.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            {section.content.map((paragraph, pIndex) => (
                                                <Typography key={pIndex} variant="body2" sx={{ color: '#4b5563', lineHeight: 1.6 }}>
                                                    {paragraph}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

                <Card sx={{ mt: 4, bgcolor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 2, boxShadow: 'none' }}>
                    <CardContent sx={{ pt: 3, pb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Scale size={24} color="#2563eb" style={{ marginTop: '4px' }} />
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e3a8a', mb: 1 }}>
                                    Acknowledgment
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#1e40af', fontSize: '0.875rem' }}>
                                    By using TodoPro, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. You also acknowledge that these terms may be updated from time to time, and continued use of the service constitutes acceptance of any modifications.
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
