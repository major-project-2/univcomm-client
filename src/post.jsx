import * as React from 'react';
import IconButton from '@mui/material/IconButton';
// import image from './blackbird-gc0bad9d5d_1920.jpg'
import { Grid, Tab, Box, Toolbar, Divider, Avatar, List, ListItem, TextField } from "@mui/material";

import {Card, CardContent, CardHeader, CardMedia, CardActions} from '@mui/material';

import {TabContext, TabPanel, TabList} from "@mui/lab";
import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import BackHandTwoToneIcon from '@mui/icons-material/BackHandTwoTone' 
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

const roles = {
  1: "Student",
  2: "Faculty",
  3: "Alumni"
}

function PostQ() {
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const [value, setValue] = useState('1');

     const [posts, setPosts] = useState([]);
     const [upvotePressed, setUpvotePressed] = useState(false);
    const [downvotePressed, setDownvotePressed] = useState(false);

    const [query, setQuery]= useState([]);
  const [handPressed, setHandPressed] = useState(false);

     useEffect(() => {
      getPosts();
      Getquery();
  
      return () => {
        setUpvotePressed(false);
        setDownvotePressed(false);

        setHandPressed(false);
      };
    }, [upvotePressed, downvotePressed, handPressed]);

     const getPosts = async () => {
      const result = await axios.get("https://univcommserver-1-k1997936.deta.app/api/v1/posts/", {
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
  
    setDownvotePressed(true);

    };

    const addDownvote = async (post_id) => {
      const result = await axios.post(
        `https://univcommserver-1-k1997936.deta.app/api/v1/posts/${post_id}/downvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
          },
        }
      );

    setDownvotePressed(true);
    };

      const removeUpvote = async (post_id) => {
        const result = await axios.delete(
          `https://univcommserver-1-k1997936.deta.app/api/v1/posts/${post_id}/upvote`,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
            },
          }
        );
        setUpvotePressed(true);

      };

      const addUpvote = async (post_id) => {
        const result = await axios.post(
          `https://univcommserver-1-k1997936.deta.app/api/v1/posts/${post_id}/upvote`,
          {},
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
            },
          }
        );
        setUpvotePressed(true);
      };
    

      function Getquery(){
        axios.get('https://univcommserver-1-k1997936.deta.app/api/v1/questions/',{
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
      function addComment(e, post_id){
        e.preventDefault();
        axios.post(`https://univcommserver-1-k1997936.deta.app/api/v1/posts/${post_id}/comments/`,{
              comment:comm
          },{
              headers:{Authorization: `Bearer ` + localStorage.getItem('token'),}
          })
          .then(result=>{
            console.log(result.data)
            getPosts()
            setComment("")
          })
          .catch(error=>{alert(error.response.data.detail);return})
      }


      const [answer, setAnswer]= useState("")
      const handleAnswer=(e)=>{setAnswer(e.target.value)}
      function addAnswer(e, question_id){
        e.preventDefault();
        axios.post(`https://univcommserver-1-k1997936.deta.app/api/v1/questions/${question_id}/answers/`,{
              answer:answer
          },{
              headers:{Authorization: `Bearer ` + localStorage.getItem('token'),}
          })
          .then(result=>{
            console.log(result.data)
            Getquery()
            setAnswer("")
          })
          .catch(error=>{alert(error.response.data.detail);return})
      }
    
      const aUpvote = (e, postId) => {
        addUpvote(postId);
      };
    
      
    
      const rUpvote = (e, postId) => {
        removeUpvote(postId);
      };
    
   
    
      const aDownvote = (e, postId) => {
        addDownvote(postId);
      };
   
      
      const rDownvote = (e, postId) => {
        removeDownvote(postId);
      };

      
  const addHandRaise = async (questionId) => {
    const result = await axios.post(
      `https://univcommserver-1-k1997936.deta.app/api/v1/questions/${questionId}/hand-raise`,
      {},
      {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('token'),
        },
      }
    );

    setHandPressed(true);
  };

  const aHandRaise = (e, questionId) => {
    addHandRaise(questionId);
  };

  const removeHandRaise = async (questionId) => {
    const result = await axios.delete(
      `https://univcommserver-1-k1997936.deta.app/api/v1/questions/${questionId}/hand-raise`,
      {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem('token'), },
      }
    );

    setHandPressed(true);
  };

  const rHandRaise = (e, questionId) => {
    removeHandRaise(questionId);
  };


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
        subheader={`${p.user.first_name} ${p.user.last_name} (${roles[p.user.role_id]})`}
      />
      <CardContent >
        <p>{p.content}</p><br/>
        {p.post_files.map((file) => (<>
          <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
        </>))}
      </CardContent>
      <CardActions sx={{padding:'0px',color:"#008080"}}>
   

        <IconButton
            onClick={(e) =>
              p.user_upvoted ? rUpvote(e, p.id) : aUpvote(e, p.id)
            }
            color="inherit"
          >
            {p.user_upvoted ? (
              <ArrowCircleUpIcon />
            ) : (
              <ArrowUpwardIcon />
            )}
          </IconButton>
          <h4> {p.user_upvotes.length} Upvote</h4>

          <IconButton
            onClick={(e) =>
              p.user_downvoted ? rDownvote(e, p.id) : aDownvote(e, p.id)
            }
            color="inherit"
          >
            {p.user_downvoted ? (
              <ArrowCircleDownIcon />
            ) : (
              <ArrowDownwardIcon  />
            )}
          </IconButton>
          <h4>  {p.user_downvotes.length} Downvote</h4>


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
              <TextField type="text" value={comm} onChange={handleComment} fullWidth label="Type your comment here..."/>
              <IconButton aria-label="comment" onClick={(e)=> addComment(e, p.id)} color="inherit">
          <AddCommentIcon />
        </IconButton> 
        
            </ListItem>
            {p.comments.map((c)=><>
            <ListItem>
          <Typography>  

            {`${c.user.first_name} ${c.user.last_name}: ${c.comment}`}
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
        <br/>
        { q.question_files.map((file) => (<>
          <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
        </>))}
      </CardContent>
      <CardActions sx={{padding:'0px',color:"#008080"}}>
        <IconButton aria-label="handraise" 
        
        onClick={(e) =>
          q.user_hand_raised ? rHandRaise(e, q.id) : aHandRaise(e, q.id)
        }
        color="inherit">

          {q.user_hand_raised ? (
              <BackHandIcon  />
            ) : (
              <BackHandTwoToneIcon />
            )}
     
        </IconButton>
        <h4>{q.user_raises.length} Handraise</h4>
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
              <TextField type="text" value={answer} onChange={handleAnswer} fullWidth label="Type your answer here..."/>
              <IconButton aria-label="answer" onClick={(e)=> addAnswer(e, q.id)} color="inherit">
          <AddCommentIcon />
        </IconButton> 
        
            </ListItem>
            {q.answers.map((a)=><>
            <ListItem>
          <Typography>  

            {`${a.user.first_name} ${a.user.last_name}: ${a.answer}`}
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