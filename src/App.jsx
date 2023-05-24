import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import { Button, Toolbar} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Welcome from './Welcome.jsx';
import logo from './univcomm-logo-transparent.png';


function App() {
 
  const navigate=useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <AppBar >
          <Toolbar sx={{backgroundColor: "white"}}>
            <img src={logo} alt="UNIVCOMM" width="15%" />
            <p style={{flexGrow:1}}/>
            <Button onClick={(e)=>navigate('/login')}>Login</Button>
            <Button onClick={(e)=>navigate('/register')}>Register</Button>
            </Toolbar>
            </AppBar>
            <Toolbar/>   
      </header>

         <Welcome/> 
        

      <footer>
        
      </footer>
    </div>
  )
}

export default App
