'use client';

import TodoDashboard from '@/modules/dashboard';
import { useAuth } from '@/context/AuthContext';
import { TodoProvider } from '@/context/TodoContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    return (
        <TodoProvider>
            <TodoDashboard />
        </TodoProvider>
    );
}
