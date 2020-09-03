import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import { observer, inject } from "mobx-react";
import MediaCards from "./Components/MediaCards/MediaCards";
import Notifications from "./Components/Notifications/Notifications";
import CreatorPage from "./Components/CreatorPage/CreatorPage";

//user params hook

const App = inject("userStore", "mediaStore")(
  observer(props => {
    return (
      <Router>
        <div id="main-container">
          <>
            <Route exact path="/auth/login" render={() => (props.userStore.isLoggedIn ? <Redirect to="/dashboard"/>  : <Landing/>)}/>
            <Route exact path="/auth/register" render={() => (props.userStore.isLoggedIn ? <Redirect to="/dashboard"/> : <Landing/>)}/>
            <Route exact path="/dashboard" render={() => <MediaCards />} />
            <Route exact path="/explore" render={() => <MediaCards />} />
            <Route exact path="/creator/:id" render={() => <CreatorPage />} />
            <Route exact path="/notifications" render={() => <Notifications />} />
          </>
        </div>
      </Router>
    );
  })
);

export default App;