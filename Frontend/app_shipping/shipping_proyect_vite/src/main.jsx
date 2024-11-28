import React from 'react';
import ReactDOM from 'react-dom/client';
import './share/css/allPages.css';
import AppAllModules from './AppAllModules';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store/Store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppAllModules />
    </Provider>
  </React.StrictMode>
);
