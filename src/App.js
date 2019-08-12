import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Style/mstyle.css';
import Welcome from './components/Welcome/index';
import Login from './components/LoginPage/main';
import Signup from './components/Signup/main';
import UserView from './components/UserView/main'
import LoginPol from './components/Police/Login'
import LoginHos from './components/Hospital/login'
import Routs from './components/Routs'

function App() {
  return (
        <Routs />
  );
}

export default App;
