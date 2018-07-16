import React, { Component } from 'react';
import './LoginControl.css';

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      user_name:"",
      password:""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event){
    const user_name = this.state.user_name;
    const password = this.state.password;
    this.props.onLogin({user_name: user_name, password: password});
    event.preventDefault();
  }

  handleInputChange(event){
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  render(){
    return(
      <div className="login_form">
        <form onSubmit={this.handleLogin}>
          <label>
            Username:
            <input name="user_name" type="text" value={this.state.user_name} onChange={this.handleInputChange}/>
          </label>
          <br/>
          <label>
            Password:
            <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
          </label>
          <br/>
          <button type="submit">Login</button>
        </form>
    </div>
  )}
}

class LoginControl extends Component {
  constructor(props){
    super(props);
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  verifyLogin(iUser){
    const validInfo = this.props.users.filter(user => user.user_name === iUser.user_name && iUser.password === user.password).length > 0;
    if(validInfo){
      this.props.onSuccessfulLogin({user_name: iUser.user_name})
    }
  }

  render() {
    return (
      <div className="row">
        <div className = "col">
          <LoginForm  onLogin = {this.verifyLogin}/>
        </div>
      </div>
    );
  }
}

export default LoginControl;
