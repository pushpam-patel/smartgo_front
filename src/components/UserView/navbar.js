import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
class Navbar extends Component{
    
    logout=()=>{
        localStorage.clear()
        window.location.href="/"
    }
    
    render(){
        return(
            <div>
                   <div className="appbar">
                       <Typography component="p" className="yat_logo">SMART GO</Typography>
                       <Typography onClick={this.logout} component="p" className="logout_btn">Logout</Typography>
                       <Typography onClick={()=>{window.location.href="/user/accident"}} component="p" className="logout_btn">Accident</Typography>
                       <Typography onClick={()=>{window.location.href="/user/traffic"}} component="p" className="logout_btn">Traffic</Typography> 
                       <Typography onClick={()=>{window.location.href="/user/locationwise"}} component="p" className="logout_btn">Location based schedules</Typography>
                       <Typography onClick={()=>{window.location.href="/user/daily"}} component="p" className="logout_btn">Daily Schedules</Typography>
                </div>
            </div>
        )
    }
}

export default Navbar