import React, { useEffect, useState } from 'react'
import {Card, CardContent, CardHeader, CardMedia, CardActions, Grid} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Box, Toolbar, Avatar} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import moment from 'moment/moment';
// import image from './blackbird-gc0bad9d5d_1920.jpg'

const drawerWidth = 240;

function Announce() {

  const [announce, setAnn]= useState([]);
  useEffect(() => {
    getAnn();

  }, []);

  function getAnn(){
    axios.get('https://univcommserver-1-k1997936.deta.app/api/v1/announcements/',{
          headers:{
            Authorization: `Bearer ` + localStorage.getItem('token'),
          }
      })
      .then(result=>{console.log(result)
          if(result.data){setAnn(result.data)}})
      .catch(error=>{alert(error.response.data.detail);})
  }



  return (
    
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
    <Toolbar/>
    <Grid item xs={8}>
    {announce.map((a) => 
      <>
    <Card sx={{marginBottom:"5vh"}}>
      <CardHeader
        title={a.title}
        subheader={moment(a.created_at).format("MMMM Do YYYY")}
      />
      <CardContent>
        <p>{a.content}</p>
      </CardContent>
    </Card>
    </>)}
    </Grid>
    </Box>

  )
}

export default Announce

{/* <Card sx={{marginBottom:"5vh"}}>
      <CardHeader
        title="Campus Recruitment Drive"
        subheader="2023-06-15"
      />
      <CardContent>
        <h4>it's our Pleasure to inform you Institute of Engineering Jiwaji University Gwalior again organize Campus Recruitment Drive with Plus91labs on 19/06/2023. Last Date to register:17/06/2023. Contact Placement Cell members for more info</h4>
      </CardContent>
    </Card>
    
    <Card sx={{marginBottom:"5vh"}}>
      <CardHeader
        title="Exam form approval"
        subheader="2023-06-1"
      />
      <CardContent>
        <h4>It is instructed for the students to kindly verify your documents and marksheet by the Exam-in Charge for approval of Exam form from 05/06/2023 to 09/06/2023.</h4>
      </CardContent>
    </Card> */}