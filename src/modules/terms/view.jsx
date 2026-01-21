import { Container, Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { FileText, Users, ShieldCheck, Gavel, Scale } from 'lucide-react';

const iconMap = { FileText, Users, ShieldCheck, Gavel };

export default function TermsView({ lastUpdated, termsContent }) {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa', pb: 8 }}>
            <Container maxWidth="md" sx={{ pt: 8 }}>

                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                        Terms of Service
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        Last Updated: <Chip label={lastUpdated} size="small" />
                    </Typography>
                </Box>

                <Card sx={{ borderRadius: 3 }}>
                    <CardContent sx={{ p: 4 }}>
                        {termsContent.map(({ title, icon, points }, i) => {
                            const Icon = iconMap[icon];
                            return (
                                <Box key={i} sx={{ mb: 4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Icon size={22} color="#2563eb" />
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            {title}
                                        </Typography>
                                    </Box>

                                    {points.map((p, j) => (
                                        <Typography key={j} variant="body2" sx={{ mb: 1, color: '#374151', pl: 3 }}>
                                            • {p}
                                        </Typography>
                                    ))}
                                </Box>
                            );
                        })}
                    </CardContent>
                </Card>

                <Card sx={{ mt: 4, bgcolor: '#eff6ff' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Scale size={22} color="#2563eb" />
                            <Box>
                                <Typography sx={{ fontWeight: 600 }}>Acknowledgment</Typography>
                                <Typography variant="body2">
                                    By using TodoPro, you acknowledge that you have read and agree to these Terms.
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

            </Container>
        </Box>
    );
}
