import React, { Component } from 'react';


import { SignupForm } from 'components';

export default class Signup extends Component {
  render() {
    return (
      <div className="signup">
        <div className="container">
          <SignupForm onSubmit={this.handleSignup} />
        </div>
      </div>
    );
  }
}
