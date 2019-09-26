import React,{Component} from 'react'
import Nav from './navbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import swap from '../../swap.png'



class DailySchedules extends Component{
    state={
        start:'',
        destination:'',
        data:'',
        finding:false
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };    

    fetchdaily=()=>{
        this.setState({
            finding:true
        })
        axios.get('https://thawing-wave-40268.herokuapp.com/daily',{},{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            console.log(res)
            this.setState({
                data:res.data,
                finding:false
            })
        })
    }

    logout=()=>{
        localStorage.clear()
        window.location.href="/"
    }

    render(){
        let flag1=0
        let flag2=0
        let flag3=0
        return(
            <div>
                <Nav />
            <div className="main_div m_top">
            <Paper className="rounded width_less daily_div_down">
                <div className="center">
                <Typography component="p" className="accidents_heading">Daily Schedules</Typography><br></br>
                <TextField
                id="outlined-name"
                label="Enter Start"
                value={this.state.start}
                onChange={this.handleChange('start')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br><br></br>

                <div class="swap">
                <img src={swap} width={35} height={35}/></div>

                <TextField
                id="outlined-name"
                label="Enter Destination"
                value={this.state.destination}
                onChange={this.handleChange('destination')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br><br></br>

                {!this.state.finding && <Button className="daily_show_btn bold" onClick={this.fetchdaily} variant="contained" color="primary">Find transport</Button>}
                {this.state.finding && <Button className="daily_show_btn bold" variant="outlined" color="primary">Finding<CircularProgress className="m_left" size={12} color="primary" /></Button>}
                <br></br><br></br>
                </div>
            </Paper>
                {
                    this.state.data && this.state.data.map((val,ind)=>(
                        <div className="results">
                            {this.state.data && <div>
                                <div className="center tcn_heading">
                                <Typography component="p" className="accidents_heading">Bus Schedule</Typography>
                            </div>
                            <div className="daily_options">
                            {
                                val.bus.map((value,index)=>(
                                    <div>
                                        {value.from==this.state.start && value.to==this.state.destination && <Paper className="accident_paper">
                                            <Typography component="p" className="addr"><span className="bold">Name:</span> {value.name}</Typography>
                                            <Typography component="p" className="addr"><span className="bold">Station:</span> {value.station}</Typography>
                                            <Typography component="p" className="addr"><span className="bold">Time:</span> {value.time}</Typography>
                                            <span className="display_none">{flag1=1}</span>
                                        </Paper>}
                                    </div>
                                ))
                            }
                            {flag1==0 && <Paper className="accident_paper">
                                            <Typography component="p" className="addr center">None</Typography>
                            </Paper>}
                            </div>
                            <div className="center tcn_heading">
                                <Typography component="p" className="accidents_heading">Train Schedule</Typography>
                            </div>
                            <div className="daily_options">
                            {
                                val.train.map((value,index)=>(
                                    <div>
                                        {value.from==this.state.start && value.to==this.state.destination && <Paper className="accident_paper">
                                        <Typography component="p" className="addr"><span className="bold">Name:</span> {value.name}</Typography>
                                            <Typography component="p" className="addr"><span className="bold">Station:</span> {value.station}</Typography>
                                            <Typography component="p" className="addr"><span className="bold">Time:</span> {value.time}</Typography>
                                            <span className="display_none">{flag2=1}</span>
                                        </Paper>}
                                    </div>
                                ))
                            }
                            {flag2==0 && <Paper className="accident_paper">
                                            <Typography component="p" className="addr center">None</Typography>
                            </Paper>}
                            </div>
                            <div className="center tcn_heading">
                                <Typography component="p" className="accidents_heading">Metro Schedule</Typography>
                            </div>
                            <div className="daily_options">
                            {
                                val.metro.map((value,index)=>(
                                    <div>
                                        {value.from==this.state.start && value.to==this.state.destination && <Paper className="accident_paper">
                                        <Typography component="p" className="addr"><span className="bold">Name:</span> {value.name}</Typography>
                                            <Typography component="p" className="addr"><span className="bold">Station:</span> {value.station}</Typography>
                                            <Typography component="p" className="addr"><span className="bold">Time:</span> {value.time}</Typography>
                                            <span className="display_none">{flag3=1}</span>
                                        </Paper>}
                                    </div>
                                ))
                            }
                            {flag3==0 && <Paper className="accident_paper">
                                            <Typography component="p" className="addr center">None</Typography>
                            </Paper>}
                            </div>
                            </div>}
                        </div>
                    ))
                }
                
            </div>
            </div>
        )
    }
}

export default DailySchedules