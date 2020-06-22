import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Posts from './pages/posts/Posts';
import PostDetailed from './pages/post_detailed/PostDetailed';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

const App = () => {
  return (
      <div className="App">
        <NavigationBar/>
        <div className="main-content">
          <Switch>
            <Route
                path="/"
                exact
                component={Posts}
            />
            <Route
                path="/post=:postId"
                component={PostDetailed}
            />
          </Switch>
        </div>
      </div>
  );
};

export default withRouter(App);
