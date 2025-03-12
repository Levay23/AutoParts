import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, Paper, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getVisitedStores } from '../services/userService';

const Profile = () => {
    const { currentUser } = useAuth();
    const [visitedStores, setVisitedStores] = useState([]);

    useEffect(() => {
        const fetchVisitedStores = async () => {
            const stores = await getVisitedStores(currentUser.uid);
            setVisitedStores(stores);
        };

        fetchVisitedStores();
    }, [currentUser]);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                    Perfil de Usuario
                </Typography>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Información de Registro</Typography>
                    <Typography>Email: {currentUser.email}</Typography>
                    <Typography>Nombre: {currentUser.displayName || 'No disponible'}</Typography>
                    <Typography>Teléfono: {currentUser.phoneNumber || 'No disponible'}</Typography>
                </Box>

                <Typography variant="h6" sx={{ mt: 4, fontWeight: 'medium' }}>Tiendas Visitadas</Typography>
                <List sx={{ maxHeight: 200, overflow: 'auto', mt: 2, borderRadius: 1, boxShadow: 1 }}>
                    {visitedStores.map(store => (
                        <ListItem key={store.id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                            <ListItemText primary={store.name} secondary={store.location} />
                        </ListItem>
                    ))}
                </List>
                <Button variant="outlined" onClick={() => window.history.back()} sx={{ mt: 3 }}>
                    Volver
                </Button>
            </Paper>
        </Container>
    );
};

export default Profile; 