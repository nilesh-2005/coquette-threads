import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        loading: true
    });

    useEffect(() => {
        const initializeAuth = () => {
            const storedUser = localStorage.getItem('userInfo');
            setAuthState({
                user: storedUser ? JSON.parse(storedUser) : null,
                loading: false
            });
        };
        initializeAuth();
    }, []);

    const login = (userData) => {
        setAuthState({ user: userData, loading: false });
        localStorage.setItem('userInfo', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
    };

    const logout = () => {
        setAuthState({ user: null, loading: false });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{
            user: authState.user,
            isAdmin: authState.user?.role === 'admin' || authState.user?.isAdmin || false,
            role: authState.user?.role || 'user',
            login,
            logout,
            loading: authState.loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
