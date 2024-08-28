import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import companyData from '../../services/api.json'

const RegisterFormCompany = () => {

  const navigate = useNavigate();
  const [company, setCompany] = useState({

    name: '',
    email: '',
    number: '',
    adress: '',
    password: '',
    confirmPassword: ''

  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = e => {

    setCompany({

      ...company,
      [e.target.name]: e.target.value
    });
  }

  const validateForm = () => {

    let errors = {};
    if (!company.name.trim()) errors.name = "Su nombre es requerido para el registro";
    if (!company.email.trim()) errors.email = "El correo es requerido";
    else if (!/\S+@\S+\.\S+/.test(company.email)) errors.email = "El correo no es válido";
    if (!company.number.trim()) errors.number = "El numero de telefono es requerido";
    if (!company.adress.trim()) errors.adress = "La direccion es requerida";
    if (!company.password) errors.password = "La clave es requerida";
    else if (company.password.length < 6) errors.password = "La clave debe tener al menos 6 caracteres";
    if (company.password !== company.confirmPassword) errors.confirmPassword = "Las claves no coinciden";

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
            ...company,
            id: Date.now(),
            rol: 'company'
          })
        });

        if (response.ok) {
          const newCompany = await response.json();
          console.log("Se registro con exito la compañia", newCompany);
          navigate('/customerValidation');
          alert("Felicidades, ya tienes una cuenta de empresa");
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
        <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Registro Empresa</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-600">Nombre</label>
            <input type="text" id="name" name="name" value={company.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Correo electrónico</label>
            <input type="email" id="email" name="email" value={company.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="block mb-2 text-sm text-gray-600">Numero telefonico</label>
            <input type="number" id="number" name="number" value={company.number} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="adress" className="block mb-2 text-sm text-gray-600">Direccion</label>
            <input type="text" id="adress" name="adress" value={company.adress} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm text-gray-600">Contraseña</label>
            <input type="password" id="password" name="password" value={company.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-600">Repetir contraseña</label>
            <input type="password" id="confirmPassword" value={company.confirmPassword} onChange={handleChange} name="confirmPassword" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
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

export default RegisterFormCompany;
