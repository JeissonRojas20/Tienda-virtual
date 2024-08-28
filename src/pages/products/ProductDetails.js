import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetails({ addToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setSelectedSize(data.sizes && data.sizes.length > 0 ? data.sizes[0].size : '');
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [productId]);

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
        <p>Error al cargar los detalles del producto: {error}. Por favor, intente nuevamente.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-500">
        <p>Producto no encontrado.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert('Por favor selecciona un tamaño.');
      return;
    }
    addToCart({ ...product, quantity, selectedSize });
    alert(`${product.name} añadido al carrito.`);
  };

  const getPrice = () => {
    // Devuelve el precio con descuento si existe, de lo contrario, el precio normal
    const sizeInfo = product.sizes.find(size => size.size === selectedSize);
    return sizeInfo ? sizeInfo.discountedPrice : product.price;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row shadow-lg p-6 rounded-lg bg-white">
        <div className="md:w-1/2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full object-contain rounded-lg" 
          />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <div className="text-gray-400 text-sm">Detalles del producto</div>
          <h1 className="text-3xl font-bold mt-2 text-gray-800">{product.name}</h1>
          
          <div className="mt-4">
            {product.originalPrice && (
              <span className="text-sm line-through text-gray-500">${product.originalPrice}</span>
            )}
            <span className="text-4xl font-bold text-blue-600 ml-2">${getPrice()}</span>
          </div>
          
          <div className="text-green-600 mt-4 font-medium">
            Envío gratis a todo el país
          </div>
          
          <div className="mt-6 text-gray-700">
            <span className="font-semibold">Stock disponible: </span>
            <span>{product.quantity}</span>
          </div>
          
          {product.category && (
            <div className="mt-4 text-gray-700">
              <span className="font-semibold">Categoría: </span>
              <span>{product.category}</span>
            </div>
          )}
          
          {product.company && (
            <div className="mt-4 text-gray-700">
              <span className="font-semibold">Empresa: </span>
              <span>{product.company}</span>
            </div>
          )}
          
          <div className="mt-6 text-gray-700">
            <span className="font-semibold">Descripción: </span>
            <p>{product.description}</p>
          </div>

          {/* Selección de tamaño si existe */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4">
              <span className="text-gray-700 font-semibold">Tamaño:</span>
              <select 
                value={selectedSize} 
                onChange={(e) => setSelectedSize(e.target.value)}
                className="ml-3 border rounded p-2 text-gray-700"
              >
                {product.sizes.map((size, index) => (
                  <option key={index} value={size.size}>{size.size}</option>
                ))}
              </select>
            </div>
          )}
          
          <div className="flex items-center mt-4">
            <span className="text-gray-700 font-semibold">Cantidad:</span>
            {Number.isInteger(Number(product.quantity)) && Number(product.quantity) > 0 ? (
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="ml-3 border rounded p-2 text-gray-700"
              >
                {[...Array(Number(product.quantity)).keys()].map(i => (
                  <option key={i+1} value={i+1}>{i+1} unidad{i !== 0 ? 'es' : ''}</option>
                ))}
              </select>
            ) : (
              <span className="ml-3 text-gray-500">No disponible</span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-blue-600 transition duration-300"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
