import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter as Router } from 'react-router-redux';
import PropTypes from 'prop-types';


import { authenticate, unauthenticate } from 'actions/session';
import {
  App,
  ErrorMessage,
  NotFound,
  Signup,
  Login,
  MatchAuthenticated,
  RedirectAuthenticated } from 'components';


class Root extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = {
      isAuthenticated,
      willAuthenticate,
    };

    return (
      <Provider store={this.props.store}>
        <div className="full-height">
          <ErrorMessage />
          <Router history={this.props.history}>
            <Switch>
              <MatchAuthenticated exact path="/" component={App} {...authProps} />
              <RedirectAuthenticated path="/signup" component={Signup} {...authProps} />
              <RedirectAuthenticated path="/login" component={Login} {...authProps} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}


Root.propTypes = {
  history: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
  authenticate: PropTypes.func.isRequired,
  unauthenticate: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  willAuthenticate: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  authenticate: () => dispatch(authenticate()),
  unauthenticate: () => dispatch(unauthenticate()),
});

const mapStateProps = state => ({
  isAuthenticated: state.session.isAuthenticated,
  willAuthenticate: state.session.willAuthenticate,
});

export default connect(mapStateProps, mapDispatchToProps)(Root);
