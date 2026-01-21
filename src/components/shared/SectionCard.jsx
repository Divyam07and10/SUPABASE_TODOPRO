import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { Shield, Eye, Lock, UserCheck, Database, Globe, FileText, Users, Gavel, Scale, AlertTriangle } from 'lucide-react';

const iconMap = {
    Shield, Eye, Lock, UserCheck, Database, Globe,
    FileText, Users, Gavel, Scale, AlertTriangle
};

const SectionCard = ({ title, icon, content }) => {
    const Icon = iconMap[icon] || Shield;

    return (
        <Card sx={{ height: '100%', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 }, borderRadius: 2 }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Icon size={40} color="#2563eb" style={{ marginBottom: '16px' }} />
                </Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: '#111827', mb: 2 }}>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {content.map((item, index) => {
                        if (typeof item === 'string') {
                            return (
                                <Typography key={index} variant="body2" sx={{ color: '#4b5563', lineHeight: 1.6 }}>
                                    {item}
                                </Typography>
                            );
                        } else {
                            return (
                                <Box key={index}>
                                    {item.subtitle && (
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}>
                                            {item.subtitle}
                                        </Typography>
                                    )}
                                    <Typography variant="body2" sx={{ color: '#4b5563', lineHeight: 1.6 }}>
                                        {item.text}
                                    </Typography>
                                </Box>
                            );
                        }
                    })}
                </Box>
            </CardContent>
        </Card>
    );
};

export default SectionCard;
