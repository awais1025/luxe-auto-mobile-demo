import { createContext, useState } from 'react';


export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usager, setUsager] = useState(null);

    const login = (data) => setUsager(data);
    const logout = () => setUsager(null);

    return (
        <AuthContext.Provider value={{ usager, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}