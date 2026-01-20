'use client';

import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Tooltip,
    ListItemIcon,
    Divider
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

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleCloseMenu();
        router.push('/profile');
    };

    const handleLogout = () => {
        handleCloseMenu();
        logout();
    };

    return (
        <AppBar position="fixed" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
            <Toolbar>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => router.push('/')}
                >
                    <HomeIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h6"
                        sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
                    >
                        TodoPro
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Tooltip title={user.email || 'Account'}>
                    <IconButton
                        onClick={handleOpenMenu}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {user.email ? user.email.charAt(0).toUpperCase() : <AccountCircleIcon />}
                        </Avatar>
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleCloseMenu}
                    onClick={handleCloseMenu}
                    PaperProps={{
                        elevation: 3,
                        sx: {
                            mt: 1.5,
                            overflow: 'visible',
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleProfile}>
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

