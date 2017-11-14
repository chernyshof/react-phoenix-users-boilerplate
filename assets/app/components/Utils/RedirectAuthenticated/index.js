import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';


export default class RedirectAuthenticated extends Component {
  render() {
    const {
      path,
      exact,
      isAuthenticated,
      component,
    } = this.props;
    const RouteComponent = component;

    return (
      <Route
        exact={exact}
        path={path}
        render={(props) => {
          if (isAuthenticated) { return <Redirect to={{ pathname: '/' }} />; }
          return <RouteComponent {...props} />;
        }}
      />
    );
  }
}


RedirectAuthenticated.propTypes = {
  component: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
};

RedirectAuthenticated.defaultProps = {
  exact: false,
};
