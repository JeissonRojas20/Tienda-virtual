// ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

function ProductList({ addToCart, cart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState([0, 100000]);
  const [companyFilter, setCompanyFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const filterProducts = () => {
    if (!categoryFilter && !companyFilter && priceFilter[0] === 0 && priceFilter[1] === 100000) {
      setFilteredProducts(products);
      return;
    }

    let filtered = products;

    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    if (companyFilter) {
      filtered = filtered.filter(product => product.companyName === companyFilter);
    }

    filtered = filtered.filter(product => {
      const price = parseInt(product.sizes[0]?.price, 10) || 0;
      return price >= priceFilter[0] && price <= priceFilter[1];
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [categoryFilter, priceFilter, companyFilter, products]);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Productos Disponibles</h2>
        <Link
          to="/cart"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Ver Carrito ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </Link>
      </div>
      <div className="flex">
        <div className="w-1/4 bg-gray-200 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Filtros</h3>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Categoría</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Seleccione una categoría</option>
              <option value="Juguetes">Juguetes</option>
              <option value="Comida">Comida</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Camas">Camas</option>
              <option value="Ropa">Ropa</option>
              <option value="Salud">Salud</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Rango de Precios</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Mínimo"
                value={priceFilter[0]}
                onChange={(e) => setPriceFilter([parseInt(e.target.value, 10) || 0, priceFilter[1]])}
                className="w-1/2 border border-gray-300 rounded-lg p-2"
              />
              <input
                type="number"
                placeholder="Máximo"
                value={priceFilter[1]}
                onChange={(e) => setPriceFilter([priceFilter[0], parseInt(e.target.value, 10) || 100000])}
                className="w-1/2 border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Empresa</label>
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Todas</option>
              <option value="Super Natural Barf">Super Natural Barf</option>
              <option value="Mascolandia">Mascolandia</option>
            </select>
          </div>
        </div>

        <div className="w-3/4 pl-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
