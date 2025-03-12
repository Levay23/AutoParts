// src/components/Register.js
import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Paper,
    InputAdornment,
    IconButton,
    Alert,
    Fade
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setTimeout(() => setError(''), 3000);
            return;
        }

        try {
            setError('');
            setLoading(true);
            await signup(formData.email, formData.password, formData.name);
            navigate('/');
        } catch (error) {
            console.error('Error al registrar:', error);
            setError('Error al registrar: ' + (error.message || 'Por favor, intenta de nuevo'));
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: '100%',
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: 65,
                            height: 65,
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 2,
                        }}
                    >
                        <PersonAddIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Box>

                    <Typography component="h1" variant="h5" gutterBottom>
                        Crear una cuenta
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Regístrate para acceder a Auto Parts
                    </Typography>

                    {error && (
                        <Fade in={Boolean(error)}>
                            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                                {error}
                            </Alert>
                        </Fade>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nombre completo"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={formData.name}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                            <TextField
                            margin="normal"
                                required
                                fullWidth
                            id="email"
                                label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                            <TextField
                            margin="normal"
                                required
                                fullWidth
                            name="password"
                                label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => togglePasswordVisibility('password')}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirmar contraseña"
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => togglePasswordVisibility('confirm')}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                fontSize: '1rem',
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </Button>
                        <Box sx={{ textAlign: 'center' }}>
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="primary"
                                sx={{
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    ¿Ya tienes una cuenta? Inicia sesión
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register;
