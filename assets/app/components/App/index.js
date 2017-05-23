import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from 'actions/session';


export class App extends Component {
  render() {
    const { username } = this.props;

    return (
      <div>
        <h2 id="heading">Hello, { username }!</h2>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

App.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

App.defaultProps = {
  username: '',
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  logout: () => dispatch(logout()),
});

const mapStateProps = state => ({
  username: state.session.currentUser.username,
});

export default connect(mapStateProps, mapDispatchToProps)(App);
