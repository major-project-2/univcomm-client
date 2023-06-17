import * as React from 'react';
import IconButton from '@mui/material/IconButton';
// import image from './blackbird-gc0bad9d5d_1920.jpg'
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

     const handleDownvote = (e, post_id) => {
      if(!dnvote){
        setDnvote(true);
        setDncount(dncount+1);
        addDownvote(post_id);
      }
      else{
        setDnvote(false);
        setDncount(dncount-1);
        removeDownvote(post_id);
      }
     }

     const handleUpvote = (e, post_id) => {
      if(!upvote){
        setUpvote(true);
        setUpcount(upcount+1);
        addUpvote(post_id);
      }
      else{
        setUpvote(false);
        setUpcount(upcount-1);
        removeUpvote(post_id);
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
      const result = await axios.get("https://univcommserver-1-k1997936.deta.app/api/v1/posts", {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('token'),
        },
      });
  
      setPosts(result.data);
      console.log(result);
    };
  
    const removeDownvote = async (post_id) => {
      const result = await axios.delete(
        `https://univcommserver-1-k1997936.deta.app/api/v1/posts/${post_id}/downvote`,
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
          },
        }
      );
  
    };

    const addDownvote = async (post_id) => {
      const result = await axios.post(
        `https://univcommserver-1-k1997936.deta.app/posts/api/v1/${post_id}/downvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
          },
        }
      );
    };

      const removeUpvote = async (post_id) => {
        const result = await axios.delete(
          `https://univcommserver-1-k1997936.deta.app/posts/api/v1/${post_id}/upvote`,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
            },
          }
        );

      };

      const addUpvote = async (post_id) => {
        const result = await axios.post(
          `https://univcommserver-1-k1997936.deta.app/posts/api/v1/${post_id}/upvote`,
          {},
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
            },
          }
        );
    
      };
    
      const [query, setQuery]= useState(null);

      function Getquery(){
        axios.get('https://univcommserver-1-k1997936.deta.app/api/v1/questions',{
              headers:{
                Authorization: `Bearer ` + localStorage.getItem('token'),
              }
          })
          .then(result=>{console.log(result)
              if(result.data){setQuery(result.data)}})
          .catch(error=>{alert(error.response.data.detail);})
      }

      const [comm, setComment]= useState("")
      const handleComment=(e)=>{setComment(e.target.value)}
      function addComment(e){
        e.preventDefault();
        axios.post('https://univcommserver-1-k1997936.deta.app/api/v1/posts/${post_id}/comments/',{
              comment:comm
          },{
              headers:{Authorization: `Bearer ` + localStorage.getItem('token'),}
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
            {/* <Tab label="All" value="1" /> */}
            <Tab label="Post" value="1" />
            <Tab label="Query" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">

          {posts.map((p) => 
        <>
        <Card sx={{marginBottom:"5vh"}}>
      <CardHeader
        title={p.title}
        subheader={p.user.first_name+" "+p.user.last_name}
      />
      <CardContent >
        <p>{p.content}</p><br/>
        <a href={p.post_files.url}>{p.post_files.name}</a>
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
            {p.comments.map((c)=><>
            <ListItem>
          <Typography>  
            {c.comment}
          </Typography>
          </ListItem>
          <Divider/>
          </>)}
          </List>
        </AccordionDetails>
      </Accordion>
     
    </Card>
    </>
        )}
        </TabPanel>
        <TabPanel value="2">
          {query&&query.map((q)=>
        <>
        <Card sx={{marginBottom:"5vh"}}>
      <CardHeader
        title={q.user.first_name+" "+q.user.last_name}
        subheader={"Roll.no: "+q.user.roll_no}
      />
      <CardContent >
        <p>{q.question}</p>
      </CardContent>
      <CardActions sx={{padding:'0px',color:"#008080"}}>
        <IconButton aria-label="handraise" onClick={handleRaise} color="inherit">
          <BackHandIcon /><h6>{hrcount} Handraise</h6>
        </IconButton>
      </CardActions>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Answers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <TextField type="text" value={comm} onChange={handleComment} fullWidth label="Type your comment here"/>
              <IconButton aria-label="comment" onClick={addComment} color="inherit">
          <AddCommentIcon />
        </IconButton> 
            </ListItem>
            {q.answers.map((a)=><>
            <ListItem>
          <Typography>  
           {a.answer}
          </Typography>
          </ListItem>
          <Divider/>
          </>)}
          </List>
        </AccordionDetails>
      </Accordion>
      
    </Card>
    </>)}
        </TabPanel>
      </TabContext>
      </Grid>
      </Box>
  );
}

export default PostQ;

{/* <TabPanel value="1">
        <Card sx={{marginBottom:"5vh"}}>
      <CardHeader
        title="College Placement Checklist"
        subheader="Dev Patel, Alumni"
      />
      <CardContent >
        <p>1. Dress to impress
2. Speak with body language
3. Work on your communication skills
4. Organize all the documents in a folder
5. Get enough sleep</p>
      </CardContent>
      <CardActions sx={{padding:'0px',color:"#008080"}}>
       
        <IconButton aria-label="upvote" onClick={handleUpvote} color="inherit">
          <ArrowUpwardIcon />
        </IconButton>
        <h4>32 Upvote</h4>
        <IconButton aria-label="downvote" onClick={handleDownvote} color="inherit">
          <ArrowDownwardIcon />
        </IconButton>
        <h4>2 Downvote</h4>
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
            Thank you Sir.
          </Typography>
          </ListItem>
          <Divider/>
          <ListItem>
          <Typography>  
            These tips are really helpful thank you so much Sir.
          </Typography>
          </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    
      
    </Card>
        </TabPanel>
        <TabPanel value="2">
        <Card sx={{marginBottom:"5vh"}}>
      <CardHeader
        title="Kabir Gupta, Student"
        subheader="Roll.no: 165234789"
      />
      <CardContent >
        <p>Can anyone suggest any good youtube resource to study DSA in Python?</p>
      </CardContent>
      <CardActions sx={{padding:'0px',color:"#008080"}}>
        <IconButton aria-label="handraise" onClick={handleRaise} color="inherit">
          <BackHandIcon /><h6>18 Handraise</h6>
        </IconButton>
      </CardActions>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Answers</Typography>
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
           There is a youtube channel called CampusX where you can find a playlist on Python.
          </Typography>
          </ListItem>
          <Divider/>
          <ListItem>
          <Typography>  
            Freecodecamp is a great resource. If you want to learn in hindi you can check CodewithHarry.
          </Typography>
          </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    
      
    </Card>
        </TabPanel> */}