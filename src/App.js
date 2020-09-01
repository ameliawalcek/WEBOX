import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import { observer, inject } from 'mobx-react'
import MediaCards from './Components/MediaCards/MediaCards';
import Notifications from './Components/Notifications/Notifications';
import CreatorPage from './Components/CreatorPage/CreatorPage';
//user params hook

const App = inject('userStore', 'mediaStore')(observer((props) => {

  return (
    <Router>
      <div id='main-container'>
        <>
          <Route exact path='/auth/login' render={({match}) => <Landing page={match}/>} />
          <Route exact path='/auth/register' render={({match}) => <Landing page={match}/>} />
          <Route exact path='/dashboard' render={({ match }) => <MediaCards match={match} />} />
          <Route exact path='/explore' render={({ match }) => <MediaCards match={match} />} />
          <Route exact path='/creator/:id' render={({ match }) => <CreatorPage match={match} />} />
          <Route exact path='/notifications' render={() => <Notifications />} />
        </>
      </div>
    </Router>
  )
}))

export default App;