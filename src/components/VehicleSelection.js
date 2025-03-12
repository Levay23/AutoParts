// src/components/VehicleSelection.js
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

const VehicleSelection = ({ setSelectedVehicleType }) => {
    const navigate = useNavigate();
    const vehicles = [
        { type: 'Carros', icon: <DirectionsCarIcon sx={{ fontSize: 40 }} /> },
        { type: 'Camiones', icon: <LocalShippingIcon sx={{ fontSize: 40 }} /> },
        { type: 'Motos', icon: <TwoWheelerIcon sx={{ fontSize: 40 }} /> },
        { type: 'Lanchas', icon: <DirectionsBoatIcon sx={{ fontSize: 40 }} /> }
    ];

    const handleSelectVehicle = (vehicleType) => {
        setSelectedVehicleType(vehicleType);
        navigate('/stores');
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Selecciona un Tipo de Vehículo
            </Typography>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                {vehicles.map(vehicle => (
                    <Grid item xs={12} sm={6} md={3} key={vehicle.type}>
                        <Paper 
                            elevation={3}
                            sx={{
                                p: 3,
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 6
                                }
                            }}
                            onClick={() => handleSelectVehicle(vehicle.type)}
                        >
                            {vehicle.icon}
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                {vehicle.type}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

VehicleSelection.propTypes = {
    setSelectedVehicleType: PropTypes.func.isRequired
};

export default VehicleSelection;
