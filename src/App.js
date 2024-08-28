import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// COMPONENTES
import Header from './components/Header';
import HeaderAdmin from './components/headers/HeaderAdmin';
import HeaderCompany from './components/headers/HeaderCompany';
import HeaderCustomer from './components/headers/HeaderCustomer';
import Footer from './components/Footer';
// PÁGINAS
import Home from './pages/Home';
import CustomerRegister from './pages/customers/CustomerRegister';
import RegisterFormCompany from './pages/company/CompanyRegister';
import Validation from './pages/Validation';
import AddProduct from './pages/products/AddProducts';
import ProductList from './pages/products/ProductList';
import CartPage from './pages/CartPage';
import ProductDetails from './pages/products/ProductDetails';
import MyProducts from './pages/products/MyProducts';
import EditProduct from './pages/products/EditProduct';
import ToysPage from './pages/products/categories/ToysPage';
import HealthPage from './pages/products/categories/HealthPage';
import CheckoutPage from './pages/CheckOutPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  // Estado para manejar el usuario
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Obtener la información del usuario desde localStorage al cargar el componente
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    // Obtener el carrito guardado
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    // Guardar el carrito en localStorage cada vez que cambie
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const onLogout = () => {
    // Eliminar la información del usuario y token de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Actualizar el estado del usuario a null
    setUser(null);
    window.location.href = '/';
  };

  const renderHeader = () => {
    if (user?.rol === 'admin') {
      return <HeaderAdmin onLogout={onLogout} />;
    } else if (user?.rol === 'company') {
      return <HeaderCompany onLogout={onLogout} />;
    } else if (user?.rol === 'customer') {
      return <HeaderCustomer onLogout={onLogout} />;
    } else {
      return <Header />;
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const isAuthenticated = !!user; // Verifica si hay un usuario en el estado

  const getPrice = (item) => {
    console.log('Item:', item);
    if (!item || !item.sizes || item.sizes.length === 0) return 0;

    const sizeInfo = item.sizes[0];
    const price = Number(sizeInfo.discountedPrice) || Number(sizeInfo.price) || 0;
    console.log('Price:', price);
    return price;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = getPrice(item);
      const quantity = Number(item.quantity);
      console.log('Item total:', price * quantity);
      return total + (price * quantity);
    }, 0);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {renderHeader()}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Cliente */}
            <Route path="/addCustomer" element={<CustomerRegister />} />
            <Route path="/addCompany" element={<RegisterFormCompany />} />
            <Route path="/customerValidation" element={<Validation />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/products" element={<ProductList addToCart={addToCart} cart={cart} />} />
            <Route path="/toys" element={<ToysPage addToCart={addToCart} cart={cart} />} />
            <Route path="/health" element={<HealthPage addToCart={addToCart} cart={cart} />} />
            <Route path="/product/:productId" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  cart={cart}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  total={calculateTotal()}
                />
              }
            />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
