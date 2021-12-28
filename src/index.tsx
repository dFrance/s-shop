import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './context/configStore';

import { ProductProvider } from './context/IncrementProducts';
import { UserProvider } from './context/user';

ReactDOM.render(

<React.StrictMode>
    <Provider store={store}>
      <UserProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
