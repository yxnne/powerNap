import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../../redux/user.redux';

/**
 * Authority, Authority is a null view Component for verify user info from Backend Server
 */
@withRouter
@connect(
  null, { loadData }
)
class Authority extends React.Component{

  componentDidMount(){
    // if the current router is one of ('/login', '/register')
    const noJumpPaths = ['/login', '/register'];
    const currentPath = this.props.location;
    if (noJumpPaths.indexOf(currentPath) > -1){
      return null;
    }

    // else, ask for backend server for the user info
    // if Authority passed ,save the user info into redux
    // else ,push router to the login page
    axios.get('/user/infoByCookie')
    .then(res=>{
      // console.log(res)
      if(res.status === 200){
        if(res.data.code === 0 ){
          // authority passed
          this.props.loadData(res.data.data);
        } else {
          // unpass
          this.props.history.push('/login');
        }
      }
    });
  }

  render(){
    // this component has no view
    return null;
  }
}

export default Authority;
