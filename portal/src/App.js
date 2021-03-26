import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'antd/dist/antd.css'
import 'antd/dist/antd.js'
import Routes from "./routes";
import store from "./store"
import {Provider} from "react-redux";
import setAuthToken from "./core/utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {logoutUser, setUser} from "./actions/auth/authActions";

// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = '/login';
    }
}

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route component={Routes}/>
                </Router>
            </Provider>
        )
    }
}

export default App;