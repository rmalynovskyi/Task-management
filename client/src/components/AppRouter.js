import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Task from './Task';
import Admin from './Admin';
import User from './User';
import MainPage from './Main page';
import CreateUpdateTask from './CreateUpdateTask';

const AppRouter = () => {
    return (
        <div>
            <Switch>
                <Route path="/task">
                    <Task/>
                </Route>
                <Route exact path="/user/:id/createUpdate">
                    <CreateUpdateTask/>
                </Route>
                <Route exact path="/user/:id/createUpdate/:taskId">
                    <CreateUpdateTask/>
                </Route>
                <Route exact path="/user/:id/openTask/:taskId">
                    <Task/>
                </Route>
                <Route path="/admin">
                    <Admin/>
                </Route>
                <Route path="/user/:id">
                    <User/>
                </Route>
                <Route path="/">
                    <MainPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </div>
    );
};

export default AppRouter;