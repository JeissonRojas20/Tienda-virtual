import React from 'react';

function HeaderCustomer({ onLogout, cartItems = 0 }) {  // Asumimos que el nombre de usuario, función de logout y número de items en el carrito se pasan como props

    return (
        <nav className="bg-orange-200 shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <a href="/" className="flex items-center">
                        <img
                            className="h-12 rounded"
                            src="https://i.imgur.com/xtHlFoO.png"
                            alt="Pet Shop Logo"
                        />
                    </a>
                </div>

                {/* Search Bar */}
                <div className="flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="¿Qué estás buscando? ¡Encuentra el regalo ideal aquí!"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    />
                </div>

                <div className="flex items-center space-x-6">

                    <div className="flex items-center">
                        <button
                            onClick={onLogout}
                            className="ml-4 text-sm text-yellow-600 hover:underline focus:outline-none"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
            <nav className="bg-gray-500 text-white py-4">
                <ul className="flex justify-center space-x-4">
                    <li><a href="#" className="hover:underline">Juguetes</a></li>
                    <li><a href="#" className="hover:underline">Comida</a></li>
                    <li><a href="#" className="hover:underline">Accesorios</a></li>
                    <li><a href="#" className="hover:underline">Salud</a></li>
                    <li><a href="#" className="hover:underline">Ropa</a></li>
                </ul>
            </nav>
        </nav>
    );
}

export default HeaderCustomer;
