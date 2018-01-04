import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import { LoginForm } from 'components';

export class Login extends Component {
  render() {
    const { submittingForm } = this.props;

    return (
      <DocumentTitle title="Login">
        <div className="login">
          <div className="container">
            <LoginForm submittingForm={submittingForm} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}


Login.propTypes = {
  submittingForm: PropTypes.bool,
};

Login.defaultProps = {
  submittingForm: false,
};


const mapStateProps = state => ({
  submittingForm: state.session.submittingForm,
});

export default connect(mapStateProps)(Login);
