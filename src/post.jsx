import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import image from './blackbird-gc0bad9d5d_1920.jpg'
import { Grid, Tab, Box, Toolbar, Divider, Avatar, List, ListItem, TextField } from "@mui/material";

import {Card, CardContent, CardHeader, CardMedia, CardActions} from '@mui/material';

import {TabContext, TabPanel, TabList} from "@mui/lab";
import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BackHandIcon from '@mui/icons-material/BackHand';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';



const drawerWidth = 240;

function PostQ() {
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const [value, setValue] = useState('1');

     const [upvote,setUpvote] = useState(false);
     const [upcount,setUpcount] = useState(0);
     const [dnvote,setDnvote] = useState(false);
     const [dncount,setDncount] = useState(0);
     const [hraise,setHraise] = useState(false);
     const [hrcount,setHrcount] = useState(0);

     const handleDownvote = (e, postId) => {
      if(!dnvote){
        setDnvote(true);
        setDncount(dncount+1);
        addDownvote(postId);
      }
      else{
        setDnvote(false);
        setDncount(dncount-1);
        removeDownvote(postId);
      }
     }

     const handleUpvote = (e, postId) => {
      if(!upvote){
        setUpvote(true);
        setUpcount(upcount+1);
        addUpvote(postId);
      }
      else{
        setUpvote(false);
        setUpcount(upcount-1);
        removeUpvote(postId);
      }
     }

     const handleRaise = () => {
      if(!hraise){
        setHraise(true);
        setHrcount(hrcount+1);
      }
      else{
        setHraise(false);
        setHrcount(hrcount-1);
      }
     }

     const [posts, setPosts] = useState([]);

     useEffect(() => {
      getPosts();
      Getquery();
  
      return () => {
        setUpvote(false);
        setDnvote(false);
      };
    }, [upvote, dnvote]);

     const getPosts = async () => {
      const result = await axios.get("http://127.0.0.1:8000/api/v1/posts", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODUyNTg2MjksInN1YiI6IjQ3IiwiZGlzcGxheU5hbWUiOiJIciBhbHVtbmkifQ.dZLz1eCq_blj7ayi9hfQT0LQCLVn3gGLPWPsr6mx9hM`,
        },
      });
  
      setPosts(result.data);
    };
  
    const removeDownvote = async (postId) => {
      const result = await axios.delete(
        `http://127.0.0.1:8000/api/v1/posts/${postId}/downvote`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODUyNTg2MjksInN1YiI6IjQ3IiwiZGlzcGxheU5hbWUiOiJIciBhbHVtbmkifQ.dZLz1eCq_blj7ayi9hfQT0LQCLVn3gGLPWPsr6mx9hM`,
          },
        }
      );
  
    };

    const addDownvote = async (postId) => {
      const result = await axios.post(
        `http://127.0.0.1:8000/api/v1/posts/${postId}/downvote`,
        {},
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODUyNTg2MjksInN1YiI6IjQ3IiwiZGlzcGxheU5hbWUiOiJIciBhbHVtbmkifQ.dZLz1eCq_blj7ayi9hfQT0LQCLVn3gGLPWPsr6mx9hM`,
          },
        }
      );
    };

      const removeUpvote = async (postId) => {
        const result = await axios.delete(
          `http://127.0.0.1:8000/api/v1/posts/${postId}/upvote`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODUyNTg2MjksInN1YiI6IjQ3IiwiZGlzcGxheU5hbWUiOiJIciBhbHVtbmkifQ.dZLz1eCq_blj7ayi9hfQT0LQCLVn3gGLPWPsr6mx9hM`,
            },
          }
        );

      };

      const addUpvote = async (postId) => {
        const result = await axios.post(
          `http://127.0.0.1:8000/api/v1/posts/${postId}/upvote`,
          {},
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODUyNTg2MjksInN1YiI6IjQ3IiwiZGlzcGxheU5hbWUiOiJIciBhbHVtbmkifQ.dZLz1eCq_blj7ayi9hfQT0LQCLVn3gGLPWPsr6mx9hM`,
            },
          }
        );
    
      };
    
      const [query, setQuery]= useState(null);

      function Getquery(){
        axios.get('http://127.0.0.1:8000/api/v1/questions',{
              headers:{token:localStorage.getItem("token")}
          })
          .then(result=>{console.log(result)
              if(result.data){setQuery(result.data.questions)}})
          .catch(error=>{alert(error.response.data.detail);navigate('/login')})
      }

      const [comm, setComment]= useState("")
      const handleComment=(e)=>{setComment(e.target.value)}
      function addComment(e){
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/v1/postshttp://127.0.0.1:8000/api/v1/posts/6/comments/',{
              comment:comm
          },{
              headers:{token:localStorage.getItem("token")}
          })
          .then(result=>{pass})
          .catch(error=>{alert(error.response.data.detail);return})
      }

  return (
    
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Grid item xs={8}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', color:"#008080"}}>
          <TabList onChange={handleChange} centered textColor="inherit" TabIndicatorProps={{style: {backgroundColor: "#008080"}}}>
            <Tab label="All" value="1" />
            <Tab label="Post" value="2" />
            <Tab label="Query" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <Card sx={{marginBottom:"5vh"}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        image={image}
        alt="Paella dish"
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      />
      <CardContent >
        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
      </CardContent>
      <CardActions sx={{padding:'0px',color:"#008080"}}>
       
        <IconButton aria-label="upvote" onClick={handleUpvote} color="inherit">
          <ArrowUpwardIcon />
        </IconButton>
        <h4>{upcount} Upvote</h4>
        <IconButton aria-label="downvote" onClick={handleDownvote} color="inherit">
          <ArrowDownwardIcon />
        </IconButton>
        <h4>{dncount} Downvote</h4>
        </CardActions>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <TextField type="text" value={comm} onChange={handleComment} fullWidth label="Type your comment here"/>
              <IconButton aria-label="comment" onClick={addComment} color="inherit">
          <AddCommentIcon />
        </IconButton> 
            </ListItem>
            <ListItem>
          <Typography>  
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          </ListItem>
          <Divider/>
          <ListItem>
          <Typography>  
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    
      
    </Card>
        </TabPanel>
        <TabPanel value="2">
        {posts.map((p) => (
        <>
        <Card sx={{marginBottom:"5vh"}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {p.user.first_name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={p.title}
        subheader={p.user.first_name+" "+p.user.last_name+" "+p.user.roll_no}
       />
      <CardMedia
        component="img"
        image={image}
        alt="Paella dish"
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      />
      <CardContent >
      <Typography variant="body2" color="text.secondary">
               
               {p.content}
              </Typography>
      </CardContent>
      <CardActions sx={{padding:'0px',color:"#008080"}}>
       
        <IconButton aria-label="upvote" onClick={handleUpvote} color="inherit">
          <ArrowUpwardIcon />
        </IconButton>
        <h4>{upcount} Upvote</h4>
        <IconButton aria-label="downvote" onClick={handleDownvote} color="inherit">
          <ArrowDownwardIcon />
        </IconButton>
        <h4>{dncount} Downvote</h4>
        </CardActions>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
          <Typography>  
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          </ListItem>
          <Divider/>
          <ListItem>
          <Typography>  
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    
      
        </Card>
        </>
        ))}
        </TabPanel>

        <TabPanel value="3">
        {query&&query.map((question)=>
        <>
        <Card sx={{marginBottom:"5vh"}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {question.user.first_name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Query"
        subheader={question.user.first_name+" "+question.user.last_name+" "+question.user.roll_no}
      />
      <CardContent>
      <Typography variant="body2" color="text.secondary">
               {question.question}
      </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{color:"#008080"}}>
        <IconButton aria-label="handraise" onClick={handleRaise} color="inherit">
          <BackHandIcon /><h6>{hrcount} Handraise</h6>
        </IconButton>
      </CardActions>
    </Card>
    </>)}
        </TabPanel>
      </TabContext>
      </Grid>
      </Box>
  );
}

export default PostQ;