import React from "react";
import { Menu, MenuItem, IconButton, Grid } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

function Notification(props) {
  const ITEM_HEIGHT = 20;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const deleteNotification = () => {
    props.p.deleteNotification(props.notification._id, props.p.userId);
  };

  const options = ["Remove"];

  return (
    <>
      <Grid item>
        <IconButton
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon  />
        </ IconButton >
        {props.n.icon} 
        <Link to={`creator/${props.n.creatorId}`} style={{ color: "#9853ff" ,textDecoration: 'none', fontWeight: 900 , marginLeft: 15, marginRight: 5 }}> 
         {props.name}   
        </Link>
         {props.n.notification}
      </Grid>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={deleteNotification}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
export default Notification;
