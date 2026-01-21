'use client';

import { Container, Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { Database, Eye, Lock, UserCheck, Globe } from 'lucide-react';

const icons = { Database, Eye, Lock, UserCheck };

export default function PrivacyView({ lastUpdated, sections }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f3f4f6', py: 8 }}>
      <Container maxWidth="md">

        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight={800}>
            Privacy Policy
          </Typography>
          <Chip label={`Last Updated: ${lastUpdated}`} sx={{ mt: 1 }} />
        </Box>

        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: 5 }}>

            {sections.map(({ title, icon, points }, i) => {
              const Icon = icons[icon];

              return (
                <Box key={i} mb={5}>

                  <Box display="flex" gap={1.5} mb={2}>
                    <Icon size={26} color="#2563eb" />
                    <Typography variant="h5" fontWeight={700}>
                      {title}
                    </Typography>
                  </Box>

                  {points.map((p, j) => (
                    <Box key={j} mb={2} pl={2}>
                      <Typography fontWeight={600} fontSize="1.05rem">
                        • {p.subtitle}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ pl: 2 }}
                      >
                        → {p.text}
                      </Typography>
                    </Box>
                  ))}

                </Box>
              );
            })}

          </CardContent>
        </Card>

        <Card sx={{ mt: 4, bgcolor: '#eff6ff' }}>
          <CardContent>
            <Box display="flex" gap={2}>
              <Globe size={22} color="#2563eb" />
              <Box>
                <Typography fontWeight={700}>
                  Policy Updates
                </Typography>
                <Typography variant="body2">
                  We may update this privacy policy from time to time. Continued use
                  of the service indicates your acceptance of the changes.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

      </Container>
    </Box>
  );
}
