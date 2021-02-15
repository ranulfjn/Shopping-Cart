import './App.css';

import React, { useState, useEffect } from 'react'

import {commerce} from './lib/commerce';
import { Navbar, Products, Cart ,Checkout} from './components';
import {BrowserRouter as Router , Switch ,Route} from 'react-router-dom'


function App() {
  const [products , setProducts] = useState([]);
  const [cart, setCart] = useState({}); 

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
            <Checkout />

          </Route>
      
        </Switch>
     
      </div> 
    </Router>
   
  ); 
}
export default App;
