import * as React from 'react';

import { Grid, Tab, Box, Toolbar, Paper, TextField, Button } from "@mui/material";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import {TabContext, TabPanel, TabList} from "@mui/lab";

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const paperStyle={ padding:"5px 20px", width:"100%", margin:"auto"}
const drawerWidth = 240;

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function Createf() {
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const [value, setValue] = useState('1');

      const navigate=useNavigate();
      const [title, setTitle]= useState("")
      const [content, setContent]= useState("")
      const handleTitle=(e)=>{setTitle(e.target.value)}
      const handleContent=(e)=>{setContent(e.target.value)}
      function handleSubmitP(e){
          e.preventDefault();
          axios.post('https://univcommserver-1-k1997936.deta.app/api/v1/posts/',{
              title: title,
              content: content
          },{
              headers:{Authorization: `Bearer ` + localStorage.getItem('token'),}
          })
          .then(result=>{console.log(result)
              if(result.data){navigate('/dashboard')}})
          .catch(error=>{alert(error.response.data.detail);return})}

          const [ques, setQues]= useState("")
          const handleQues=(e)=>{setQues(e.target.value)}
          function handleSubmitQ(e){
              e.preventDefault();
              axios.post('https://univcommserver-1-k1997936.deta.app/api/v1/questions/',{
                  question: ques,
              },{
                  headers:{Authorization: `Bearer ` + localStorage.getItem('token'),}
              })
              .then(result=>{console.log(result)
                  if(result.data){navigate('/dashboard')}})
              .catch(error=>{alert(error.response.data.detail);return})
          }

          const [pfile, setpFile] = useState(null);
          const [qfile, setqFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const getpFile = (e) => {
    setpFile(e.target.files[0]);
  };

  const uploadpFile = (e) => {
    const storageRef = ref(storage, pfile.name);

    const uploadTask = uploadBytesResumable(storageRef, pfile);
    setUploading(true);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        setUploading(false);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        setUploading(false);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              axios.post('https://univcommserver-1-k1997936.deta.app/api/v1/posts/{post_id}/files',{
                  url: downloadURL,
                  name: pfile.name,
              },{
                  headers:{token:localStorage.getItem("token")}
              })
              .then(result=>{console.log(result)
                  if(result.data){pass}})
              .catch(error=>{alert(error.response.data.detail);return})
        });
      }
    );
  };

  const getqFile = (e) => {
    setqFile(e.target.files[0]);
  };

  const uploadqFile = (e) => {
    const storageRef = ref(storage, qfile.name);

    const uploadTask = uploadBytesResumable(storageRef, qfile);
    setUploading(true);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        setUploading(false);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        setUploading(false);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              axios.post('https://univcommserver-1-k1997936.deta.app/api/v1/questions/{question_id}/files',{
                  url: downloadURL,
                  name: qfile.name,
              },{
                  headers:{token:localStorage.getItem("token")}
              })
              .then(result=>{console.log(result)
                  if(result.data){pass}})
              .catch(error=>{alert(error.response.data.detail);return})
        });
      }
    );
  };

  return (
    
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Grid item xs={8}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} centered >
            <Tab label="Post" value="1" />
            <Tab label="Query" value="2" />
          </TabList>
        </Box>
        
        <TabPanel value="1">
        <div  style={paperStyle}>
                <Paper elevation={6}>
                    <Grid align='center' >
                    <h3 style={{padding:"20px 20px", backgroundColor: "white", color:"#008080"}}>Please input your post</h3>
                    </Grid>
                    <form onSubmit={handleSubmitP} style={{padding:"20px 20px"}}>
                        <TextField required variant="filled" value={title} onChange={handleTitle} type="text" fullWidth label="Title"/>
                        
                        <TextField required variant="filled" value={content} onChange={handleContent} type="text" multiline fullWidth label="Content"/>
                        <div>
                          <Toolbar />
                          Upload files here:
                          <br />
                          <TextField type="file" onChange={getpFile}  accept=".jpg, .jpeg, .png, .pdf"/>
                          <br />
                          <Button onClick={uploadpFile}>Upload</Button>
                          <Toolbar />
                          {uploading && (
                            <>
                              Progress:&nbsp;
                              <CircularProgressWithLabel value={progress} />
                            </>
                          )}
                        </div>
                        <Button type="submit" variant="outlined" style={{margin:"20px 0px 0px 0px"}}>POST</Button>
                    </form>
                </Paper>
            </div>
        </TabPanel>
        <TabPanel value="2">
        <div  style={paperStyle}>
                <Paper elevation={6}>
                    <Grid align='center' >
                    <h3 style={{padding:"20px 20px", backgroundColor: "white", color:"#008080"}}>Please input your question</h3>
                    </Grid>
                    <form onSubmit={handleSubmitQ} style={{padding:"20px 20px"}}>
                        <TextField required variant="filled" value={ques} onChange={handleQues} type="text" multiline fullWidth label="Question"/>
                        <div>
                          <Toolbar />
                          Upload files here (Optional):
                          <br />
                          <TextField type="file" onChange={getqFile}  accept=".jpg, .jpeg, .png, .pdf"/>
                          <br />
                          <Button onClick={uploadqFile}>Upload</Button>
                          <Toolbar />
                          {uploading && (
                            <>
                              Progress:&nbsp;
                              <CircularProgressWithLabel value={progress} />
                            </>
                          )}
                        </div>
                        <Button type="submit" variant="outlined" style={{margin:"20px 0px 0px 0px"}}>ASK</Button>
                    </form>
                </Paper>
            </div>
        </TabPanel>
      </TabContext>
      </Grid>
      </Box>
  );
}

export default Createf;