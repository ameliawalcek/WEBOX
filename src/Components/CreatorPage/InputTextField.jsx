import React, { useState } from "react";
import { useStyles } from "../styles/style";
import { TextField } from "@material-ui/core";

function InputTextField(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    twitch: "",
    youtube: "",
    twitter: "",
    instagram: ""
  });
  
  const handleInput = ({ target }) => {
    const value = target.value;
    setState({
      ...state,
      [props.name]: value
    })
   
  };

  return (
    <TextField
      className={classes.inputLanding}
      key={props.name}
      type="text"
      id="standard-basic"
      color="secondary"
      name={props.name}
      label={props.label}
      onChange={handleInput}
    />
  );
}

export default InputTextField;
