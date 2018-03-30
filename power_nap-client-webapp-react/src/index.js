import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import containers
import Authority from './component/authority/authority';
import Dashboard from './container/dashboard';
import Login from './container/login';
import Register from './container/register';
import NoteEdit from './container/note_edit';
import PlanEdit from './container/plan_edit';

// import settings
import './net_interceptor';

// add redux debug tool reduxDevTool
const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__():f=>f;
// make reducers in use, and middleware thunk, reduxDevTool
const store = createStore(reducers, compose(applyMiddleware(thunk), reduxDevTool));


ReactDOM.render(
  (
    <Provider store={store}>

      <BrowserRouter>
        <div>
          <Authority></Authority>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/planedit" component={PlanEdit} />
            <Route path="/noteedit/:noteid" component={NoteEdit} />
            <Route component={Dashboard} /> {/* This line means all the other path just jump to the dashboard*/}
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>

  ), document.getElementById('root'));
registerServiceWorker();
