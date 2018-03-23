import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button, Icon } from 'antd-mobile';
import Logo from '../component/logo/logo';
import YiconInput from '../view/y-icon-input/y-icon-input';

/**
 * Login is for existing user to login system
 */
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username:'',
      pwd:''
    }
  }

  handleChange(key, value){
    this.setState({
      [key]:value
    });
  }

  render(){
    return (
      <div>
        <Logo />
        <WingBlank>
          <List>
						{ this.props.msg?<p className="error-msg">{this.props.msg}</p>:null }
	    			<InputItem  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={value => this.handleChange('username',value)}>username</InputItem>
	    			<WhiteSpace />
	    			<InputItem type="password" onChange={value => this.handleChange('pwd',value)}>password</InputItem>
	    		   
            <WhiteSpace />

            <YiconInput height={20}
              placeHolder="Please input your Username" 
              keyPlaceHolder="User name" 
              onChange={(v)=>{this.handleChange('user',v)}}
              img={require('./img/user.png')} />

            <YiconInput height={20} type="password"
              placeHolder="And your Password" 
              keyPlaceHolder="Password" 
              onChange={(v)=>{this.handleChange('user',v)}}
              img={require('./img/user.png')} />
  

          </List>
        </WingBlank>

      </div>
    );
  }
}

export default Login;
