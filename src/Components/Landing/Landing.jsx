import React from "react";
import { observer, inject } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const Landing = inject("userStore", "mediaStore")(
  observer(props => {
    return (
      <div>
        {this.props.userStore ?<h2>Login</h2>: <h2>Sign-Up</h2>}
       



export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="User Name" />
      <TextField id="standard-password-input" label="Password" />
    </form>
  );
}


      </div>
    );
  })
);

export default Landing;
