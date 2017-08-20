import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import { logout } from 'actions/session';


export class App extends Component {
  render() {
    const { username } = this.props;

    return (
      <DocumentTitle title="Home">
        <div className="app">
          <div className="container col-md-8">
            <header className="header">
              <nav>
                <span className="logo" />
                <ul className="nav nav-pills pull-right">
                  <li><a href="http://www.phoenixframework.org/docs">Get Started</a></li>

                  <button className="btn btn-sm" onClick={this.props.logout}>Logout</button>
                </ul>
              </nav>
            </header>

            <main role="main">
              <div className="jumbotron">
                <h2 id="heading">Hello, <span className="username">{ username }</span>!</h2>
                <h2>Welcome to Phoenix</h2>
                <p className="lead">A productive web framework that<br />does not compromise speed and maintainability.</p>
              </div>

              <div className="row marketing">
                <div className="col-lg-6">
                  <h4>Resources</h4>
                  <ul>
                    <li>
                      <a href="http://phoenixframework.org/docs/overview">Guides</a>
                    </li>
                    <li>
                      <a href="https://hexdocs.pm/phoenix">Docs</a>
                    </li>
                    <li>
                      <a href="https://github.com/phoenixframework/phoenix">Source</a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-6">
                  <h4>Help</h4>
                  <ul>
                    <li>
                      <a href="http://groups.google.com/group/phoenix-talk">Mailing list</a>
                    </li>
                    <li>
                      <a href="http://webchat.freenode.net/?channels=elixir-lang">#elixir-lang on freenode IRC</a>
                    </li>
                    <li>
                      <a href="https://twitter.com/elixirphoenix">@elixirphoenix</a>
                    </li>
                  </ul>
                </div>
              </div>
            </main>
          </div>
        </div>
      </DocumentTitle>
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
