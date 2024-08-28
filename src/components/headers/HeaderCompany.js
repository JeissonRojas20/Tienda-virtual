import React from 'react';

function HeaderCompany({ onLogout }) {  // Asumimos que el nombre de usuario se pasa como prop

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

                {/* Enlaces centrales */}
                <div className="flex items-center space-x-6">
                    <a href="/my-products" className="text-yellow-600 hover:underline">
                        Mis Productos
                    </a>
                </div>

                {/* Botón de cerrar sesión */}
                <div className="flex items-center">
                    <button
                        onClick={onLogout}
                        className="ml-4 text-sm text-yellow-600 hover:underline focus:outline-none"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>


    );
}

export default HeaderCompany;