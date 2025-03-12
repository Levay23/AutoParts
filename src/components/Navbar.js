// src/components/Navbar.js
import React from 'react';
import PropTypes from 'prop-types';
import { 
    AppBar, 
    Toolbar, 
    Button, 
    Box, 
    Typography,
    Container,
    IconButton,
    useScrollTrigger,
    Slide
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../contexts/AuthContext';

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAdmin } = useAuth();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const buttonStyle = (path) => ({
        color: 'inherit',
        mx: 1,
        borderRadius: 2,
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        backgroundColor: isActive(path) ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
    });

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <HideOnScroll>
            <AppBar 
                position="sticky" 
                elevation={0}
                sx={{
                    backgroundColor: 'primary.main',
                    borderBottom: '1px solid',
                    borderColor: 'primary.dark',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                sx={{ mr: 2 }}
                                onClick={() => navigate('/')}
                            >
                                <StoreIcon />
                            </IconButton>
                            <Typography 
                                variant="h6" 
                                component="div"
                                sx={{ 
                                    display: { xs: 'none', sm: 'block' },
                                    fontWeight: 600
                                }}
                            >
                                Auto Parts
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button 
                                sx={buttonStyle('/stores')}
                                onClick={() => navigate('/stores')}
                            >
                                <StoreIcon sx={{ fontSize: 20 }} />
                                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    Tiendas
                                </Typography>
                            </Button>
                            
                            {isAdmin && (
                                <Button 
                                    sx={buttonStyle('/add-store')}
                                    onClick={() => navigate('/add-store')}
                                >
                                    <AddBusinessIcon sx={{ fontSize: 20 }} />
                                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        Agregar Tienda
                                    </Typography>
                                </Button>
                            )}

                            <Button 
                                onClick={() => navigate('/profile')}
                                sx={{
                                    ...buttonStyle(''),
                                    ml: 2,
                                    border: '1px solid',
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                }}
                            >
                                <AccountCircleIcon sx={{ fontSize: 20 }} />
                                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    Perfil
                                </Typography>
                            </Button>

                            <Button 
                                onClick={handleLogout}
                                sx={{
                                    ...buttonStyle(''),
                                    ml: 2,
                                    border: '1px solid',
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                }}
                            >
                                <LogoutIcon sx={{ fontSize: 20 }} />
                                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    Cerrar Sesión
                                </Typography>
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </HideOnScroll>
    );
};

Navbar.propTypes = {
    onLogout: PropTypes.func.isRequired
};

export default Navbar;
