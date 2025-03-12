import React from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = ({ stores }) => {
    const { storeId, productId } = useParams();
    const navigate = useNavigate();
    
    const store = stores.find(s => s.id === parseInt(storeId));
    const product = store?.products.find(p => p.id === parseInt(productId));

    if (!store || !product) {
        return (
            <Container>
                <Typography variant="h5" color="error" align="center" sx={{ mt: 4 }}>
                    Producto no encontrado
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate(`/store/${storeId}`)}
                    sx={{ mb: 2 }}
                >
                    Volver a la tienda
                </Button>

                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                        ${product.price}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                Información General
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText 
                                        primary="Categoría" 
                                        secondary={product.category}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Descripción" 
                                        secondary={product.description}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Stock Disponible" 
                                        secondary={`${product.stock} unidades`}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                Especificaciones
                            </Typography>
                            <List>
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <ListItem key={key}>
                                        <ListItemText 
                                            primary={key.charAt(0).toUpperCase() + key.slice(1)} 
                                            secondary={value}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            Disponible en: {store.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Ubicación: {store.location}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

ProductDetails.propTypes = {
    stores: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            products: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    price: PropTypes.number.isRequired,
                    description: PropTypes.string.isRequired,
                    category: PropTypes.string.isRequired,
                    stock: PropTypes.number.isRequired,
                    specifications: PropTypes.object.isRequired
                })
            ).isRequired
        })
    ).isRequired
};

export default ProductDetails; 