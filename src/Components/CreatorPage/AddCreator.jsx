import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { Button, Grid, Paper, Typography, Icon } from "@material-ui/core";
import { useStyles } from "../styles/style";
import InputTextField from "./InputTextField";
import Header from '../Header/Header'
import YouTubeIcon from "@material-ui/icons/YouTube"
import TwitterIcon from "@material-ui/icons/Twitter"
import pngwave from "../assets/pngwave.png"

const AddCreator = inject("creatorStore", "mediaStore")(observer(props => {
  const classes = useStyles();
  props.mediaStore.setInput('')
  
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
      [target.name]: value
    })
  };

  const handleClick = () => {
    console.log(state);
  };

  const media = [
    { name: 'twitch', label: 'Twitch', icon: <Icon className="fab fa-twitch" fontSize="large" style={{ color: "#9147ff" }} />},
    { name: 'instagram', label: 'Instagram', icon: <img src={pngwave} alt="instagram" style={{ height: "30px" }} /> },
    { name: 'youtube', label: 'YouTube', icon:  <YouTubeIcon style={{ color: "#FF0000" }} fontSize="large" /> },
    { name: 'twitter', label: 'Twitter', icon: <TwitterIcon style={{ color: "#1da1f2" }} fontSize="large" /> }
  ]

  return (
    <Paper elevation={0} style={{ width: "100vw", height: "100vh" }}>
      <Header page={"basic"} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h6" align='center' style={{ marginTop: 10, paddingTop: 100, justifyContent: 'center' }}>
            SUGGEST A NEW CREATOR
              </Typography>
          <br />
          <Typography color='secondary' align='center'>
            Provide your favorite creator's username for...
              </Typography>
        </Grid>
        <form className={classes.rootLanding} noValidate autoComplete="off">
          <Grid item style={{ width: "70vw", align:'center' }}>
            {media.map(m => <InputTextField handleInput={handleInput} icon={m.icon} name={m.name} label={m.label} key={m.name}/>)}
          </Grid>
          <Grid item width={200}>
            <Button className={classes.buttonLanding} variant="contained" onClick={handleClick} color="secondary">
              SUBMIT
                </Button>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
})
);
export default AddCreator;
