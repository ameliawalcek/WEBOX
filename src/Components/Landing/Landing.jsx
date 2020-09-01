import React from "react";
import { observer, inject } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
      overflow: "hidden",
      padding: theme.spacing(0, 3)
    },
  }
}));

const Landing = inject("userStore", "mediaStore")(
  observer(props => {
    const classes = useStyles();
    return (
      <div>
        {/* {this.props.userStore ?<h2>Login</h2>: <h2>Sign-Up</h2>} */}
        <Grid container spacing={2}>
          <form className={classes.root} noValidate autoComplete="off" width="100%">
            <Grid item>
              <TextField id="standard-basic" label="User Name" />
              <TextField id="standard-password-input" label="Password" type="password" />
            </Grid>
            <Grid item>
              <Button className="enter tab" variant="contained" color="primary">
                Enter
              </Button>
            </Grid>
            <Grid item>
              <Button className="signUn" variant="contained" color="primary">
                Sign-up
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" color="primary">
                Skip
              </Button>
            </Grid>
            <Grid item></Grid>
          </form>
        </Grid>
        <Grid container spacing={2}>
          <form className={classes.root} noValidate autoComplete="off" width="100%">
            <Grid item>
              <TextField id="standard-basic" label="User Name" />
              <TextField id="standard-basic" label="Email" />
              <TextField id="standard-password-input" label="Password" type="password" />
            </Grid>
            <Grid item>
              <Button className="enter" variant="contained" color="primary">
                Enter
              </Button>
              <Grid item>
                <Button size="small" color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    );
  })
);

export default Landing;
