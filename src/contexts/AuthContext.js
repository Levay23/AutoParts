import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const signup = async (email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Crear un documento de usuario en Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name,
                email,
                role: 'user',
                createdAt: new Date().toISOString()
            });
            return userCredential;
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    const checkAdminStatus = async (user) => {
        if (!user) return false;
        
        // Verificar si es la cuenta de administrador predefinida
        if (user.email === 'levay2@gmail.com') {
            setIsAdmin(true);
            return true;
        }

        // Verificar el rol en Firestore
        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
                setIsAdmin(true);
                return true;
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
        }

        setIsAdmin(false);
        return false;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await checkAdminStatus(user);
            } else {
                setIsAdmin(false);
            }
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        isAdmin,
        signup,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 