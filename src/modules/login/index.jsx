'use client';

import React from 'react';
import LoginView from './view';
import { LoginProvider } from '@/context/LoginContext';

export default function LoginContainer() {
    return (
        <LoginProvider>
            <LoginView />
        </LoginProvider>
    );
}
