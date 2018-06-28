import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import './main.less';

import routes from './routes';
import store from './store/store';
render(
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>,
  // document.body.appendChild(document.createElement('div'))
  document.body.appendChild(document.createElement('selection'))
);