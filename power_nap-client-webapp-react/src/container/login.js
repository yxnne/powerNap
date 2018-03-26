import React from 'react';
import { List, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../redux/user.redux'
import Logo from '../component/logo/logo';
import YiconInput from '../view/y-icon-input/y-icon-input';


/**
 * Login is for existing user to login system
 */
@connect(
  state=>state.user, { login }
)
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username:'',
      pwd:''
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(key, value){
    this.setState({
      [key]:value
    });
  }

  handleLogin(){
    // call the login logic import from redux
    this.props.login(this.state);
  }

  handleRegister(){
    // jump to the register page
    this.props.history.push('/register');
  }

  render(){
    return (
      <div>
        {
          this.props.redirectTo?
          <Redirect to={this.props.redirectTo} />:
          null
        }
        <Logo />
        <WingBlank>
          { this.props.msg?<p className="error-msg">{this.props.msg}</p>:null }
          <List>
            <WhiteSpace />

            <YiconInput height={20}
              placeHolder="Please input your Username"
              keyPlaceHolder="User name"
              onChange={(v)=>{this.handleChange('username',v)}}
              img={require('./img/user.png')} />

            <WhiteSpace />

            <YiconInput height={20} type="password"
              placeHolder="And your Password"
              keyPlaceHolder="Password"
              onChange={(v)=>{this.handleChange('pwd',v)}}
              img={require('./img/password.png')} />

            <WhiteSpace />

            <Button type="primary" onClick={this.handleLogin}>Login</Button>
            <WhiteSpace />
            <Button type="primary" onClick={this.handleRegister}>Register</Button>

          </List>
        </WingBlank>

      </div>
    );
  }
}

export default Login;
