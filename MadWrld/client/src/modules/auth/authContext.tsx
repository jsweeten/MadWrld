import React, { createContext, useContext, useState, ReactNode } from 'react';
import IUser from '../../interfaces/IUser';

interface IAuthContext {
    userProfile: IUser | null;
    setUserProfile: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<IUser | null>(null);

    return (
        <AuthContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};