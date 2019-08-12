import React,{Component} from 'react'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import WelcomePage from './Welcome/index'
import LoginPage from './LoginPage/main'
import SignUpPage from './Signup/main'
import HospitalView from './Hospital/login'
import HospitalMain from './Hospital/main'
import PoliceView from './Police/Login'
import PoliceMain from './Police/main'
import UserView from './UserView/main.js'
import TrafficCom from './UserView/traffic'
import AccidentCom from './UserView/accident'
import DailySched from './UserView/daily'
import LocationWise from './UserView/locationwise'

class Router extends Component{
    render(){
        return(
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className="routes">
                    {!localStorage.getItem('yatayat_auth') &&
                        <Switch>
                            <Route path="/" exact component={WelcomePage} />
                            <Route path="/user/login" exact component={LoginPage} />
                            <Route path="/user/signup" exact component={SignUpPage} />
                            <Route path="/hospital/login" exact component={HospitalView} />
                            <Route path="/hospital/report" exact component={HospitalMain} />
                            <Route path="/police/login" exact component={PoliceView} />
                            <Route path="/police/report" exact component={PoliceMain} />
                            <Route path="/user" exact component={UserView} />
                            <Route path="/user/traffic" exact component={TrafficCom} />
                            <Route path="/user/accident" exact component={AccidentCom} />
                            <Route path="/user/daily" exact component={DailySched} />
                            <Route path="/user/locationwise" exact component={LocationWise} />
                        </Switch>
                    }
                    {localStorage.getItem('yatayat_auth') &&
                        <Switch>
                            <Route path="/" exact component={WelcomePage} />
                            <Route path="/user/login" exact component={LoginPage} />
                            <Route path="/user/signup" exact component={SignUpPage} />
                            <Route path="/hospital/login" exact component={HospitalView} />
                            <Route path="/hospital/report" exact component={HospitalMain} />
                            <Route path="/police/login" exact component={PoliceView} />
                            <Route path="/police/report" exact component={PoliceMain} />
                            <Route path="/user" exact component={UserView} />
                            <Route path="/user/traffic" exact component={TrafficCom} />
                            <Route path="/user/accident" exact component={AccidentCom} />
                            <Route path="/user/daily" exact component={DailySched} />
                            <Route path="/user/locationwise" exact component={LocationWise} />
                        </Switch>
                    }
                </div>
            </BrowserRouter>
        )
    }
}

export default Router