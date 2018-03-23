import React from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
/**
 * TabNav, Component in the Screen bottom for navgation
 */
 @withRouter
class TabNav extends React.Component{

  // data props pass here must be an array
  static propTypes = {
    data:PropTypes.array.isRequired
  };

  render(){
    const navList = this.props.data;
    const { pathname } = this.props.location;

    return (
      <TabBar>
        {
          navList.map((i)=>{
            return (
              <TabBar.Item title={i.title} key={i.path}
                icon={{uri:require(`./img/${i.icon}.png`)}}
                selectedIcon={{uri:require(`./img/${i.icon}-selected.png`)}}
                selected={pathname === i.path}
                onPress={()=>{
                  this.props.history.push(i.path)
                }}>
              </TabBar.Item>
            )
          })
        }

      </TabBar>
    );
  }
}

export default TabNav;
