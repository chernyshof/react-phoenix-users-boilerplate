import React, { Component } from 'react';
import { LoginForm } from 'components';

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="container">
          <LoginForm />
        </div>
      </div>
    );
  }
}
