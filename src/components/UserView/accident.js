import React,{Component} from 'react'
import Nav from './navbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CircularProgress } from '@material-ui/core';


class AccidentReport extends Component{
    state={
        address:'',
        level:'',
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message:'',
        sending:false,
        taking_location:false
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

    take_location=()=>{
        this.setState({
            taking_location:true
        })
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
          console.log("Geolocation is not supported by this browser.")
        }
    }

showPosition=(position)=> {
    console.log(position.coords)

    let n={
        lat:position.coords.latitude,
        long:position.coords.longitude
    }

    console.log(n)

    axios.post('https://rocky-atoll-55276.herokuapp.com/rgeo',n,{
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        this.setState({
            taking_location:false
        })
        console.log(res)
        this.setState({
            address:res.data
        })
    })

}

handleClick = () => {
    this.setState({ open: true });
};

handleClose = () => {
    this.setState({ open: false });
};

    send_message=()=>{
        this.setState({
            sending:true
        })
        let currentdate = new Date(); 
        let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        axios.post('https://rocky-atoll-55276.herokuapp.com/accident',{time:datetime,place:this.state.address,level:this.state.level},{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            this.setState({
                message:"Accident reported successfully.",
                sending:false
            })
            this.handleClick()
        }).catch((err)=>{
            this.setState({
                message:"Something went wrong. Please submit report again."
            })
            this.handleClick()
        })

    }

    logout=()=>{
        localStorage.clear()
        window.location.href="/"
    }

    render(){
        const { vertical, horizontal, open } = this.state;
        return(
            <div>
                <Nav />
            <div className="main_div center m_top">
            <Paper className="rounded width_less accident_div_down">
            <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
        />
                <Typography component="p" className="accidents_heading">Accident Reporting</Typography><br></br>
                <Typography component="p" className="little_big">Enter Urgency</Typography>
                <Select
                label='Level'
                value={this.state.level}
                onChange={this.handleChange('level')}
                fullWidth
                input={
                <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="age"
                id="outlined-age-simple"
                />
                }
                >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
                <br></br><br></br>
                <Typography component="p" className="little_big">Enter Accident Location</Typography>
                <TextField
                id="outlined-name"
                label="Location"
                value={this.state.address}
                onChange={this.handleChange('address')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br>
                <Typography component="p" className="or_big">or</Typography>
                {!this.state.taking_location && <Button onClick={this.take_location} variant="contained" color="secondary">Take current location</Button>}
                {this.state.taking_location && <Button variant="outlined" color="secondary">Taking location<CircularProgress className="m_left" size={12} color="secondary" /></Button>}
                <br></br><br></br>
                {!this.state.sending && <Button className="report_send_btn bold" onClick={this.send_message} variant="contained" color="primary">Send</Button>}
                {this.state.sending && <Button className="report_send_btn bold" variant="outlined" color="primary">Sending<CircularProgress className="m_left" size={12} color="primary" /></Button>}
                </Paper>
            </div>
            </div>
        )
    }
}

export default AccidentReport