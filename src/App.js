import React, { useEffect, useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom"
import Landing from "./Components/Landing/Landing"
import { observer, inject } from "mobx-react"
import MediaCards from "./Components/MediaCards/MediaCards"
import Notifications from "./Components/Notifications/Notifications"
import CreatorPage from "./Components/CreatorPage/CreatorPage"
import AddCreator from "./Components/CreatorPage/AddCreator"
import { ThemeProvider, Snackbar } from '@material-ui/core'
import { useTheme, useIsAuth } from './hooks/hooks'
import MuiAlert from '@material-ui/lab/Alert'

const App = inject("userStore", "mediaStore")(observer(props => {
  const { darkState, isLoggedIn, cookieLogIn, notificationLength, connectUserSocket, disconnectUserSocket } = props.userStore
  const darkTheme = useTheme(darkState)
  useIsAuth(cookieLogIn)
  
  useEffect(() => {
    if (isLoggedIn) {
      connectUserSocket()
    }
    return () => disconnectUserSocket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  const [notificationNum, setNotificationNum] = useState(notificationLength)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (notificationLength > notificationNum) setOpen(true)
    setNotificationNum(notificationLength)
  }, [notificationLength, notificationNum])

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') { return }
    setOpen(false)
  }

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
          <Route exact path="/add/creator" render={() => <AddCreator />} />
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">
              <Link to='/notifications' style={{ textDecoration: 'none', color: 'white' }}> New notification!</Link>
            </Alert>
          </Snackbar>
        </div>
      </ThemeProvider>
    </Router>
  )
})
)

export default App
