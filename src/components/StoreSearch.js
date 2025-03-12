import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchFilter from './SearchFilter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StoreIcon from '@mui/icons-material/Store';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const AVAILABLE_PARTS = {
    'Motor': [
        'Filtro de Aceite',
        'Filtro de Aire',
        'Bujías',
        'Correa de Distribución',
        'Kit de Embrague',
        'Bomba de Agua',
        'Radiador'
    ],
    'Frenos': [
        'Pastillas de Freno',
        'Discos de Freno',
        'Líquido de Frenos',
        'Zapatas de Freno',
        'Cilindro de Freno'
    ],
    'Suspensión': [
        'Amortiguadores',
        'Resortes',
        'Rótulas',
        'Brazos de Suspensión',
        'Bujes'
    ],
    'Eléctrico': [
        'Batería',
        'Alternador',
        'Motor de Arranque',
        'Bobina de Encendido',
        'Sensores Varios'
    ],
    'Transmisión': [
        'Aceite de Transmisión',
        'Caja de Cambios',
        'Diferencial',
        'Juntas Homocinéticas',
        'Rodamientos'
    ]
};

const StoreSearch = ({ stores }) => {
    const navigate = useNavigate();
    const [filteredStores, setFilteredStores] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (filtros) => {
        const filtered = stores.filter(store => {
            // Verificar si la tienda tiene el repuesto específico
            const hasSpecificPart = store.products.some(product => 
                (!filtros.repuestoEspecifico || product.name === filtros.repuestoEspecifico) &&
                (!filtros.categoriaRepuesto || product.category === filtros.categoriaRepuesto)
            );

            // Verificar si la tienda está en el estado seleccionado
            const matchesState = !filtros.estado || store.estado === filtros.estado;

            // Verificar si la tienda maneja el tipo de vehículo seleccionado
            const matchesVehicleType = !filtros.tipoVehiculo || 
                store.tiposVehiculo.includes(filtros.tipoVehiculo);

            // Verificar si la tienda maneja la marca de vehículo seleccionada
            const matchesBrand = !filtros.marca || store.marcasVehiculo.includes(filtros.marca);

            return hasSpecificPart && matchesState && matchesVehicleType && matchesBrand;
        });

        setFilteredStores(filtered);
        setHasSearched(true);
    };

    return (
        <Box>
            <SearchFilter onSearch={handleSearch} />
            
            {hasSearched && (
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Resultados de la búsqueda
                    </Typography>
                    
                    {filteredStores.length === 0 ? (
                        <Box sx={{ 
                            textAlign: 'center', 
                            py: 4,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            boxShadow: 1
                        }}>
                            <Typography variant="h6" color="text.secondary">
                                No se encontraron tiendas que coincidan con tu búsqueda
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {filteredStores.map((store) => (
                                <Grid item xs={12} key={store.id}>
                                    <Card 
                                        elevation={3}
                                        sx={{
                                            '&:hover': {
                                                boxShadow: 6,
                                                transform: 'translateY(-2px)',
                                                transition: 'all 0.3s'
                                            }
                                        }}
                                    >
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={8}>
                                                    <Typography variant="h6" gutterBottom>
                                                        <StoreIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                                        {store.name}
                                                    </Typography>
                                                    
                                                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                                        <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                                        <Typography variant="body1" color="text.secondary">
                                                            {store.location}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ mb: 1 }}>
                                                        <PhoneIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'text.secondary' }} />
                                                        <Typography variant="body2" component="span">
                                                            {store.phone}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ mb: 2 }}>
                                                        <EmailIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'text.secondary' }} />
                                                        <Typography variant="body2" component="span">
                                                            {store.email}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                        {store.vehicleTypes.map((type) => (
                                                            <Chip
                                                                key={type}
                                                                label={type}
                                                                size="small"
                                                                color="primary"
                                                                variant="outlined"
                                                            />
                                                        ))}
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={12} md={4} sx={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'flex-end'
                                                }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => navigate(`/store/${store.id}`)}
                                                        sx={{ minWidth: 200 }}
                                                    >
                                                        Ver Detalles
                                                    </Button>
                                                    <Typography 
                                                        variant="body2" 
                                                        color="text.secondary"
                                                        sx={{ mt: 1 }}
                                                    >
                                                        {store.products.length} productos disponibles
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            )}
        </Box>
    );
};

export default StoreSearch; 