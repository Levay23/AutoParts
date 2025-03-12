import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ESTADOS_VENEZUELA = [
    'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Carabobo',
    'Cojedes', 'Delta Amacuro', 'Distrito Capital', 'Falcón', 'Guárico', 'Lara',
    'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa', 'Sucre', 'Táchira',
    'Trujillo', 'Vargas', 'Yaracuy', 'Zulia'
];

const TIPOS_VEHICULO = [
    'Sedan', 'Hatchback', 'SUV', 'Camioneta', 'Pickup', 'Camión', 'Van',
    'Motocicleta', 'Autobús', 'Deportivo'
];

const MARCAS_VEHICULO = [
    'Toyota', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Nissan',
    'Volkswagen', 'Mazda', 'Mercedes-Benz', 'BMW', 'Audi', 'Jeep', 'Mitsubishi',
    'Suzuki', 'Fiat', 'Renault', 'Peugeot', 'Chery', 'Great Wall'
];

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

const SearchFilter = ({ onSearch }) => {
    const [filtros, setFiltros] = useState({
        estado: '',
        tipoVehiculo: '',
        marca: '',
        categoriaRepuesto: '',
        repuestoEspecifico: ''
    });

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'categoriaRepuesto' ? { repuestoEspecifico: '' } : {})
        }));
    };

    const handleSearch = () => {
        onSearch(filtros);
    };

    const textFieldSx = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#1976d2',
            },
            '&:hover fieldset': {
                borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
            },
        },
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ 
                backgroundColor: 'white', 
                borderRadius: 2,
                boxShadow: 3,
                p: 3,
                mt: 4,
                mb: 4,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-5px)'
                }
            }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Buscar Repuestos
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={textFieldSx}>
                            <InputLabel>¿En qué estado buscas el repuesto?</InputLabel>
                            <Select
                                name="estado"
                                value={filtros.estado}
                                onChange={handleFiltroChange}
                                label="¿En qué estado buscas el repuesto?"
                            >
                                {ESTADOS_VENEZUELA.map((estado) => (
                                    <MenuItem key={estado} value={estado}>
                                        {estado}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={textFieldSx}>
                            <InputLabel>¿Para qué tipo de vehículo?</InputLabel>
                            <Select
                                name="tipoVehiculo"
                                value={filtros.tipoVehiculo}
                                onChange={handleFiltroChange}
                                label="¿Para qué tipo de vehículo?"
                            >
                                {TIPOS_VEHICULO.map((tipo) => (
                                    <MenuItem key={tipo} value={tipo}>
                                        {tipo}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={textFieldSx}>
                            <InputLabel>¿Para qué marca de vehículo?</InputLabel>
                            <Select
                                name="marca"
                                value={filtros.marca}
                                onChange={handleFiltroChange}
                                label="¿Para qué marca de vehículo?"
                            >
                                {MARCAS_VEHICULO.map((marca) => (
                                    <MenuItem key={marca} value={marca}>
                                        {marca}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={textFieldSx}>
                            <InputLabel>¿Qué tipo de repuesto buscas?</InputLabel>
                            <Select
                                name="categoriaRepuesto"
                                value={filtros.categoriaRepuesto}
                                onChange={handleFiltroChange}
                                label="¿Qué tipo de repuesto buscas?"
                            >
                                {Object.keys(AVAILABLE_PARTS).map((categoria) => (
                                    <MenuItem key={categoria} value={categoria}>
                                        {categoria}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth sx={textFieldSx} disabled={!filtros.categoriaRepuesto}>
                            <InputLabel>Repuesto específico</InputLabel>
                            <Select
                                name="repuestoEspecifico"
                                value={filtros.repuestoEspecifico}
                                onChange={handleFiltroChange}
                                label="Repuesto específico"
                            >
                                {filtros.categoriaRepuesto && AVAILABLE_PARTS[filtros.categoriaRepuesto].map((repuesto) => (
                                    <MenuItem key={repuesto} value={repuesto}>
                                        {repuesto}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SearchIcon />}
                            onClick={handleSearch}
                            sx={{ 
                                mt: 2,
                                py: 1.5,
                                backgroundColor: '#1976d2',
                                transition: 'background-color 0.3s, transform 0.3s',
                                '&:hover': {
                                    backgroundColor: '#115293',
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            Buscar Repuestos
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SearchFilter; 