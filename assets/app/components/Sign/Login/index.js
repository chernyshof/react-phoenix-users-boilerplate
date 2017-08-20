import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { LoginForm } from 'components';

export default class Login extends Component {
  render() {
    return (
      <DocumentTitle title="Login">
        <div className="login">
          <div className="container">
            <LoginForm />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
