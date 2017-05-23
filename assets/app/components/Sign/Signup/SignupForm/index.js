import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FormInput } from 'components';
import { signup } from 'actions/session';

class SignupForm extends Component {
  submit = (data, dispatch) => (
    new Promise((resolve, reject) => {
      dispatch(signup(data, resolve, reject));
    }).catch((error) => {
      throw new SubmissionError(error);
    }))

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <h3>Create an account</h3>
        <Field
          name="username"
          type="text"
          component={FormInput}
          placeholder="Username"
          className="form-control"
        />
        <Field
          name="email"
          type="email"
          component={FormInput}
          placeholder="Email"
          className="form-control"
        />
        <Field
          name="password"
          type="password"
          component={FormInput}
          placeholder="Password"
          className="form-control"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn"
        >
          {submitting ? 'Submitting...' : 'Sign up'}
        </button>
        <hr />
        <Link to="/Login" className="btn">
          Login to your account
        </Link>
      </form>
    );
  }
}

SignupForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};


const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({
  form: 'signup',
  validate,
})(SignupForm);
