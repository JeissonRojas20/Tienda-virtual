import React from 'react';

function Header() {
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

                {/* Account and Cart */}
                <div className="flex items-center space-x-6">
                    <a
                        href='/customerValidation'
                        className="flex items-center text-sm font-medium text-yellow-600 hover:underline"
                    >
                        Mi Cuenta
                    </a>
                    <a
                        href='/cart'
                        className="flex items-center text-sm font-medium text-yellow-600 hover:underline"
                    >
                        <svg
                            className="w-6 h-6 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7m1.6 6a5 5 0 1 0 5 5v-1a5 5 0 0 0-5-5z"
                            />
                        </svg>
                        Mi Carrito
                    </a>
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

export default Header;
