import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from './store/store'
import Moment from 'react-moment';
Moment.startPooledTimer(1000);
ReactDOM.render(
  < Provider store={store} >
    <App />
  </Provider >,
  document.getElementById('root')
);


