// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import StoreList from './components/StoreList';
import AddStore from './components/AddStore';
import StoreDetails from './components/StoreDetails';
import ProductDetails from './components/ProductDetails';
import StoreSearch from './components/StoreSearch';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { getStores } from './services/storeService';
import Profile from './components/Profile';

function PrivateRoute({ children }) {
    const { currentUser, loading } = useAuth();
    
    if (loading) {
        return null; // O un componente de loading
    }
    
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    
    return children;
}

function AppContent() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(() => {
        const loadStores = async () => {
            try {
                const storesData = await getStores();
                setStores(storesData);
            } catch (error) {
                console.error('Error loading stores:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStores();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <>
                            <Navbar onLogout={handleLogout} />
                            <StoreSearch stores={stores} />
                        </>
                    </PrivateRoute>
                }
            />
            <Route
                path="/stores"
                element={
                    <PrivateRoute>
                        <>
                            <Navbar onLogout={handleLogout} />
                            <StoreSearch stores={stores} />
                        </>
                    </PrivateRoute>
                }
            />
            <Route
                path="/add-store"
                element={
                    <PrivateRoute>
                        <>
                            <Navbar onLogout={handleLogout} />
                            <AddStore setStores={setStores} />
                        </>
                    </PrivateRoute>
                }
            />
            <Route
                path="/store/:storeId"
                element={
                    <PrivateRoute>
                        <>
                            <Navbar onLogout={handleLogout} />
                            <StoreDetails stores={stores} />
                        </>
                    </PrivateRoute>
                }
            />
            <Route
                path="/store/:storeId/product/:productId"
                element={
                    <PrivateRoute>
                        <>
                            <Navbar onLogout={handleLogout} />
                            <ProductDetails stores={stores} />
                        </>
                    </PrivateRoute>
                }
            />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
