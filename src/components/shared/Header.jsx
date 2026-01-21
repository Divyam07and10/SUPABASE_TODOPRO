'use client';

import React from 'react';
import {
  AppBar, Toolbar, Typography, Box, IconButton,
  Avatar, Menu, MenuItem, Tooltip,
  ListItemIcon, Divider, Button
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (!user) return null;

  const open = Boolean(anchorEl);

  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
      <Toolbar>

        <Box
          sx={{ flex: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => router.push('/')}
        >
          <HomeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            TodoPro
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => router.push('/')}>Home</Button>
          <Button color="inherit" onClick={() => router.push('/profile')}>Profile</Button>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip title={user.email || 'Account'}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.email
                  ? user.email.charAt(0).toUpperCase()
                  : <AccountCircleIcon />}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => router.push('/profile')}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>

          <Divider />

          <MenuItem onClick={logout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
}
