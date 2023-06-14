import React, { createContext, useState, useEffect, useContext } from 'react';

import api from '../services/api';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storagedUser = sessionStorage.getItem('@App:user');
        const storagedToken = sessionStorage.getItem('@App:token');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
    }, []);

    async function Login(userData,remember) {
        const response = await api.post('login', userData);

        setUser(response.data.user);
        api.defaults.headers.Authorization = `Bearer ${response.data.authorisation.token}`;

        if(remember){
            sessionStorage.setItem('@App:user', JSON.stringify(response.data.user));
            sessionStorage.setItem('@App:token', response.data.authorisation.token);
        }
    }

    function Logout() {
        setUser(null);
        sessionStorage.setItem('@App:user', "");
        sessionStorage.setItem('@App:token', "");
    }

    return (
        <AuthContext.Provider
            value={{ signed: Boolean(user), user, Login, Logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}