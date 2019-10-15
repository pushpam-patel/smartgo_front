import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import axios from 'axios';
import Button from '@material-ui/core/Button'

class PoliceView extends Component{
    state={
        data:'',
        to_map:'',
        toShow:[]
    }

    constructor(props){
        super(props)
        this.getData()
    }

    getData=()=>{
        axios.get('https://thawing-wave-40268.herokuapp.com/traffic').then((res)=>{
            console.log(res.data)
            let toShow=[]
            if(localStorage.getItem('gosmart_police_toShow')){
                toShow=localStorage.getItem('gosmart_police_toShow')
            }
            else
            {
                toShow=new Array(res.data.length).fill(1)
                localStorage.setItem('gosmart_police_toShow',toShow.join(""))
            } 
            this.setState({
                data:res.data.reverse(),
                toShow
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

    axios.post('https://thawing-wave-40268.herokuapp.com/rgeo',n,{
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
        localStorage.removeItem("smart_police")
        window.location.href="/"
    }

    delete_address=(ind)=>{
        // axios.delete("https://thawing-wave-40268.herokuapp.com/accident",
        //     {headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data:{
        //       param:address
        //     }}
        //   );
        let toShow=this.state.toShow
        toShow=toShow.substring(0,ind)+"0"+toShow.substring(ind+1,toShow.length);
        this.setState({toShow},()=>{localStorage.setItem('gosmart_police_toShow',toShow)})
    }


    render(){
        setTimeout(() => {
            console.log('re rendered')
            this.getData()
        }, 10000);
        return(
            <div className="main_div">
                <div className="police_appbar">
                    <Typography component="p" className="yat_logo">SMARTGO</Typography>
                    <Typography component="p" className="mainheading"> POLICE VIEW</Typography>
                    <Typography onClick={this.logout} component="p" className="logout_btn">Logout</Typography>
                </div>
                <div className="main_div">
                <div className="center tcn_heading">
                    <Typography component="p" className="accidents_heading">Traffic Congestions</Typography>
                </div>
                <div className="hospital_info">
                    {
                        this.state.data && this.state.data.map((val,ind)=>{
                            let pc=JSON.parse(localStorage.getItem('smart_police')).pincode
                            let pii = val.place.substring(val.place.length - 13, val.place.length-7)
                            if (pii == pc  && this.state.toShow[ind]==1){
                                return (
                                    <Paper className="accident_paper pointer">
                                        <Typography component="p" className="addr" onClick={()=>{this.show_on_map(val.place)}}>Address: <span className="bold">{val.place}</span></Typography>
                                        <Typography component="p" className="urg">Traffic: <span className={val.level}>{val.level}</span></Typography>
                                        <Typography component="p" className="urg">Time: {val.time}</Typography>
                                        <Button onClick={()=>{this.delete_address(ind)}} className="login_btn">DONE</Button>
                                    </Paper>)
                            }
                            
                        })
                        // this.state.data && this.state.data.map((val,ind)=>(
                        //     <Paper onClick={()=>{this.show_on_map(val.place)}} className="accident_paper pointer">
                        //         <Typography component="p" className="addr">Address: <span className="bold">{val.place}</span></Typography>
                        //         <Typography component="p" className="urg">Traffic: <span className={val.level}>{val.level}</span></Typography>
                        //         <Typography component="p" className="urg">Time: {val.time}</Typography>
                        //     </Paper>
                        // ))
                    }
                </div>
                {/* <div className="center tcn_heading">                    
                    <Typography component="p" className="accidents_heading">Accidents</Typography>
                </div>
                    <div className="hospital_info">
                        {
                            this.state.data && this.state.data.map((val,ind)=>{
                                let pc=JSON.parse(localStorage.getItem('smart_police')).pincode
                                let pii = val.place.substring(val.place.length - 13, val.place.length-7)
                                if (pii == pc){
                                    return (
                                        <Paper onClick={()=>{this.show_on_map(val.place)}} className="accident_paper pointer">
                                            <Typography component="p" className="addr">Address: <span className="bold">{val.place}</span></Typography>
                                            <Typography component="p" className="urg">Accident Level: <span className={val.level}>{val.level}</span></Typography>
                                            <Typography component="p" className="urg">Time: {val.time}</Typography>
                                        </Paper>)
                                }
                                
                            })
                        }
                    </div> */}
                </div>
            </div>
        )
    }
}

export default PoliceView