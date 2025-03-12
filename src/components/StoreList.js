// src/components/StoreList.js
import React from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Button,
    Alert,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    CardActions,
    IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useAuth } from '../contexts/AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addFavoriteStore } from '../services/userService';

const StoreList = ({ stores, selectedVehicleType, loading }) => {
    const navigate = useNavigate();
    const { isAdmin, currentUser } = useAuth();

    const handleAddFavorite = async (storeId) => {
        try {
            await addFavoriteStore(currentUser.uid, storeId);
            console.log('Store added to favorites');
        } catch (error) {
            console.error('Error adding store to favorites:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!selectedVehicleType) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                    Por favor, selecciona un tipo de vehículo para ver las tiendas disponibles.
                </Alert>
                <Button
                    variant="contained"
                    startIcon={<DirectionsCarIcon />}
                    onClick={() => navigate('/vehicles')}
                >
                    Seleccionar Vehículo
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Tiendas para {selectedVehicleType}
                    </Typography>
                    <Box>
                        <Button
                            variant="outlined"
                            startIcon={<DirectionsCarIcon />}
                            onClick={() => navigate('/vehicles')}
                            sx={{ mr: 2 }}
                        >
                            Cambiar Vehículo
                        </Button>
                        {isAdmin && (
                            <Button 
                                variant="contained" 
                                startIcon={<AddBusinessIcon />}
                                onClick={() => navigate('/add-store')}
                            >
                                Agregar Tienda
                            </Button>
                        )}
                    </Box>
                </Box>

                {stores.length === 0 ? (
                    <Alert severity="info">
                        No hay tiendas disponibles para {selectedVehicleType}.
                    </Alert>
                ) : (
                    <TableContainer component={Paper} elevation={2}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Ubicación</TableCell>
                                    <TableCell>Teléfono</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Horario</TableCell>
                                    <TableCell>Descripción</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stores.map((store) => (
                                    <TableRow
                                        key={store.id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                                cursor: 'pointer'
                                            }
                                        }}
                                    >
                                        <TableCell>{store.name}</TableCell>
                                        <TableCell>{store.location}</TableCell>
                                        <TableCell>{store.phone}</TableCell>
                                        <TableCell>{store.email}</TableCell>
                                        <TableCell>{store.hours}</TableCell>
                                        <TableCell>{store.description}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => navigate(`/store/${store.id}`)}
                                            >
                                                Ver Detalles
                                            </Button>
                                            <IconButton color="primary" onClick={() => handleAddFavorite(store.id)}>
                                                <FavoriteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Container>
    );
};

StoreList.propTypes = {
    stores: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            phone: PropTypes.string,
            email: PropTypes.string,
            hours: PropTypes.string,
            description: PropTypes.string,
            vehicleTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
            products: PropTypes.array
        })
    ).isRequired,
    selectedVehicleType: PropTypes.string,
    loading: PropTypes.bool
};

export default StoreList;