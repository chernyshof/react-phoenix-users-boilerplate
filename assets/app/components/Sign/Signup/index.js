import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { SignupForm } from 'components';

export default class Signup extends Component {
  render() {
    return (
      <DocumentTitle title="Signup">
        <div className="signup">
          <div className="container">
            <SignupForm />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
