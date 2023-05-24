import React from 'react'
import {Card, CardContent, CardHeader, CardMedia, CardActions} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Box, Toolbar, Avatar} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import image from './blackbird-gc0bad9d5d_1920.jpg'

const drawerWidth = 240;

function Announce() {
  return (
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
    <Toolbar/>
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
      <CardContent>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="upvote">
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton aria-label="downvote">
          <ArrowDownwardIcon />
        </IconButton>
      </CardActions>
    </Card>
    </Box>

  )
}

export default Announce