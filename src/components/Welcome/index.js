import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

class WelcomePage extends Component{
    render(){
        return(
            <div className="welcome_page_div">
            <Paper className="roundedw">
                <Typography component="h4" variant="h4" className="welcome_heading">Welcome to</Typography>
                <Typography component="h3" variant="h3" className="welcome_main_heading">Smart GO</Typography>
                <Typography component="p" variant="h6" className="tagline">People don't take trips - trips take people.</Typography><br></br><br></br>
                <Button onClick={()=>{window.location.href="/user/login"}} className="login_btn">Login</Button>
                <Button onClick={()=>{window.location.href="/user/signup"}} className="signup_btn">Sign Up</Button><br></br>
                <a href="/police/login" color="red">Police Login</a> | <a href="/hospital/login">Hospital Login</a>
                </Paper>
            </div>
        )
    }
}

export default WelcomePage