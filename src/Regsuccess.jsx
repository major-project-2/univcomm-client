import React from 'react';
import {useNavigate, Link} from 'react-router-dom';

function Regsuccess() {
    const navigate=useNavigate();
    const redir=()=>navigate('/');
    setTimeout(redir,10000);
    return (
        <div>
            <center style={{margin:"30vh 0 0 0", backgroundColor: "white",color:"#008080"}}>
            <h2>Your Registration has been queued for approval by the Admin</h2>
            <h2>You will recieve an email from the Admin as soon as your credentials get approved.</h2>
            <h3>Redirecting to Welcome page ...</h3>
            <Link to='/'>Click Here to Redirect immediately</Link>
            </center>
        </div>
    )
}

export default Regsuccess