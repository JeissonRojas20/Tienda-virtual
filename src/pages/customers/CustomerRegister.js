import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import customersData from '../../services/api.json'

const RegisterForm = () => {

  const navigate = useNavigate();
  const[customer, setCustomer] = useState({

    name: '',
    email: '',
    number: '',
    adress: '',
    password: '',
    confirmPassword: ''

  });
  const [isLoading, setIsLoading] = useState(false);
  const[errors, setErrors] = useState({});

  const handleChange = e => {

    setCustomer({

      ...customer,
      [e.target.name]: e.target.value
    });
  }

  const validateForm = () => {

    let errors = {};
    if (!customer.name.trim()) errors.name = "Su nombre es requerido para el registro";
    if (!customer.email.trim()) errors.email = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(customer.email)) errors.email = "El correo no es válido";
    if (!customer.number.trim()) errors.number = "El numero de telefono es requerido";
    if (!customer.adress.trim()) errors.adress = "La direccion es requerido";
    if (!customer.password) errors.password = "La clave es requerida";
    else if (customer.password.length < 6) errors.password = "La clave debe tener al menos 6 caracteres";
    if (customer.password !== customer.confirmPassword) errors.confirmPassword = "Las claves no coinciden";

    setErrors(errors);
    return Object.keys(errors).length === 0;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/users', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...customer,
            id: Date.now(),
            rol: 'customer'
          })
        });

        if (response.ok) {
          const newCustomer = await response.json();
          console.log("Se registro con exito el cliente", newCustomer);
          navigate('/customerValidation');
          alert("Felicidades, ya tienes una cuenta");
        } else {
          console.error("Error al crear la cuenta");
        }
      } catch (error) {
        console.error("Error mientras se creaba la cuenta:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center mt-6 mb-6">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <img src="https://static.vecteezy.com/system/resources/previews/005/601/776/non_2x/pet-shop-logo-vector.jpg" alt="Logo" className="w-30 h-20" />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Registro Cliente</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-600">Nombre</label>
            <input type="text" id="name" name="name" value={customer.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Correo electrónico</label>
            <input type="email" id="email" name="email" value={customer.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="block mb-2 text-sm text-gray-600">Numero telefonico</label>
            <input type="number" id="number" name="number" value={customer.number} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="adress" className="block mb-2 text-sm text-gray-600">Direccion</label>
            <input type="text" id="adress" name="adress" value={customer.adress} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm text-gray-600">Contraseña</label>
            <input type="password" id="password" name="password" value={customer.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-600">Repetir contraseña</label>
            <input type="password" id="confirmPassword" value={customer.confirmPassword} onChange={handleChange} name="confirmPassword" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <button type="submit" disabled={isLoading} className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"> {isLoading ? 'Creando cuenta...' : 'Registrarme'}</button>
        </form>
        <div className="text-center">
          <p className="text-sm">¿Ya tienes una cuenta? <a href="customerValidation" className="text-cyan-600">Inicia sesión</a></p>
        </div>
      </div>
    </div>


  );
};

export default RegisterForm;