import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom"
import Index from "./components/Index"
import Register from "./components/auth/register/Register"
import {INDEX, LOGIN, REGISTER, LOGOUT, PASSWORD_FORGET} from "./routes"
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css'
import Login from "./components/auth/login/Login";
import Route from "./components/Route"
import Logout from "./components/auth/Logout";
import PasswordForget from "./components/auth/passwordForget/PasswordForget";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path={REGISTER} guestOnly={true} component={Register}/>
                <Route path={LOGIN} guestOnly={true} component={Login}/>
                <Route path={PASSWORD_FORGET} guestOnly={true} component={PasswordForget}/>
                <Route path={LOGOUT} component={Logout}/>
                <Route path={INDEX} component={Index}/>
            </Switch>
        </Router>
    );
}

export default App;
