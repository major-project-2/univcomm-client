import React from 'react'
import {Grid} from '@mui/material';
import {Box, Toolbar, Typography, Button} from '@mui/material'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sdata from './Sdata';
import Fdata from './Fdata';
import Aldata from './Aldata';

const drawerWidth = 240;


function Profile() {

  const [fname, setFname]= useState("")
  const [lname, setLname]= useState("")
  const [role, setRole]= useState("")
  const [email, setEmail]= useState("")
  const [rollno, setRollno]= useState("")
  const nme=fname+" "+lname

  useEffect(()=>{
    getProfile();
  },[fname, lname,email,rollno])

const getProfile = async (user_id) => {
  const result = await axios.get("https://univcommserver-1-k1997936.deta.app/api/v1/users/${user_id}", {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    },
  })

  .then(result=>{console.log(result)
    if(result.data){setFname(result.data.first_name);
      setLname(result.data.last_name);
      setEmail(result.data.email);
      setRollno(result.data.roll_no);
      setRole(result.data.role_id);}})
      
.catch(error=>{console.log(error.response.data.detail);})
};

function roleprofile(role){
  switch(role) {
    case 0:
      return(<Sdata/>);
      break;
    case 1:
      return(<Fdata/>);
      break;
    case 2:
      return(<Aldata/>);
      break;
    default:
      return(pass);
  }
}

const navigate=useNavigate();
  return (
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
    <Toolbar/>
    <Grid item xs={8}>
      <Typography variant="h5" display="block">
          NAME: {nme}
        </Typography>
        <Typography variant="h5" display="block">
          ROLE: {role}
        </Typography>
        <Typography variant="h5" display="block">
          EMAIL: {email}
        </Typography>
        <Typography variant="h5" display="block">
        Rollno/Faculty.ID/Alumni.ID: {rollno}
        </Typography>
        {roleprofile}
        
        <Button type="submit" variant="outlined" style={{margin:"20px 0px 0px 0px"}} onClick={(e)=>navigate('/profile/updateprofile')}>UPDATE PROFILE</Button>
    </Grid>
    </Box>

  )
}

export default Profile
{/* <Typography variant="h5" display="block">
          NAME: Balram A S
        </Typography>
        <Typography variant="h5" display="block">
          ROLE: Student
        </Typography>
        <Typography variant="h5" display="block">
          EMAIL: balramas11@gmail.com
        </Typography>
        <Typography variant="h5" display="block">
        Rollno/Faculty.ID/Alumni.ID: 191660201
        </Typography>
        <Typography variant="h5" display="block">
        BRANCH: BE CSE
        </Typography>
        <Typography variant="h5" display="block">
        SEMESTER: VIII
        </Typography>
        <Typography variant="h5" display="block">
        DEPARTMENT: Engineering
        </Typography>
        <Button type="submit" variant="outlined" style={{margin:"20px 0px 0px 0px"}}>UPDATE PROFILE</Button> */}