import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar';
var sha1 = require('sha1');

class SignupPage extends Component{
    state={
        name:'',
        email:'',
        pnum:'',
        pass:'',
        cnfpass:'',
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message:''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };    

    handleClick = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    signup = ()=>{
        if(this.state.pass==this.state.confpass){
            let new_user={
              name:this.state.name,
              email:this.state.email,
              pnum:this.state.pnum,
              password:sha1(this.state.pass),
              user_type:"user"
            }
            axios.post('https://thawing-wave-40268.herokuapp.com/users',new_user,{
            header:{
              'Content-type':'application/json'
            }
            }).then((res)=>{
            this.setState({
              message:"Successful signup"
            })
            this.handleClick()
            setTimeout(() => {
              window.location.href="/user/login"
            }, 2000);
          }).catch((err)=>{
            this.setState({
              message:"Something went wrong. Please try again."
            })
            this.handleClick()
        })

        }
        else{
          this.setState({
            message:"Password and Confirm Password are different."
          })
          this.handleClick()
        }
    }

    render(){
      const { vertical, horizontal, open } = this.state;
        return(
            <div className="signup_main_div">
              <Typography component="p" variant="h2" className="heading_t2">SMART GO</Typography>
            <Paper className="roundedsu width_less">
            <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
        />
                <Typography component="p" className="accidents_heading">Signup Page</Typography>
                <TextField
          id="outlined-name"
          label="Name"
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        /><br></br>    
        <TextField
          id="outlined-name"
          label="E-mail"
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
          variant="outlined"
        /><br></br>
          <TextField
          id="outlined-name"
          label="Aadhar Number"
          value={this.state.pnum}
          onChange={this.handleChange('pnum')}
          margin="normal"
          variant="outlined"
        /><br></br>
        <TextField
          id="outlined-name"
          label="Password"
          value={this.state.pass}
          onChange={this.handleChange('pass')}
          type="password"
          margin="normal"
          variant="outlined"
        /><br></br>
          <TextField
          id="outlined-name"
          label="Confirm Password"
          value={this.state.confpass}
          onChange={this.handleChange('confpass')}
          type="password"
          margin="normal"
          variant="outlined"
        /><br></br>
        <Button onClick={this.signup} className="signup_btn">Sign Up</Button>
        </Paper>
            </div>
        )
    }
}

export default SignupPage