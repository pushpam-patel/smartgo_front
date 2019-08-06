import React,{Component} from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import DailySec from './daily'
import Locwise from './locationwise.js'
import Traffic from './traffic'
import Accident from './accident'
import '../../Style/inner.css'

class UserView extends Component{
    logout=()=>{
        localStorage.clear()
        window.location.href="/"
    }

    render(){
        return(
            <div>
            <Accident />
            </div>
        )
    }
}

export default UserView