import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar';

class LoginPagePloice extends Component{
    state={
        email:'',
        password:'',
        pincode:'',
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

    login=()=>{
        axios.get('https://thawing-wave-40268.herokuapp.com/users').then((res)=>{
            let data=res.data
            console.log(data)
            let flag=0
            data.forEach((val,ind)=>{
                if(val.email==this.state.email && val.password==this.state.password){
                    flag=1
                    localStorage.setItem('yatayat_user',JSON.stringify(val))
                    this.setState({
                        message:"Login successful."
                    })
                    this.handleClick()
                    setTimeout(() => {
                        if(val.user_type=="user"){
                            window.location.href="/user/traffic"
                        }
                        else if(val.user_type=="police"){
                            window.location.href="/police"
                        }
                        else if(val.user_type=="hospital"){
                            window.location.href="/hospital"
                        }
                        else if(val.user_type=="driver"){
                            window.location.href="/driver"
                        }
                    }, 2000);
                }
            })
            if(flag==0){
                this.setState({
                    message:"User not found. Please sign up."
                })
                this.handleClick()
            }
        })
    }

    render(){
        const { vertical, horizontal, open } = this.state;
        return(
            
            <div className="login_main_div">
                <Typography component="p" variant="h2" className="heading_t">SMART GO</Typography>
            <Paper className="roundedlg width_less">
            <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
        />
                <Typography component="p" variant="h4" className="accidents_heading">Police Login</Typography>
                
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
          label="Area Pincode"
          value={this.state.pincode}
          onChange={this.handleChange('pincode')}
          type="number"
          margin="normal"
          variant="outlined"
        /><br></br>
        <TextField
          id="outlined-name"
          label="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          type="password"
          margin="normal"
          variant="outlined"
        /><br></br>
        <Button onClick={this.login} className="login_btn">Login</Button>
        </Paper>
            </div>
        )
    }
}

export default LoginPagePloice