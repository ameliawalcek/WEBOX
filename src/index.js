import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react'
import { MediaStore } from './stores/MediaStore';
import { UserStore } from './stores/UserStore';
import { CreatorStore } from './stores/CreatorStore';
import { NotificationStore } from './stores/NotificationStore'

const mediaStore = new MediaStore()
const userStore = new UserStore()
const creatorStore = new CreatorStore()
const notificationStore = new NotificationStore()
const stores = { mediaStore, userStore, creatorStore, notificationStore }

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)