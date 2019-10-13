import React,{Component} from 'react'
import Nav from './navbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import Geocode from "react-geocode";
import CircularProgress from '@material-ui/core/CircularProgress'

Geocode.setApiKey("AIzaSyCEF1MgrRBaktN47f3Xf_sb1POSHnDunY0");

class LocationWise extends Component{
    state={
        start:'',
        destination:'',
        address:'',
        curr_lat:0,
        curr_long:0,
        data:'',
        best_bus:'',
        best_train:'',
        best_metro:'',
        taking_location:'',
        sending:''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };    

    getDistanceFromLatLonInKm=(lat1,lon1,lat2,lon2)=> {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      deg2rad=(deg)=> {
        return deg * (Math.PI/180)
      }
      

    fetchdaily=()=>{
        this.setState({
            sending:true
        })
        axios.get('https://thawing-wave-40268.herokuapp.com/daily',{},{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            this.setState({
                data:res.data,
                sending:false
            })
            let data=res.data[0]
            let l_bus=1000
            let best_bus
            let best_train
            let best_metro
            data.bus.forEach((val,ind)=>{
                Geocode.fromAddress(val.station).then(
                    response => {
                      const { lat, lng } = response.results[0].geometry.location;
                      let di=this.getDistanceFromLatLonInKm(lat, lng, this.state.curr_lat, this.state.curr_long)
                      if(di<l_bus){
                          l_bus=di
                          this.setState({
                            best_bus:val.name
                          })
                          
                      }
                    },
                    error => {
                    }
                );
            })
            let l_train=1000
            data.train.forEach((val,ind)=>{
                Geocode.fromAddress(val.station).then(
                    response => {
                      const { lat, lng } = response.results[0].geometry.location;
                      let di=this.getDistanceFromLatLonInKm(lat, lng, this.state.curr_lat, this.state.curr_long)
                      if(di<l_train){
                          l_train=di
                          this.setState({
                            best_train:val.name
                          })
                      }
                    },
                    error => {
                    }
                );
            })
            let l_metro=1000
            data.metro.forEach((val,ind)=>{
                Geocode.fromAddress(val.station).then(
                    response => {
                      const { lat, lng } = response.results[0].geometry.location;
                      let di=this.getDistanceFromLatLonInKm(lat, lng, this.state.curr_lat, this.state.curr_long)
                      if(di<l_metro){
                          l_metro=di
                          this.setState({
                            best_metro:val.name
                          })
                      }
                    },
                    error => {
                    }
                );
            })
        })
    }
        

    

    take_location=()=>{
        this.setState({
            taking_location:true
        })
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
        }
}

showPosition=(position)=> {
    this.setState({
        curr_lat:position.coords.latitude,
        curr_long:position.coords.longitude
    })

    let n={
        lat:position.coords.latitude,
        long:position.coords.longitude
    }


    axios.post('https://thawing-wave-40268.herokuapp.com/rgeo',n,{
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        this.setState({
            address:res.data,
            taking_location:false
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
                <Paper className="roundedlw width_less upper">
                <div className="center">
                <Typography component="p" className="accidents_heading">Location Based Transport</Typography><br></br>
                {/* <Typography component="p" className="little_big">Enter Start</Typography> */}
                <TextField
                id="outlined-name"
                label="Enter Start"
                value={this.state.start}
                onChange={this.handleChange('start')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br>
                
                {/* <Typography component="p" className="little_big">Enter Destination</Typography> */}
                <TextField
                id="outlined-name"
                label="Enert Destination"
                value={this.state.destination}
                onChange={this.handleChange('destination')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br>

                <Typography component="p" className="little_big upper">Enter your location</Typography>
                <TextField
                id="outlined-name"
                label="Manula Location"
                value={this.state.address}
                onChange={this.handleChange('address')}
                margin="normal"
                variant="outlined"
                fullWidth
                /><br></br>
                <Typography component="p" className="or_big">or</Typography><br></br>
                {!this.state.taking_location && <Button onClick={this.take_location} variant="contained" color="secondary">Take current location</Button>}
                {this.state.taking_location && <Button variant="outlined" color="secondary">Taking location<CircularProgress className="m_left" size={12} color="secondary" /></Button>}
                <br></br><br></br>
                {!this.state.sending && <Button className="report_send_btn" onClick={this.fetchdaily} variant="contained" color="primary">Send</Button>}
                {this.state.sending && <Button className="report_send_btn" variant="outlined" color="primary">Sending<CircularProgress className="m_left" size={12} color="primary" /></Button>}
                </div>
                </Paper>
                {
                    this.state.data && this.state.data.map((val,ind)=>(
                        <div className="results">
                            <div>
                            <div className="center tcn_heading">
                                <Typography component="p" className="accidents_heading">Bus Schedule</Typography>
                            </div>
                            <div className="daily_options">
                            {
                                val.bus.map((value,index)=>(
                                    <div>
                                        {console.log(this.state.best_bus)}
                                        {value.from==this.state.start && value.to==this.state.destination && value.name==this.state.best_bus && <Paper className="accident_paper">
                                            <Typography component="p" className="addr">{value.name}</Typography>
                                            <Typography component="p" className="addr">{value.station}</Typography>
                                            <Typography component="p" className="addr">{value.time}</Typography>
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
                                        {value.from==this.state.start && value.to==this.state.destination && value.name==this.state.best_train && <Paper className="accident_paper">
                                            <Typography component="p" className="addr">{value.name}</Typography>
                                            <Typography component="p" className="addr">{value.station}</Typography>
                                            <Typography component="p" className="addr">{value.time}</Typography>
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
                                        {value.from==this.state.start && value.to==this.state.destination && value.name==this.state.best_metro && <Paper className="accident_paper">
                                            <Typography component="p" className="addr">{value.name}</Typography>
                                            <Typography component="p" className="addr">{value.station}</Typography>
                                            <Typography component="p" className="addr">{value.time}</Typography>
                                            <span className="display_none">{flag3=1}</span>
                                        </Paper>}
                                    </div>
                                ))
                            }
                            {flag3==0 && <Paper className="accident_paper">
                                <Typography component="p" className="addr center">None</Typography>
                            </Paper>}
                            </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            </div>
        )
    }
}

export default LocationWise