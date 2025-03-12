import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button,
    Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getStoreById } from '../services/storeService';
import { saveVisitedStore } from '../services/userService';

const StoreDetails = ({ stores }) => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const { isAdmin, currentUser } = useAuth();
    
    const store = stores.find(s => s.id === storeId);

    useEffect(() => {
        if (store) {
            saveVisitedStore(currentUser, store);
        }
    }, [store, currentUser]);

    if (!store) {
        return (
            <Container>
                <Typography variant="h5" color="error" gutterBottom>
                    Tienda no encontrada
                </Typography>
                <Button variant="contained" onClick={() => navigate('/stores')}>
                    Volver a la lista de tiendas
                </Button>
            </Container>
        );
    }

    const groupedProducts = store.products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Button
                variant="outlined"
                onClick={() => navigate('/stores')}
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 3 }}
            >
                Volver a la lista de tiendas
            </Button>

            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {store.name}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LocalShippingIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body1">{store.location}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body1">{store.phone}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body1">{store.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body1">{store.hours}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Tipos de Vehículos
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {store.vehicleTypes.map((type) => (
                                <Chip
                                    key={type}
                                    label={type}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                        {store.description && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1" color="text.secondary">
                                    {store.description}
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3 }}>
                Productos Disponibles
            </Typography>

            {Object.entries(groupedProducts).map(([category, products]) => (
                <Box key={category} sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <InventoryIcon sx={{ mr: 1 }} />
                        {category}
                    </Typography>
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid item xs={12} md={4} key={product.id}>
                                <Card elevation={3} sx={{
                                    '&:hover': {
                                        boxShadow: 6,
                                        transform: 'translateY(-5px)',
                                        transition: 'all 0.3s'
                                    }
                                }}>
                                    <CardActionArea onClick={() => navigate(`/store/${store.id}/product/${product.id}`)}>
                                        {product.image && (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                            />
                                        )}
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {product.description || 'Sin descripción'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Precio: ${product.price.toFixed(2)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Stock: {product.stock}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Container>
    );
};

StoreDetails.propTypes = {
    stores: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            phone: PropTypes.string,
            email: PropTypes.string,
            hours: PropTypes.string,
            description: PropTypes.string,
            vehicleTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
            products: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    price: PropTypes.number.isRequired,
                    stock: PropTypes.number.isRequired,
                    description: PropTypes.string,
                    category: PropTypes.string.isRequired
                })
            ).isRequired
        })
    ).isRequired
};

export default StoreDetails; 