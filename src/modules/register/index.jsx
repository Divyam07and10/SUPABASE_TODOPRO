'use client';

import React from 'react';
import RegisterView from './view';
import { RegisterProvider } from '@/context/RegisterContext';

export default function RegisterContainer() {
    return (
        <RegisterProvider>
            <RegisterView />
        </RegisterProvider>
    );
}
