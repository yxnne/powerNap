import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { Switch, Route } from 'react-router-dom';
import TabNav from '../component/tab-nav/tab-nav';
import Plans from '../component/plans/plans'
import Notes from '../component/notes/notes'
import Me from '../component/me/me'

/**
 * Dashboard is Main Structure.
 * It determine which to display according to the NavTab is choosen.
 */
class Dashboard extends React.Component{

  render(){

    // Page container Objs
    const pageList = [
      {
        path:'/plans',
        component:Plans,
        title:'Plans',
        icon:'plans',
        needNavTool:true
      },
      {
        path:'/notes',
        component:Notes,
        title:'Notes',
        icon:'notes',
        needNavTool:true
      },
      {
        path:'/me',
        component:Me,
        title:'Me',
        icon:'me',
        needNavTool:false
      }
    ];

    // get pathname, now's location for debug nav and print
    const pathname = this.props.location.pathname;
    console.log('now location is:', pathname);

    // make the page info to display according to the pathname
    const pageInfoObj = pageList.find(item=>item.path == pathname);
    const pageTitle = pageInfoObj.title;
    const navRightTools = pageInfoObj.needNavTool?[
      <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
      <Icon key="1" type="plus" />,
    ]:null;

    return (
      <div>
        <NavBar className="fixed-header" mode="light"
          rightContent={navRightTools}>{ pageTitle }</NavBar>

          <Switch>
            {
              pageList.map(item=>(<Route key={item.path} path={item.path} component={item.component} /> ))
            }
          </Switch>

        <TabNav data={pageList} />
      </div>
    );
  }
}

export default Dashboard;
