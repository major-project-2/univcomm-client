import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Dashboard from './Dashboard.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Createf from './createf.jsx'
import PostQ from './post.jsx'
import Announce from './Announce.jsx'
import Saved from './Saved.jsx'
import Regsuccess from './Regsuccess.jsx'
import Ucreg from './Ucreg.jsx'
import Uclogin from './Uclogin.jsx'
import { ThemeProvider, createTheme } from '@mui/material'

const theme=createTheme({
  palette:{
    mode:"light",
    primary:{
      main:"#014D4E",
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route index element={<PostQ/>}/>
        <Route path="create" element={<Createf/>}/>
        <Route path="announcements" element={<Announce/>}/>
        <Route path="saved" element={<Saved/>}/>
      </Route>
      <Route path="/register" element={<Ucreg/>}/>
      <Route path="/login" element={<Uclogin/>}/>
      <Route path="/regsuccess" element={<Regsuccess/>}/>
      <Route path="/main" element={<h1>dashboard</h1>}/>
      <Route path="/create" element={<Createf/>}/>
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>,
)
