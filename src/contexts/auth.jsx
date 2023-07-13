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

    async function Login(userData, remember) {
        const response = await api.post('login', userData);

        setUser(response.data.user);
        api.defaults.headers.Authorization = `Bearer ${response.data.authorisation.token}`;
        sessionStorage.setItem('@App:token', response.data.authorisation.token);

        if (remember) {
            sessionStorage.setItem('@App:user', JSON.stringify(response.data.user));
        }
    }

    async function Register(userData) {
        console.log(userData);
        // const response = await api.post('user', userData);

        // await Login({ email: userData.email, password: userData.password });
    }

    function Logout() {
        setUser(null);
        sessionStorage.setItem('@App:user', "");
    }

    return (
        <AuthContext.Provider
            value={{ signed: Boolean(user), user, Login, Logout, Register }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}