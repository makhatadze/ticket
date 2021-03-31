import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import GuestRoute from "./GuestRoute";
import Login from "../modules/Auth/Login";
import {ToastContainer} from "react-toastify";
import PrivateRoute from "./PrivateRoute";
import CLayout from "../modules/Layout/Layout";
import Dashboard from "../modules/Dashboard/Dashboard";
import Role from "../modules/Role/Role";
import IpRestriction from "../modules/IpRestriction/IpRestriction";
import NotFound from "../modules/404/NotFound";
import ChangePassword from "../modules/Profile/ChangePassword";
import User from "../modules/User/User";
import ExportLog from "../modules/ExportLog/ExportLog";
import Department from "../modules/Department/Department";


const Routes = () => {
    return (
        <>
            <ToastContainer/>
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/dashboard'/>
                </Route>
                <GuestRoute exact path='/login' component={Login}/>
                <Route exact path='' render={() =>
                    <CLayout>
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            <PrivateRoute exact path="/role" component={Role}/>
                            <PrivateRoute exact path="/ip-restriction" component={IpRestriction}/>
                            <PrivateRoute exact path="/user" component={User}/>
                            <PrivateRoute exact path="/export-log" component={ExportLog}/>
                            <PrivateRoute exact path="/department" component={Department}/>
                            <PrivateRoute exact path="/change-password" component={ChangePassword} />
                            <PrivateRoute component={NotFound} />
                        </Switch>
                    </CLayout>
                }/>
            </Switch>
        </>
    )
}

export default Routes;
