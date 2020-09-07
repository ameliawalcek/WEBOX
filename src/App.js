import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import { observer, inject } from "mobx-react";
import MediaCards from "./Components/MediaCards/MediaCards";
import Notifications from "./Components/Notifications/Notifications";
import CreatorPage from "./Components/CreatorPage/CreatorPage";
import AddCreator from "./Components/CreatorPage/AddCreator"
import { ThemeProvider } from '@material-ui/core'
import { useTheme, useIsAuth } from './hooks/hooks'

const App = inject("userStore", "mediaStore")(observer(props => {
    const { darkState, isLoggedIn, cookieLogIn } = props.userStore
    const darkTheme = useTheme(darkState)
    useIsAuth(cookieLogIn)

    return (
      <Router>
        <ThemeProvider theme={darkTheme}>
            <div id="main-container">
              <Route exact path='/' render={() => isLoggedIn ? <Redirect to='/dashboard' /> : <Redirect to='/auth/login' />} />
              <Route exact path="/auth/login" render={() => (isLoggedIn ? <Redirect to="/dashboard" /> : <Landing />)} />
              <Route exact path="/auth/register" render={() => (isLoggedIn ? <Redirect to="/dashboard" /> : <Landing />)} />
              <Route exact path="/dashboard" render={() => <MediaCards />} />
              <Route exact path="/explore" render={() => <MediaCards />} />
              <Route exact path="/creator/:id" render={() => <CreatorPage />} />
              <Route exact path="/notifications" render={() => <Notifications />} />
              <Route exact path="/creator/add" render={() => <AddCreator/>} />
            </div>
        </ThemeProvider>
      </Router>
    )
  })
)

export default App;
