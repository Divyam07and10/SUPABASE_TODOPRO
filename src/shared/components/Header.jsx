'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Box, IconButton,
  Avatar, Menu, MenuItem, Tooltip,
  ListItemIcon, Divider, Button
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import { useAuth } from '@/shared/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(null);
  }, [pathname, user]);

  if (!user) return null;

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const navigateTo = (path) => {
    handleMenuClose();
    router.push(path);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
      <Toolbar>
        <Box
          sx={{ flex: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigateTo('/')}
        >
          <HomeIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            TodoPro
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigateTo('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigateTo('/profile')}>Profile</Button>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip title={user.email || 'Account'}>
            <IconButton onClick={handleMenuOpen} size="small">
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontWeight: 'bold' }}>
                {user.profile?.name
                  ? user.profile.name.charAt(0).toUpperCase()
                  : (user.email ? user.email.charAt(0).toUpperCase() : <AccountCircleIcon />)}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigateTo('/profile')}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout}>
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
