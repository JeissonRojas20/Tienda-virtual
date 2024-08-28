import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Validation() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const login = async e => {
        e.preventDefault();
        setError('');

        try {
            // Simulación de una llamada a la API para obtener todos los usuarios
            const res = await axios.get('http://localhost:8080/users');
            const customers = res.data;

            // Buscar el cliente que coincida con el email y la contraseña ingresados
            const customer = customers.find(c => c.email === formData.email && c.password === formData.password);

            if (customer) {
                console.log('Inicio de sesión exitoso', customer);
                alert('Inicio de sesión exitoso');

                // Guardar la información del usuario en localStorage
                const userInfo = {
                    id: customer.id,
                    name: customer.name,
                    email: customer.email,
                    rol: customer.rol,
                    companyName: customer.name || '',
                    address: customer.address || ''
                };
                localStorage.setItem('user', JSON.stringify(userInfo));

                // Redirigir según el rol del usuario
                switch (customer.rol) {
                    case 'admin':
                        navigate('/addproduct');
                        break;
                    case 'company':
                        navigate('/addproduct');
                        break;
                    case 'customer':
                        navigate('/');
                        break;
                    default:
                        setError('Rol de usuario desconocido');
                        navigate('/')
                }
            } else {
                setError('Usuario o contraseña incorrectos');
            }
        } catch (err) {
            console.log('Error al iniciar sesión', err);
            setError('Hubo un problema al intentar iniciar sesión');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-8">
                    <img src="https://static.vecteezy.com/system/resources/previews/005/601/776/non_2x/pet-shop-logo-vector.jpg" alt="Logo" className="w-30 h-20" />
                </div>
                <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Iniciar sesión</h1>
                <form onSubmit={login}>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Correo electrónico</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm text-gray-600">Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                            required 
                        />
                        <a href="#" className="block text-right text-xs text-cyan-600 mt-2">¿Olvidaste tu contraseña?</a>
                    </div>
                    <button 
                        type="submit" 
                        className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
                    >
                        Acceso
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-sm">¿No tienes una cuenta? <a href="addCustomer" className="text-cyan-600">Regístrate ahora</a></p>
                </div>
            </div>
        </div>
    );
}

export default Validation;
