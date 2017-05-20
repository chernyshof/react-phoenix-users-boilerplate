import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter as Router } from 'react-router-redux';
import PropTypes from 'prop-types';


import { App, NotFound } from 'components';


export default class Root extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}


Root.propTypes = {
  history: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
};
