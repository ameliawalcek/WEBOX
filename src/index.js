import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react'
import { MediaStore } from './stores/MediaStore';
import { UserStore } from './stores/UserStore';


const mediaStore = new MediaStore()
const userStore = new UserStore()
const stores = { mediaStore, userStore }

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)