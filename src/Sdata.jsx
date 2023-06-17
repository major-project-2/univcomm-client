import React from 'react'
import {Grid} from '@mui/material';
import {Box, Toolbar, Typography} from '@mui/material'
import { useState, useEffect } from 'react';
import axios from 'axios';

const drawerWidth = 240;


function Sdata() {

  const [branch, setBranch]= useState("")
  const [semester, setSemester]= useState("")
  const [dept, setDept]= useState("")
  

  useEffect(()=>{
    getsdata();
  },[branch, semester, dept])

const getsdata = async () => {
  const result = await axios.get("https://univcommserver-1-k1997936.deta.app/api/v1/users/data/student", {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    },
  })

  .then(result=>{console.log(result)
    if(result.data){setBranch(result.data.branch);
      setSemester(result.data.semester);
      setDept(result.data.department);}})
      
.catch(error=>{console.log(error.response.data.detail);})
};



  return (
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
    <Toolbar/>
    <Grid item xs={8}>
      <Typography variant="h5" display="block">
          BRANCH: {branch}
        </Typography>
        <Typography variant="h5" display="block">
          SEMESTER: {semester}
        </Typography>
        <Typography variant="h5" display="block">
          DEPARTMENT: {dept}
        </Typography>
    </Grid>
    </Box>

  )
}

export default Sdata