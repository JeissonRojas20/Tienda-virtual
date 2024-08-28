import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ProductCard from "../components/ProductCard"; // Asegúrate de que la ruta sea correcta

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Hacer la petición a la API para obtener los productos
        fetch('http://localhost:8080/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando productos...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error al cargar los productos: {error}</div>;
    }

    return (
        <div>
            {/* Cards Estáticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                <div className="bg-yellow-400 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">Juguetes para Mascotas</h2>
                    <p className="text-lg mb-6">Calidad Premium para la diversión de tus mascotas</p>
                    <Link to="/toys" className="mt-12 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</Link>
                </div>
                <div className="bg-red-400 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">Camas y Accesorios</h2>
                    <p className="text-lg mb-6">Diseñados para el confort y descanso de tus mascotas</p>
                    <Link to="/camas" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</Link>
                </div>
                <div className="bg-green-400 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">Comida para Mascotas</h2>
                    <p className="text-lg mb-6">Nutrición balanceada y deliciosa para todas las edades</p>
                    <Link to="/comida" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</Link>
                </div>
                <div className="bg-purple-400 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">Ropa y Moda</h2>
                    <p className="text-lg mb-6">Estilos únicos y cómodos para tus mascotas</p>
                    <Link to="/ropa" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</Link>
                </div>
                <div className="bg-blue-400 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">Salud y Bienestar</h2>
                    <p className="text-lg mb-6">Productos que cuidan la salud y el bienestar de tus mascotas</p>
                    <Link to="/health" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</Link>
                </div>
                <div className="bg-orange-400 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">Transportadoras y Jaulas</h2>
                    <p className="text-lg mb-6">Seguras y confortables para los viajes de tus mascotas</p>
                    <Link to="/transportadoras" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</Link>
                </div>
            </div>

            {/* Productos desde la API */}
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-6">Productos Disponibles</h2>
                <Link to="/products">Ver todos los productos</Link>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={() => { } /* Define la función addToCart aquí si es necesario */}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
