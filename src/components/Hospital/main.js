import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'

class HospitalView extends Component{
    state={
        data:'',
        to_map:''
    }

    constructor(props){
        super(props)
        this.getData()
    }

    getData=()=>{
        axios.get('/accident').then((res)=>{
            console.log(res.data)
            this.setState({
                data:res.data.reverse()
            })
        })
    }

    take_location=()=>{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
          console.log("Geolocation is not supported by this browser.")
        }
}

showPosition=(position)=> {
    let n={
        lat:position.coords.latitude,
        long:position.coords.longitude
    }

    axios.post('/rgeo',n,{
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        let a=res.data.split(' ').join('+')
        let b=this.state.to_map.split(' ').join('+')
        window.open(`https://www.google.com/maps/dir/${a}/${b}`)
    })

}

    show_on_map=(address)=>{
        this.setState({
            to_map:address
        })
        this.take_location()
    }

    logout=()=>{
        localStorage.clear()
        window.location.href="/"
    }

    render(){
        setTimeout(() => {
            console.log('re rendered')
            this.getData()
        }, 1000);
        return(
            <div className="main_div">
            <div className="police_appbar">
                    <Typography component="p" className="yat_logo">YATAYAT</Typography>
                    <Typography component="p" className="mainheading"> HOSPITAL VIEW</Typography>
                    <Typography onClick={this.logout} component="p" className="logout_btn">Logout</Typography>
                </div>
            <div className="center tcn_heading">                    
                <Typography component="p" className="accidents_heading">Accidents</Typography>
            </div>
                <div className="hospital_info">
                    {
                        this.state.data && this.state.data.map((val,ind)=>(
                            <Paper onClick={()=>{this.show_on_map(val.place)}} className="accident_paper pointer">
                                <Typography component="p" className="addr">Address: <span className="bold">{val.place}</span></Typography>
                                <Typography component="p" className="urg">Accident Level: <span className={val.level}>{val.level}</span></Typography>
                                <Typography component="p" className="urg">Time: {val.time}</Typography>
                            </Paper>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default HospitalView