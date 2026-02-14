import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/account'); // Redirect to account/login if not authenticated
            } else if (adminOnly && !isAdmin) {
                router.push('/'); // Redirect to home if not admin but trying to access admin route
            }
        }
    }, [user, loading, isAdmin, router, adminOnly]);

    if (loading || !user || (adminOnly && !isAdmin)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white font-serif tracking-widest uppercase text-xs">
                {loading ? 'Checking authentication...' : 'Redirecting...'}
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
