import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar';

class SignupPage extends Component{
    state={
        name='',
        email='',
        pnum='',
        pass='',
        cnfpass='',
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
              password:this.state.password,
              user_type:"user"
            }
        }
    }
}

export default SignupPage