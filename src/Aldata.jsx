import React from 'react'
import {Grid} from '@mui/material';
import {Box, Toolbar, Typography} from '@mui/material'
import { useState, useEffect } from 'react';
import axios from 'axios';

const drawerWidth = 240;


function Aldata() {

  const [dept, setDept]= useState("")
  const [branch, setBranch]= useState("")
  const [batch, setBatch]= useState("")
  const [org, setOrg]= useState("")
  const [sdate, setSdate]= useState("")
  const [edate, setEdate]= useState("")
  const [odept, setODept]= useState("")
  

  useEffect(()=>{
    getaldata();
  },[desig, org, dept, sdate, edate])

const getaldata = async () => {
  const result = await axios.get("https://univcommserver-1-k1997936.deta.app/api/v1/users/alumni", {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem('token'),
    },
  })

  .then(result=>{console.log(result)
    if(result.data){
        setDept(result.data.department);
        setBranch(result.data.branch);
        setBatch(result.data.batch);
        setOrg(result.data.experience.organization);
        setODept(result.data.experience.department);
        setSdate(result.data.experience.start_date);
        setEdate(result.data.experience.end_date);
    }})
      
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
          DEPARTMENT: {dept}
        </Typography>
        <Typography variant="h5" display="block">
          BRANCH: {branch}
        </Typography>
        <Typography variant="h5" display="block">
          BATCH: {batch}
        </Typography>
        <Typography variant="h5" display="block">
          ORGANIZATION: {org}
        </Typography>
        <Typography variant="h5" display="block">
          DEPARTMENT: {odept}
        </Typography>
        <Typography variant="h5" display="block">
          START DATE: {sdate}
        </Typography>
        <Typography variant="h5" display="block">
          END-DATE: {edate}
        </Typography>
    </Grid>
    </Box>

  )
}

export default Aldata