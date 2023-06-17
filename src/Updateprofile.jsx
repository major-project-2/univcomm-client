import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import { Box, Button, Toolbar} from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";
import logo from './univcomm-logo-transparent.png';
import { useState } from 'react';
import axios from 'axios';

const paperStyle={ padding:"30px 20px", width:500, margin:"50px auto"}

function Updateprofile() {
 
    const [fname, setFname]= useState("")
    const [lname, setLname]= useState("")
    const [email, setEmail]= useState("")

    const handleFname=(e)=>{setFname(e.target.value)}
    const handleLname=(e)=>{setLname(e.target.value)}
    const handleEmail=(e)=>{setEmail(e.target.value)}
    
    const navigate=useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        
          axios.put('https://univcommserver-1-k1997936.deta.app/api/v1/users/me',{
              first_name: fname,
              last_name: lname,
              email: email,
          })
          .then(()=>navigate('/regsuccess'))
          .catch(error=>{
            alert(error.response.data.detail)
            
            ;return})
    }

  return (
    <div className="App">
      <header className="App-header">
        <AppBar >
          <Toolbar sx={{backgroundColor: "white",color:"#014D4E"}}>
            <img src={logo} alt="UNIVCOMM" width="15%" />
            </Toolbar>
            </AppBar>
            <Toolbar/>   
      </header>

      <div  style={paperStyle}>
                <Paper elevation={6}>
                    <Grid align='center' >
                    <h1 style={{padding:"20px 20px", backgroundColor: "white",color:"#008080"}}>REGISTER</h1>
                    </Grid>
                    <Box component="div" sx={{padding: "0px 20px", display: "flex", alignItems: "center"}}>
                    <h3>or</h3>&nbsp;
                    <Link style={{ color:"#008080"}} to="/login">Login</Link>
                    </Box>
                    <form onSubmit={handleSubmit} style={{padding:"20px 20px"}}>
                        <TextField required variant="standard" value={fname} onChange={handleFname} fullWidth label="First Name" />
                        <TextField required variant="standard" value={lname} onChange={handleLname} fullWidth label="Last Name"/>
                        <TextField required variant="standard" value={email} onChange={handleEmail} type="email" fullWidth label="Email"/>
                       <Button type="submit" variant="outlined" style={{margin:"20px 0px 0px 0px"}}>SUBMIT</Button>
                    </form>
                </Paper>
            </div>
        </div>
  )
}

export default Updateprofile
