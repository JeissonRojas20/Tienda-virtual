import React from 'react';

function HeaderAdmin({ onLogout }) {  // Asumimos que el nombre de usuario se pasa como prop

    return (
        <nav className="bg-white dark:bg-gray-800 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <div className="shrink-0">
                            <a href="/" title="Home">
                                <img className="w-auto h-8 rounded-3xl" src="https://static.vecteezy.com/system/resources/previews/005/601/776/non_2x/pet-shop-logo-vector.jpg" alt="Pet Shop Logo" />
                            </a>
                        </div>
                    </div>

                    {/* Enlaces centrales */}
                    <div className="flex items-center justify-center space-x-6">
                        <a href="/products" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                            Productos
                        </a>
                        <a href="/users" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                            Usuarios
                        </a>
                        <a href='/addCompany' id="userDropdownButton1" data-dropdown-toggle="userDropdown1" type="button" className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-100 text-sm font-medium leading-none text-gray-900 dark:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7 me-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                            </svg>
                            Registrar - Empresa
                        </a>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={onLogout}
                            className="ml-4 text-sm text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default HeaderAdmin;