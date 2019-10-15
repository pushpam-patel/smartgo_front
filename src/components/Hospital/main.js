import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import Button from '@material-ui/core/Button'

class HospitalView extends Component{
    state={
        data:'',
        to_map:'',
        pinc:'',
        toShow:[]
    }

    constructor(props){
        super(props)
        this.getData()
    }


    getData=()=>{
        axios.get('https://thawing-wave-40268.herokuapp.com/accident').then((res)=>{
            console.log(res.data)
            let toShow=[]
            if(localStorage.getItem('gosmart_hospital_toShow') != null){
                toShow=localStorage.getItem('gosmart_hospital_toShow')
            }
            else
            {
                toShow=new Array(res.data.length).fill(1)
                localStorage.setItem('gosmart_hospital_toShow',toShow.join(""))
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
            let pincc=res.data.substring(res.data.length - 13, res.data.length-7)
            this.setState({
                pinc:pincc
            })
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
        localStorage.removeItem("smartgo_hospital")
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
        var he =ind
        let toShow=this.state.toShow
        console.log(toShow)
        toShow=toShow.substring(0,ind)+"0"+toShow.substring(ind+1,toShow.length);
        console.log(toShow)
        this.setState({toShow},()=>{localStorage.setItem('gosmart_hospital_toShow',toShow)})
    }

    render(){
        console.log(this.state)
        setTimeout(() => {
            console.log('re rendered')
            this.getData()
        }, 100000);
        return(
            <div className="main_div">
            <div className="police_appbar">
                    <Typography component="p" className="yat_logo">SMARTGO</Typography>
                    <Typography component="p" className="mainheading"> HOSPITAL VIEW</Typography>
                    <Typography onClick={this.logout} component="p" className="logout_btn">Logout</Typography>
                </div>
            <div className="center tcn_heading">                    
                <Typography component="p" className="accidents_heading">Accidents</Typography>
            </div>
                <div className="hospital_info">
                    {
                        this.state.data && this.state.data.map((val,ind)=>{
                            let pc=JSON.parse(localStorage.getItem('smartgo_hospital')).pincode
                            let pii = val.place.substring(val.place.length - 13, val.place.length-7)
                            if (pii == pc && this.state.toShow[ind]==1){
                                return (
                                    <Paper className="accident_paper pointer">
                                        <Typography component="p" className="addr" onClick={()=>{this.show_on_map(val.place)}}>Address: <span className="bold">{val.place}</span></Typography>
                                        <Typography component="p" className="urg">Accident Level: <span className={val.level}>{val.level}</span></Typography>
                                        <Typography component="p" className="urg">Time: {val.time}</Typography>
                                        <Button onClick={()=>{this.delete_address(ind)}} className="login_btn">DONE</Button>
                                    </Paper>)
                            }
                            
                        })
                    }
                </div>
            </div>
        )
    }
}

export default HospitalView