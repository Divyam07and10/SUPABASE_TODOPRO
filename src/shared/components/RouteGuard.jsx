'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/shared/context/AuthContext';

const PUBLIC_PATHS = ['/login', '/register', '/terms', '/privacy'];

export default function RouteGuard({ children }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path || pathname?.startsWith(path + '/'));

    useEffect(() => {
        if (loading) return;

        if (!user && !isPublicPath) {
            router.replace('/login');
        }
    }, [user, loading, isPublicPath, router]);

    if (loading) {
        return null;
    }

    if (!user && !isPublicPath) {
        return null;
    }

    return <>{children}</>;
}
