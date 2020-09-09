import React from "react";
import { useStyles } from "../styles/style";
import { TextField, Grid } from "@material-ui/core";

function InputTextField(props) {
  const classes = useStyles();

  const handleInput = ({ target }) => {
    props.handleInput({ target })
  }

  return (
    <Grid container spacing={0} justify="center" alignItems="center"

    >
      <Grid item xs={3} align="center">
        {props.icon}
      </Grid>
      <Grid item xs={9} align="center">
        <TextField
          className={classes.inputLanding}
          key={props.name}
          type="text"
          id={props.name}
          color="secondary"
          name={props.name}
          label={props.label}
          onChange={handleInput}
        />
      </Grid>
    </Grid>
  );
}

export default InputTextField;
