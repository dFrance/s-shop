import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CheckoutProvider } from './context/checkout'
import { ProductProvider } from './context/IncrementProducts';
import { UserProvider } from './context/user';
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CheckoutProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CheckoutProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
