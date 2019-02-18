import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import Profile from './containers/Profile';
import Login from './containers/Login';
import Album from './containers/Album';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const from = props.location.pathname;
      if (from === '/login') {
        return authenticated ? (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        );
      }
      return authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      );
    }}
  />
);

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const Routers = props => (
  <Switch>
    <AuthRoute exact path="/" component={Profile} {...props} />
    <AuthRoute exact path="/login" component={Login} {...props} />
    <AuthRoute exact path="/album/:id" component={Album} {...props} />
  </Switch>
);

export default Routers;

Routers.defaultProps = {
  authenticated: false,
};
Routers.propTypes = {
  authenticated: PropTypes.bool,
};
