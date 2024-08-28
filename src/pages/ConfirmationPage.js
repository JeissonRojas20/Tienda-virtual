import React from 'react';
import { useLocation } from 'react-router-dom';

function ConfirmationPage() {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return <p>No se encontró información del pedido.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Confirmación de Pedido</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Detalles del Pedido</h2>
        <p className="mb-4"><strong>ID del Pedido:</strong> {order.id}</p>
        <p className="mb-4"><strong>Nombre:</strong> {order.name}</p>
        <p className="mb-4"><strong>Dirección:</strong> {order.address}</p>
        <p className="mb-4"><strong>Total:</strong> ${order.total.toFixed(2)}</p>
        
        <h3 className="text-xl font-semibold mb-4">Productos</h3>
        {order.products.map((product) => (
          <div key={product.id} className="flex justify-between items-center mb-2">
            <span>{product.name} (x{product.quantity})</span>
            <span>${(product.price * product.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConfirmationPage;
