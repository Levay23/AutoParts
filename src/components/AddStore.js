// src/components/AddStore.js
import React, { useState } from 'react';
import { 
    TextField, 
    Button, 
    Typography, 
    Container, 
    Grid, 
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Alert,
    Fade,
    Divider,
    IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addStore } from '../services/storeService';
import { useAuth } from '../contexts/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const VEHICLE_TYPES = ['Carros', 'Camiones', 'Motos', 'Lanchas'];

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

const CATEGORIAS_REPUESTOS = {
    'Motor': [
        'Pistones', 'Anillos', 'Válvulas', 'Bomba de Aceite', 'Cigüeñal',
        'Árbol de Levas', 'Culata', 'Bloque de Motor', 'Cárter'
    ],
    'Sistema de Frenos': [
        'Pastillas', 'Discos', 'Tambores', 'Zapatas', 'Cilindro Maestro',
        'Servofreno', 'Líquido de Frenos', 'Cables'
    ],
    'Suspensión': [
        'Amortiguadores', 'Resortes', 'Brazos de Control', 'Rótulas',
        'Bujes', 'Barra Estabilizadora', 'Terminales'
    ],
    'Transmisión': [
        'Embrague', 'Caja de Cambios', 'Diferencial', 'Cardán',
        'Sincronizadores', 'Rodamientos', 'Retenes'
    ],
    'Sistema Eléctrico': [
        'Batería', 'Alternador', 'Motor de Arranque', 'Bobinas',
        'Bujías', 'Cables de Bujía', 'Sensores'
    ],
    'Dirección': [
        'Bomba de Dirección', 'Cremallera', 'Columna', 'Terminales',
        'Guardapolvos', 'Líquido Hidráulico'
    ],
    'Refrigeración': [
        'Radiador', 'Termostato', 'Bomba de Agua', 'Mangueras',
        'Ventilador', 'Depósito'
    ],
    'Carrocería': [
        'Parachoques', 'Guardafangos', 'Capó', 'Puertas', 'Retrovisores',
        'Vidrios', 'Faros', 'Stop'
    ]
};

