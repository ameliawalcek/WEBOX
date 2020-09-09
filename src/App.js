import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import { observer, inject } from "mobx-react";
import MediaCards from "./Components/MediaCards/MediaCards";
import Notifications from "./Components/Notifications/Notifications";
import CreatorPage from "./Components/CreatorPage/CreatorPage";
import AddCreator from "./Components/CreatorPage/AddCreator";
import io from "socket.io-client";
import * as dotenv from 'dotenv'
//user params hook
import { ThemeProvider, Paper } from "@material-ui/core";
import { useTheme, useIsAuth } from "./hooks/hooks";
import { MapsLocalHospital } from "material-ui/svg-icons";

dotenv.config()

let socket = io('http://localhost:3001')

socket.on('test', (test) => {
  console.log(test)
})


const App = inject(
  "userStore",
  "mediaStore"
)(
  observer((props) => {
    const { darkState, isLoggedIn, cookieLogIn } = props.userStore;
    const darkTheme = useTheme(darkState);
    useIsAuth(cookieLogIn);


    return (
      <Router>
        <ThemeProvider theme={darkTheme}>
            <div id="main-container">
              <Route
                exact
                path="/"
                render={() =>
                  isLoggedIn ? (
                    <Redirect to="/dashboard" />
                  ) : (
                      <Redirect to="/auth/login" />
                    )
                }
              />
              <Route
                exact
                path="/auth/login"
                render={() =>
                  isLoggedIn ? <Redirect to="/dashboard" /> : <Landing />
                }
              />
              <Route
                exact
                path="/auth/register"
                render={() =>
                  isLoggedIn ? <Redirect to="/dashboard" /> : <Landing />
                }
              />
              <Route exact path="/dashboard" render={() => <MediaCards />} />
              <Route exact path="/explore" render={() => <MediaCards />} />
              <Route exact path="/creator/:id" render={() => <CreatorPage />} />
              <Route
                exact
                path="/notifications"
                render={() => <Notifications />}
              />
              <Route exact path="/add/creator" render={() => <AddCreator />} />
            </div>
        </ThemeProvider>
      </Router>
    )
              }))

export default App;
