import React from 'react';
import './majorproject.css';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

function Welcome() {
   
    return (  
     <div>
        <Grid container direction="row" sx={{height:"80vh"}}>
        <Grid item md={6}>
            <center className="tittu" style={{margin:"30vh 0 0 0", color:"#008080"}}>
            <h1 >WELCOME TO UNIVCOMM </h1>
            <h2>The Official Community Forum of Jiwaji University</h2>
            </center>
          </Grid>
        <Grid item md={6}>
        <div>
              <img className="tittu" src="https://gwalior.soulsteer.com/wp-content/uploads/2021/05/Jiwaji-University-Gwalior-was-established-on-23-May-1964-1.jpg" alt="JIWAJI UNIVERSITY" />
            </div>
          </Grid>
          </Grid>
          <Divider variant="middle">INTRODUCTION</Divider>
          <Grid item md={12}>
            <center style={{fontStyle:"italic",padding:"20px 300px", color:"#008080"}}>
              <p>In the last 3 years, we have seen the students communication with the faculty using several social media platforms like Whatsapp. There is no specific platform for the students or faculty to communicate with each other or students to clarify something. Also, there is no platform for our college to communicate with the alumni, so as to learn from them through their experience.</p>
              <p>We thought that why not build a separate application for our college which makes easier for students to connect with the faculty or alumni and query their specific doubts, be it academic, placement related or career guidance.This thought drove out the inspiration to build Univcomm.</p>
            </center>
          </Grid>
          <Divider variant="middle">UNIVCOMM</Divider>
          <Grid item md={12}>
            <center style={{fontStyle:"italic",padding:"20px 300px", color:"#008080"}}>
              <p>Univcomm is an application for a college, where a student can query something about a topic or start a general discussion. Faculty or alumni can respond to them. Alumni can share their personal experience.</p>
              <p>There are three roles: Student, Faculty and Alumni. They can interact with each other and exchange some useful information.</p>
              <p>Exchange of information is the main motive.</p>
            </center>
          </Grid>
     </div>
     
    )
}

export default Welcome