import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './views/Home/Home';
import Login from './views/SignPage/Login'
import Register from './views/SignPage/Register'
import './App.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
  </Switch>
);

export default App;