const AddStore = ({ setStores }) => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [storeData, setStoreData] = useState({
        name: '',
        location: '',
        phone: '',
        email: '',
        hours: '',
        vehicleTypes: [],
        products: [],
        description: '',
        estado: '',
        tiposVehiculo: [],
        marcasVehiculo: [],
        rif: '',
        logo: ''
    });

    const [newProduct, setNewProduct] = useState({
        category: '',
        name: '',
        price: '',
        stock: '',
        description: '',
        image: ''
    });

    const [filtros, setFiltros] = useState({
        estado: '',
        tipoVehiculo: '',
        marca: '',
        categoriaRepuesto: '',
        repuestoEspecifico: ''
    });

    // Redirigir si no es administrador
    React.useEffect(() => {
        if (!isAdmin) {
            navigate('/stores');
        }
    }, [isAdmin, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tiposVehiculo' || name === 'marcasVehiculo') {
            setStoreData(prev => ({
                ...prev,
                [name]: typeof value === 'string' ? value.split(',') : value
            }));
        } else {
            setStoreData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProductImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct(prev => ({
                    ...prev,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = () => {
        if (!newProduct.category || !newProduct.name || !newProduct.price || !newProduct.stock) {
            setError('Por favor, complete todos los campos del producto');
            setTimeout(() => setError(''), 3000);
            return;
        }

        const productToAdd = {
            id: Date.now(),
            ...newProduct,
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock)
        };

        setStoreData(prev => ({
            ...prev,
            products: [...prev.products, productToAdd]
        }));

        setNewProduct({
            category: '',
            name: '',
            price: '',
            stock: '',
            description: '',
            image: ''
        });
    };

    const handleRemoveProduct = (productId) => {
        setStoreData(prev => ({
            ...prev,
            products: prev.products.filter(product => product.id !== productId)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos obligatorios de la tienda
        if (!storeData.name || !storeData.location || !storeData.phone || !storeData.email || !storeData.hours) {
            setError('Por favor, complete todos los campos obligatorios de la tienda');
            setTimeout(() => setError(''), 3000);
            return;
        }

        // Validar que haya al menos un tipo de vehículo seleccionado
        if (storeData.tiposVehiculo.length === 0) {
            setError('Por favor, selecciona al menos un tipo de vehículo');
            setTimeout(() => setError(''), 3000);
            return;
        }

        // Validar que haya al menos un producto agregado
        if (storeData.products.length === 0) {
            setError('Por favor, agrega al menos un producto');
            setTimeout(() => setError(''), 3000);
            return;
        }

        try {
            setLoading(true);
            const newStore = {
                ...storeData,
                id: Date.now().toString(),
                products: storeData.products.map(product => ({
                    ...product,
                    id: product.id.toString()
                }))
            };
            await addStore(newStore);
            setStores(prevStores => [...prevStores, newStore]);
            navigate('/stores');
        } catch (error) {
            setError('Error al agregar la tienda: ' + error.message);
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]: value,
            // Reset repuestoEspecifico when categoriaRepuesto changes
            ...(name === 'categoriaRepuesto' ? { repuestoEspecifico: '' } : {})
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length) {
            // Handle file upload logic here
            console.log('Files selected:', files);
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStoreData(prev => ({
                    ...prev,
                    logo: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
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

    if (!isAdmin) {
        return null;
    }

    return (
        <Container component="main" maxWidth="md">
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    marginTop: 8,
                    marginBottom: 4 
                }}
            >
                <Typography component="h1" variant="h5" gutterBottom>
                    Agregar Tienda
                </Typography>

                {error && (
                    <Fade in={Boolean(error)}>
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    </Fade>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Información de la Tienda
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="rif"
                                label="RIF de la Empresa"
                                value={storeData.rif}
                                onChange={handleChange}
                                sx={textFieldSx}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="logo-upload"
                                type="file"
                                onChange={handleLogoChange}
                            />
                            <label htmlFor="logo-upload">
                                <Button variant="contained" component="span">
                                    Subir Logo de la Empresa
                                </Button>
                            </label>
                            {storeData.logo && (
                                <Box mt={2}>
                                    <img src={storeData.logo} alt="Logo de la Empresa" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                                </Box>
                            )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                name="name"
                                label="Nombre de la tienda"
                                value={storeData.name}
                                onChange={handleChange}
                                sx={textFieldSx}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required sx={textFieldSx}>
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    name="estado"
                                    value={storeData.estado}
                                    onChange={handleChange}
                                    label="Estado"
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
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="location"
                                name="location"
                                label="Dirección específica"
                                value={storeData.location}
                                onChange={handleChange}
                                sx={textFieldSx}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                name="phone"
                                label="Teléfono"
                                value={storeData.phone}
                                onChange={handleChange}
                                inputProps={{
                                    pattern: "[0-9]{10}",
                                    title: "Por favor ingrese un número de teléfono válido de 10 dígitos"
                                }}
                                sx={textFieldSx}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                name="email"
                                type="email"
                                label="Correo electrónico"
                                value={storeData.email}
                                onChange={handleChange}
                                sx={textFieldSx}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="hours"
                                name="hours"
                                label="Horario de atención"
                                value={storeData.hours}
                                onChange={handleChange}
                                placeholder="Ej: Lun-Vie 9:00-18:00"
                                sx={textFieldSx}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required sx={textFieldSx}>
                                <InputLabel>Tipos de Vehículos</InputLabel>
                                <Select
                                    name="tiposVehiculo"
                                    multiple
                                    value={storeData.tiposVehiculo}
                                    onChange={handleChange}
                                    label="Tipos de Vehículos"
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
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
                            <FormControl fullWidth required sx={textFieldSx}>
                                <InputLabel>Marcas de Vehículos</InputLabel>
                                <Select
                                    name="marcasVehiculo"
                                    multiple
                                    value={storeData.marcasVehiculo}
                                    onChange={handleChange}
                                    label="Marcas de Vehículos"
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {MARCAS_VEHICULO.map((marca) => (
                                        <MenuItem key={marca} value={marca}>
                                            {marca}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="description"
                                name="description"
                                label="Descripción"
                                value={storeData.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                sx={textFieldSx}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="h6" gutterBottom>
                                Productos
                            </Typography>
                        </Grid>

                        {/* Formulario de nuevo producto */}
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth required sx={textFieldSx}>
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleProductChange}
                                    label="Categoría"
                                >
                                    {Object.keys(AVAILABLE_PARTS).map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth required sx={textFieldSx}>
                                <InputLabel>Nombre del Producto</InputLabel>
                                <Select
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleProductChange}
                                    label="Nombre del Producto"
                                    disabled={!newProduct.category}
                                >
                                    {newProduct.category && AVAILABLE_PARTS[newProduct.category].map((part) => (
                                        <MenuItem key={part} value={part}>
                                            {part}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="price"
                                label="Precio"
                                type="number"
                                value={newProduct.price}
                                onChange={handleProductChange}
                                InputProps={{
                                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                                }}
                                sx={textFieldSx}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="stock"
                                label="Stock"
                                type="number"
                                value={newProduct.stock}
                                onChange={handleProductChange}
                                sx={textFieldSx}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="description"
                                label="Descripción del producto"
                                value={newProduct.description}
                                onChange={handleProductChange}
                                sx={textFieldSx}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="product-image-upload"
                                type="file"
                                onChange={handleProductImageChange}
                            />
                            <label htmlFor="product-image-upload">
                                <Button variant="contained" component="span">
                                    Subir Imagen del Producto
                                </Button>
                            </label>
                            {newProduct.image && (
                                <Box mt={2}>
                                    <img src={newProduct.image} alt="Vista previa" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddProduct}
                                sx={{ mt: 1 }}
                            >
                                Agregar Producto
                            </Button>
                        </Grid>

                        {/* Lista de productos agregados */}
                        {storeData.products.length > 0 && (
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                                    Productos Agregados:
                                </Typography>
                                <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                                    {storeData.products.map((product) => (
                                        <Box
                                            key={product.id}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                p: 1,
                                                mb: 1,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 1
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="subtitle2">
                                                    {product.name} - {product.category}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Precio: ${product.price} | Stock: {product.stock}
                                                </Typography>
                                            </Box>
                                            <IconButton
                                                onClick={() => handleRemoveProduct(product.id)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                        )}
                    </Grid>

                    <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 3, mb: 2, boxShadow: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Agregando...' : 'Agregar Tienda'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AddStore;
