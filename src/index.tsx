import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CheckoutProvider } from './context/checkout'
import { ProductProvider } from './context/IncrementProducts';
ReactDOM.render(
  <React.StrictMode>
    <CheckoutProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CheckoutProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
