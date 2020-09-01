import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Header from "../Header/Header";
import { useLocation, Link, useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
      overflow: "hidden",
      padding: theme.spacing(0, 3)
    }
  }
}));

const Landing = inject("userStore", "mediaStore")(
  observer(props => {
    const classes = useStyles();
    const location = useLocation();
    const page = location.pathname.split("/")[2];
    const [state, setState] = React.useState({
      userName: "",
      password: "",
      email: ""
    });
    const [message, setMassege] = useState("");

    const handleInput = ({ target }) => {
      const value = target.value;
      setState({
        ...state,
        [target.name]: value
      });
    };

    const checkInputs = () => {
      if (state.userName.length < 3 && state.password.length < 3) {
        setMassege("user name and password needs to be more then 3 letters");
      }
      if (page === "register" && state.email.length < 6) {
        setMassege("email needs to be more then 6 letters");
      } else {
        enterClicked();
      }
    };

    const enterClicked = () => {
      if (page === "login") {
        props.userStore.checkUser(state);
      } else {
        props.userStore.saveUser(state);
      }
    };

    return (
      <div>
        <Header page="basic" />
        <Grid container spacing={2} justify="center" justify-content="center" align-items="center">
          {page === "login" ? (
            <Grid item>
              <h2>Login</h2>
            </Grid>
          ) : (
            <Grid item>
              <h2>Sign-Up</h2>
            </Grid>
          )}
          <form className={classes.root} noValidate autoComplete="off">
            <Grid item>
              <TextField id="standard-basic" label="User Name" name="userName" onChange={handleInput} helperText={message}/>
              
              <TextField id="standard-password-input" label="Password" name="password" type="password" onChange={handleInput} helperText={message}/>
              {page === "register" && <TextField id="standard-basic" name="email" label="Email" type="email" onChange={handleInput} helperText={message}/>}
              {/* <TextField error id="standard-error-helper-text" label="Error"  /> */}
            </Grid>
            <Grid item width={200}>
              <Button className="enter tab" variant="contained" color="primary" onClick={checkInputs}>
                Enter
              </Button>
            </Grid>
            {page === "login" ? (
              <>
                <Grid item>
                  <Button className="signUn" variant="contained" color="primary">
                    <Link to="/auth/register">Sign-up</Link>
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="small" color="primary">
                    <Link to="/dashboard">Skip</Link>
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Button size="small" color="primary">
                    <Link to="/auth/login">Login</Link>
                  </Button>
                </Grid>{" "}
              </>
            )}
          </form>
        </Grid>
      </div>
    );
  })
);

export default Landing;
