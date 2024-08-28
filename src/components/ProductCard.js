// ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  const goToProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-contain mb-4 rounded-lg"
      />

      <div className="flex-1">
        <h3
          className="text-xl font-semibold text-gray-700 mb-2 cursor-pointer hover:text-blue-600"
          onClick={() => goToProductDetails(product.id)}
        >
          {product.name}
        </h3>
      </div>

      <hr className="mb-2 mt-2" />

      <div className="mb-4">
        <p className="text-lg font-bold text-blue-600">Categoría: {product.category}</p>
        <p className="text-lg font-bold text-blue-600">Empresa: {product.companyName}</p>
        <p className="text-lg font-bold text-blue-600">Cantidad: {product.quantity}</p>
        <p className="text-lg font-bold text-blue-600">
          Precio: ${product.sizes[0]?.discountedPrice ? product.sizes[0].discountedPrice.toFixed(2) : 'N/A'}
        </p>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="mt-auto w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-200"
      >
        Añadir al carrito
      </button>
    </div>
  );
}

export default ProductCard;
