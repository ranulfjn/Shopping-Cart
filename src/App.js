import './App.css';

import React, { useState, useEffect } from 'react'

import {commerce} from './lib/commerce';
import { Navbar, Products, Cart ,Checkout} from './components';
import {BrowserRouter as Router , Switch ,Route} from 'react-router-dom'


function App() {
  const [products , setProducts] = useState([]);
  const [cart, setCart] = useState({}); 
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async()=>{
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart= async()=>{
    setCart(await commerce.cart.retrieve() );
  }

  const handleAddToCart= async(productId , quantity)=>{
    const item = await commerce.cart.add(productId,quantity);
    setCart(item.cart);
  }

  const handleUpdateCartQty =async(productId , quantity) =>{
    const item = await commerce.cart.update(productId,{quantity});
    setCart(item.cart);
  }

  const handleRemove =async(productId) =>{
    const item = await commerce.cart.remove(productId);
    setCart(item.cart);
  }

  const handleEmptyCart =async() =>{
    const item = await commerce.cart.empty();
    setCart(item.cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };


  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };


  useEffect(()=>{
    fetchProducts(); 
    fetchCart();
  },[]);



  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
              <Products products={products} onAddToCart={handleAddToCart} />  
          </Route>

          <Route exact path="/cart">
              <Cart cart={cart} 
              handleEmptyCart={handleEmptyCart}
              handleRemove={handleRemove}
              handleUpdateCartQty={handleUpdateCartQty}
              />
          </Route>

          <Route exact path="/checkout">
          <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} refreshCart={refreshCart} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

        
