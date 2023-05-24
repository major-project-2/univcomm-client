import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Divider, Grid, Badge, Tab, Box, Toolbar, Avatar, Typography } from "@mui/material";
import {List, ListItem, ListItemButton, ListItemText, ListItemIcon} from "@mui/material";
import {Card, CardContent, CardHeader, CardMedia, CardActions} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import './Test.css';
import {TabContext, TabPanel, TabList} from "@mui/lab";
import { useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import FeedIcon from '@mui/icons-material/Feed';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import logo from './univcomm-logo-transparent.png'



const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  

  

  
  const container = window !== undefined ? () => window().document.body : undefined;

  const navigate=useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="nav" sx={{height:'1vh', top:0, zIndex:99}}>
      <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
         <>
         <img src={logo} alt="UNIVCOMM" width="15%" />
         </>
         <p style={{flexGrow:1}}/>
         <>
         <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
         <NotificationsIcon/>
         </Badge>
         </IconButton>
         <Toolbar/>
         <Button >LOG OUT</Button>
         </>
      </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
           <List sx={{backgroundColor:"#014D4E",color:"white" ,height:"100%"}}>
          <ListItem sx={{display:"flex",justifyContent:"center",marginBottom:"5vh"}}>
              <Avatar sx={{ width: 56, height: 56, marginTop:"5vh"}}>
                <AccountBoxIcon />
              </Avatar>
          </ListItem>
          <ListItem disablePadding onClick={(e)=>navigate('/dashboard')}>
          <ListItemButton >
            <ListItemIcon sx={{color:"white"}}>
            <FeedIcon />
            </ListItemIcon>
            <ListItemText primary=" Feed" />
          </ListItemButton>
      </ListItem>
        <ListItem disablePadding onClick={(e)=>navigate('/dashboard/create')}>
          <ListItemButton >
            <ListItemIcon sx={{color:"white"}}>
            <CreateIcon />
            </ListItemIcon>
            <ListItemText primary=" Create" />
          </ListItemButton>
      </ListItem>
      
     
      <ListItem disablePadding onClick={(e)=>navigate('/dashboard/announcements')}>
          <ListItemButton>
            <ListItemIcon sx={{color:"white"}}>
            <AnnouncementIcon />
            </ListItemIcon>
            <ListItemText primary=" Announcement" />
          </ListItemButton>
      </ListItem>
    
      <ListItem disablePadding onClick={(e)=>navigate('/dashboard/saved')}>
          <ListItemButton>
            <ListItemIcon sx={{color:"white"}}>
            <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary=" Saved" />
          </ListItemButton>
      </ListItem>
  
      </List>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
           <List sx={{backgroundColor:"#014D4E",color:"white" ,height:"100%"}}>
          <ListItem sx={{display:"flex",justifyContent:"center",marginBottom:"5vh"}}>
              <Avatar sx={{ width: 56, height: 56, marginTop:"5vh"}}>
                <AccountBoxIcon />
              </Avatar>
          </ListItem>
          <ListItem disablePadding onClick={(e)=>navigate('/dashboard')}>
          <ListItemButton >
            <ListItemIcon sx={{color:"white"}}>
            <FeedIcon />
            </ListItemIcon>
            <ListItemText primary=" Feed" />
          </ListItemButton>
      </ListItem>
        <ListItem disablePadding onClick={(e)=>navigate('/dashboard/create')}>
          <ListItemButton>
            <ListItemIcon sx={{color:"white"}}>
            <CreateIcon />
            </ListItemIcon>
            <ListItemText primary=" Create"/>
          </ListItemButton>
      </ListItem>

    
      <ListItem disablePadding onClick={(e)=>navigate('/dashboard/announcements')}>
          <ListItemButton>
            <ListItemIcon sx={{color:"white"}}>
            <AnnouncementIcon />
            </ListItemIcon>
            <ListItemText primary=" Announcement" />
          </ListItemButton>
      </ListItem>
      
      <ListItem disablePadding onClick={(e)=>navigate('/dashboard/saved')}>
          <ListItemButton>
            <ListItemIcon sx={{color:"white"}}>
            <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary=" Saved" />
          </ListItemButton>
      </ListItem>
      
      </List>
        </Drawer>
      </Box>
      <Outlet/>
    </Box>
  );
}

export default Dashboard;