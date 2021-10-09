import React, {useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Task from './Task';
import Admin from './Admin';
import User from './User';
import MainPage from './Main page';
import CreateUpdateTask from './CreateUpdateTask';
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import Login from "./Login";

const AppRouter = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    return user !== null ? (
            <Switch>
                <Route path="/login" exact={true}><Login userName={user.displayName}/></Route>
                <Route path="/user/:id" component={User} exact={true}/>
                <Route path="/user/:id/createUpdate" component={CreateUpdateTask} exact={true}/>
                <Route path="/user/:id/createUpdate/:taskId" component={CreateUpdateTask} exact={true}/>
                <Route path="/openTask/:taskId" exact={true}><Task userName={user.displayName}/></Route>
                <Route path="/admin" component={Admin} exact={true}/>
                <Redirect to="/login"/>
            < /Switch>
        ) :
        (
            <Switch>
                <Route path="/" component={MainPage} exact={true}/>
                <Route path="/openTask/:taskId" component={Task} exact={true}/>
                <Redirect to="/"/>
            </Switch>
        );
};

export default AppRouter;