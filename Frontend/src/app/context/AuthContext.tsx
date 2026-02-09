import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'normal' | 'super' | null;

interface User {
  email: string;
  name: string;
  role: UserRole;
  isSuperUserEnabled: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
  toggleSuperUser: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Mock login - in production, this would call an API
    setUser({
      email,
      name: email.split('@')[0],
      role: 'normal',
      isSuperUserEnabled: false,
    });
  };

  const signup = (email: string, password: string, name: string) => {
    // Mock signup - in production, this would call an API
    setUser({
      email,
      name,
      role: 'normal',
      isSuperUserEnabled: false,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSuperUser = () => {
    if (user) {
      setUser({
        ...user,
        isSuperUserEnabled: !user.isSuperUserEnabled,
        role: !user.isSuperUserEnabled ? 'super' : 'normal',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        toggleSuperUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}