import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import GuestRoute from "./GuestRoute";
import Login from "../modules/Auth/Login";
import {ToastContainer} from "react-toastify";
import PrivateRoute from "./PrivateRoute";
import Layout from "../modules/Layout/Layout";


const Routes = () => {
    return (
        <>
            <ToastContainer />
            <Switch>
                <GuestRoute exact path='/login' component={Login} />
                <PrivateRoute exact path='/dashboard' component={Layout} />
            </Switch>
        </>
    )
}

export default Routes;