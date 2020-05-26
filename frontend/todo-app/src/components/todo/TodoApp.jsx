import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute'
import AuthenticationService from './AuthenticationService.js';
import LoginComponent from './LoginComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'

class TodoApp extends Component{
  render(){
    return(
      <div className="TodoApp">
      <Router>
        <HeaderComponent/>
      <Switch>
      <Route path="/" exact component={LoginComponent}/>
      <Route path="/login" component={LoginComponent}/>
      <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
      <AuthenticatedRoute path="/todo" component={ListTodosComponent}/>
      <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
      <Route component={ErrorComponent}/>
    </Switch>
    <FooterComponent/>
      </Router>
      </div>
    );
  }
}

export default TodoApp;
