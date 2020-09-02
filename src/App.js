import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Header from './Components/Header/Header'
import { observer, inject } from 'mobx-react'
import MediaCards from './Components/MediaCards/MediaCards';
import Notifications from './Components/Notifications/Notifications';
import CreatorPage from './Components/CreatorPage/CreatorPage';
//user params hook

const App = inject('userStore', 'mediaStore')(observer((props) => {

  return (
    <Router>
      <div id='main-container'>
        <Header/>
        <>
          <Route exact path='/auth' render={() => <Landing />} />
          <Route exact path='/dashboard' render={() => <MediaCards page={match} />} />
          <Route exact path='/explore' render={({ match }) => <MediaCards page={match} />} />
          <Route exact path='/creator' render={({ match }) => <CreatorPage page={match} />} />
          <Route exact path='/notifications' render={() => <Notifications />} />
        </>
      </div>
    </Router>
  )
}))

export default App;