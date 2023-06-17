import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Divider, Grid, Badge, Tab, Box, Toolbar, Avatar, Typography, Paper, TextField } from "@mui/material";
import {List, ListItem, ListItemButton, ListItemText, ListItemIcon} from "@mui/material";
import {Card, CardContent, CardHeader, CardMedia, CardActions} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import './Test.css';
import {TabContext, TabPanel, TabList} from "@mui/lab";
import { useState , useEffect} from "react";
import CreateIcon from '@mui/icons-material/Create';
import FeedIcon from '@mui/icons-material/Feed';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import logo from './univcomm-logo-transparent.png'
import axios from 'axios';


const paperStyle={ padding:"5px 20px", width:"100%", margin:"auto"}
const drawerWidth = 240;

const roles = {
  1: "Student",
  2: "Faculty",
  3: "Alumni"
}


function Updateprofile(props) {

  const navigate = useNavigate()

  const [updateProfileData, setUpdateProfileData] = useState({
    fname: "",
    lname: "",
    password: "",

  })

  useEffect(()=>{
    getProfile();
  },[])



const getProfile =  () => {
  const result =  axios.get("https://univcommserver-1-k1997936.deta.app/api/v1/users/me", {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    },
  })

  .then(result=>{console.log(result)
    if(result.data){
      setUpdateProfileData({
        ...updateProfileData,
        fname: result.data.first_name,
        lname: result.data.last_name,
      })
      }})
      
.catch(error=>{console.log(error.response.data.detail);})
};

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
  const container = window !== undefined ? () => window().document.body : undefined;

  function Logout(){
    localStorage.removeItem("token")
    navigate('/')
}

const handleChange = (e) => {
  setUpdateProfileData({...updateProfileData,
    [e.target.name]: e.target.value

  })
}

const handleUpdate = (e) => {

  e.preventDefault()

  axios.put("https://univcommserver-1-k1997936.deta.app/api/v1/users/me",
  {
    first_name: updateProfileData.fname,
    last_name: updateProfileData.lname,
    password: updateProfileData.password
},
  {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    },
  })

  .then(result=>{console.log(result)
    if(result.data){
      navigate('/dashboard/profile')
      }})
      
.catch(error=>{console.log(error.response.data.detail);})
}



  return (
    <div  style={paperStyle}>
                <Paper elevation={6}>
                    <Grid align='center' >
                    <h3 style={{padding:"20px 20px", backgroundColor: "white", color:"#008080"}}>Update Profile</h3>
                    </Grid>
                    <form onSubmit={handleUpdate} style={{padding:"20px 20px"}}>
                        <TextField variant="filled" name="fname" value={updateProfileData.fname} onChange={handleChange} type="text" fullWidth label="First Name"/>
                        
                        <TextField variant="filled" name="lname" value={updateProfileData.lname} onChange={handleChange} type="text" fullWidth label="Last Name"/>

                        <TextField variant="filled" name="password" value={updateProfileData.password} onChange={handleChange} type="password" fullWidth label="Password"/>

                        <Button type="submit" variant="outlined" style={{margin:"20px 0px 0px 0px"}}>Update</Button>
                    </form>
                </Paper>
            </div>
  );
}

export default Updateprofile;