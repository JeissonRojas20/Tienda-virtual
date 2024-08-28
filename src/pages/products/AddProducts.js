import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    basePrice: '',
    discount: '',
    category: '',
    image: '',
    description: '',
    sizes: [],
    companyName: '',
    quantity: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sizeInput, setSizeInput] = useState('');
  const [priceInput, setPriceInput] = useState('');

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo && userInfo.rol === 'company') {
      setProduct(prev => ({ ...prev, companyName: userInfo.companyName }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'discount' && {
        sizes: prev.sizes.map(size => ({
          ...size,
          discountedPrice: size.price * (1 - value / 100)
        }))
      })
    }));
  };

  const handleSizeInput = (e) => {
    setSizeInput(e.target.value);
  };

  const handlePriceInput = (e) => {
    setPriceInput(e.target.value);
  };

  const addSize = () => {
    if (sizeInput.trim() && priceInput.trim()) {
      const newSize = {
        size: sizeInput.trim(),
        price: parseFloat(priceInput.trim()),
        discountedPrice: parseFloat(priceInput.trim()) * (1 - product.discount / 100)
      };
      setProduct(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize]
      }));
      setSizeInput('');
      setPriceInput('');
    }
  };

  const removeSize = (index) => {
    setProduct(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!product.name.trim()) errors.name = "El nombre del producto es requerido";
    if (!product.category.trim()) errors.category = "La categoría es requerida";
    if (!product.image.trim()) errors.image = "El enlace de la imagen es requerido";
    if (!product.description.trim()) errors.description = "La descripción del producto es requerida";
    if (!product.companyName.trim()) errors.companyName = "El nombre de la empresa es requerido";
    if (!product.quantity) errors.quantity = "La cantidad disponible es requerida";
    if (product.sizes.length === 0) errors.sizes = "Debe añadir al menos un tamaño con precio";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...product,
            id: Date.now()
          })
        });

        if (response.ok) {
          const newProduct = await response.json();
          console.log("Se creó el producto correctamente", newProduct);
          navigate('/my-products');
          alert("Producto añadido con éxito");
        } else {
          console.error("Error al crear el producto");
        }
      } catch (error) {
        console.error("Error mientras se creaba el producto:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-5">Registrar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Categoría</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
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
        <div>
          <label htmlFor="image" className="block mb-1">Enlace de la Imagen</label>
          <input
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Descripción del Producto</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="discount" className="block mb-1">Descuento (%)</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            max="100"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="size" className="block mb-1">Tamaños del Producto</label>
          <div className="flex">
            <input
              type='text'
              id="size"
              name="size"
              value={sizeInput}
              onChange={handleSizeInput}
              className="w-full px-3 py-2 border rounded mr-2"
              placeholder='Ingrese un tamaño'
            />
            <input
              type="number"
              id="price"
              name="price"
              value={priceInput}
              onChange={handlePriceInput}
              className="w-full px-3 py-2 border rounded mr-2"
              placeholder='Ingrese el precio'
              step="0.01"
              min="0"
            />
            <button
              type="button"
              onClick={addSize}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Añadir
            </button>
          </div>
          <div className="mt-2">
            {product.sizes.map((size, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                <span>{size.size} - Precio: ${size.price.toFixed(2)} - Precio con descuento: ${size.discountedPrice.toFixed(2)}</span>
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="ml-2 text-red-500 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="quantity" className="block mb-1">Cantidad Disponible</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="companyName" className="block mb-1">Nombre de la Empresa</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={product.companyName}
            onChange={handleChange}
            required
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
        >
          {isLoading ? 'Añadiendo...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
