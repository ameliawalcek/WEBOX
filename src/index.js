import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react'
import { MediaStore } from './stores/MediaStore';
import { UserStore } from './stores/UserStore';
import { CreatorStore } from './stores/CreatorStore';
import * as serviceWorker from './serviceWorker'

const mediaStore = new MediaStore()
const userStore = new UserStore()
const creatorStore = new CreatorStore()
const stores = { mediaStore, userStore, creatorStore }

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.register()