import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';

class TodoApp extends Component{
  render(){
    return(
      <div className="TodoApp">
      <Router>
        <HeaderComponent/>
      <Switch>
      <Route path="/" exact component={LoginComponent}/>
      <Route path="/login" component={LoginComponent}/>
      <Route path="/logout" component={LogoutComponent}/>
      <Route path="/todo" component={ListTodosComponent}/>
      <Route path="/welcome/:name" component={WelcomeComponent}/>
      <Route component={ErrorComponent}/>
    </Switch>
    <FooterComponent/>
      </Router>
      </div>
    );
  }
}


class ListTodosComponent extends Component{
  constructor(props){
    super(props);
    this.state={todos:
      [
        {id:1,description:'Learn React',done:false,targetDate:new Date()},
        {id:2,description:'Learn Web Services',done:false,targetDate:new Date()},
        {id:3,description:'Read all the books',done:false,targetDate:new Date()}
      ]
    }
  }

  render(){
    return(
      <div>
      <h1>List Todos</h1>
      <div className="container">
      <table class="table">
        <thead>
        <tr>
          <th>id</th>
          <th>Description</th>
          <th>Is Completed</th>
          <th>Target Date</th>
        </tr>
        </thead>
        <tbody>
          {
            this.state.todos.map(todo=>
       <tr>
         <td>{todo.id}</td>
         <td>{todo.description}</td>
         <td>{todo.done.toString()}</td>
         <td>{todo.targetDate.toString()}</td>
       </tr>
     )}
        </tbody>
      </table>
    </div>
      </div>
    );
  }
}

class HeaderComponent extends Component{
  render(){
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div><a href="https://www.google.com" className="navbar-brand">React and Spring</a></div>
          <ul className="navbar-nav">
            <li><Link  className="nav-link" to="/welcome/admin">Home</Link></li>
            <li><Link  className="nav-link" to="/todo">Todos</Link></li>
          </ul>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            <li><Link  className="nav-link" to="/login">Login</Link></li>
            <li><Link  className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

class FooterComponent extends Component{
  render(){
    return (
      <footer className="footer">
        <span className="text-muted">All rights Reserved 2020 @rp</span>
      </footer>
    )
  }
}

class LogoutComponent extends Component{
  render(){
    return(
      <>
      <h1>You are logged out</h1>
      <div className="container">
        Thank You for Using Our Application.
      </div>
    </>
    );
  }
}

class WelcomeComponent extends Component{
  render(){
    return(
      <>
      <h1>Welcome!</h1>
      <div className="container">Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todo">here</Link></div>
    </>
    );
  }
}

function ErrorComponent(){
  return <div>An error occured. Contact support at abcd-efgh</div>
}

class LoginComponent extends Component{

 constructor(props){
   super(props);
   this.state={
     username:'default',
     password:'',
     hasLoginFailed:false,
     showSuccessMessage:false
   }
   this.handleChange=this.handleChange.bind(this);
   this.loginClicked=this.loginClicked.bind(this);
 }

handleChange(event){
this.setState({
  [event.target.name]:event.target.value
});
}

loginClicked(){
  if(this.state.username==='admin' & this.state.password==='root')
  {
    AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
    this.props.history.push('/welcome/${this.state.username}')
    //this.setState({showSuccessMessage:true})
    //this.setState({hasLoginFailed:false})
  }
  else
 {
  this.setState({showSuccessMessage:false})
  this.setState({hasLoginFailed:true})
 }
}

  render(){
    return(
      <div>
      <h1>Login</h1>
      <div className="container">
      {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
      {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentails</div>}
      {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
      {this.state.showSuccessMessage && <div>Login Successful</div>}
      User Name:<input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
      Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
      <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
      </div>
    </div>
    );
  }
}

/*function ShowInvalidCredentials(props){
  if(props.hasLoginFailed){
    return <div>Invalid Credentails</div>
  }
  return null;
}

function ShowLoginSuccessMessage(props){
  if(props.showSuccessMessage){
    return <div>Login Successful</div>
  }
  return null;
}
*/
export default TodoApp;
