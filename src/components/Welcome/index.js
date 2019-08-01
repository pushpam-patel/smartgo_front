import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

class WelcomePage extends Component{
    render(){
        return(
            <div className="welcome_page_div">
            <Paper className="rounded">
                <Typography component="h4" variant="h4" className="welcome_heading">Welcome to</Typography>
                <Typography component="h3" variant="h3" className="welcome_main_heading">Smart GO</Typography><br></br>
                <Typography component="p" variant="h6" className="tagline">People don't take trips - trips take people.</Typography><br></br>
                <Button onClick={()=>{window.location.href="/login"}} className="login_btn">Login</Button>
                <Button onClick={()=>{window.location.href="/signup"}} className="signup_btn">Sign Up</Button><br></br>
                <a href="#" color="red">Ploice Login</a> | <a href="#">Hospital Login</a>
                </Paper>
            </div>
        )
    }
}

export default WelcomePage