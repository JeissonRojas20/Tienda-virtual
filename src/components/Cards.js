import React from 'react'

const Cards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <div className="bg-yellow-400 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Juguetes para Mascotas</h2>
                <p className="text-lg">Hasta <span className="font-bold">40%</span> de descuento</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</button>
            </div>
            <div className="bg-red-400 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Camas y Accesorios</h2>
                <p className="text-lg">Hasta <span className="font-bold">35%</span> de descuento</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</button>
            </div>
            <div className="bg-green-400 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Comida para Mascotas</h2>
                <p className="text-lg">Hasta <span className="font-bold">50%</span> de descuento</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</button>
            </div>
            <div className="bg-purple-400 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Ropa y Moda</h2>
                <p className="text-lg">Hasta <span className="font-bold">30%</span> de descuento</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</button>
            </div>
            <div className="bg-blue-400 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Salud y Bienestar</h2>
                <p className="text-lg">Hasta <span className="font-bold">20%</span> de descuento</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</button>
            </div>
            <div className="bg-orange-400 p-4 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Transportadoras y Jaulas</h2>
                <p className="text-lg">Hasta <span className="font-bold">45%</span> de descuento</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Ver productos</button>
            </div>
        </div>
    )
}

export default Cards