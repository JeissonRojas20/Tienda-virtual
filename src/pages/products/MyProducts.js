import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/products')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (categoryFilter) {
            setFilteredProducts(products.filter(product => product.category === categoryFilter));
        } else {
            setFilteredProducts(products);
        }
    }, [categoryFilter, products]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                <p>Error al cargar los productos: {error}. Por favor, intente nuevamente.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Mis Productos</h1>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Productos Disponibles</h2>
                <Link
                    to="/addproduct"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
                >
                    Registrar producto
                </Link>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Categoría</label>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full md:w-1/3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todas</option>
                    <option value="Juguetes">Juguetes</option>
                    <option value="Comida">Comida</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Camas">Camas</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Salud">Salud</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                    >
                        <div className="relative pb-2/3">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-1">Categoría: {product.category}</p>
                            <p className="text-gray-600 mb-1">Empresa: {product.companyName}</p>
                            <p className="text-gray-600 mb-2">Stock: {product.quantity}</p>
                            <p className="text-gray-700 font-semibold mb-2">Tamaños y precios:</p>
                            <ul className="space-y-1 mb-4">
                                {product.sizes.map((size, index) => (
                                    <li key={index} className="text-gray-600">
                                        {size.size}: ${size.price}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to={`/edit-product/${product.id}`}
                                className="block w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition duration-300"
                            >
                                Editar
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyProducts;