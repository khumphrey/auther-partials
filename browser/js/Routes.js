import React from 'react';
import { connect } from'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserList from './components/User/UserList';
import UserDetail from './components/User/UserDetail';
import StoryList from './components/Story/StoryList';
import StoryDetail from './components/Story/StoryDetail';
import { fetchUsers } from './redux/users';
import { fetchStories } from './redux/stories';

/* -----------------    COMPONENT     ------------------ */


const Routes = ({ fetchInitialData }) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={fetchInitialData}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="users" component={UserList} />
      <Route path="users/:id" component={UserDetail} />
      <Route path="stories" component={StoryList} />
      <Route path="stories/:id" component={StoryDetail} />
      <Route path="*" component={Home} />
    </Route>
  </Router>
);

/* -----------------    CONTAINER     ------------------ */

const mapProps = null;

const mapDispatch = dispatch => ({
 fetchInitialData: () => {
    dispatch(fetchUsers())
    dispatch(fetchStories())
    // what other data might we want to fetch on app load?
  }
})

export default connect(mapProps, mapDispatch)(Routes);
