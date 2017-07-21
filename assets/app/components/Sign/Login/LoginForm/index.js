import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FormInput } from 'components';
import { login } from 'actions/session';

class LoginForm extends Component {
  submit = (data, dispatch) => dispatch(login(data));

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form className="form-login card" onSubmit={handleSubmit(this.submit)}>
        <h3>Login to Sling</h3>
        <Field
          name="email"
          type="email"
          component={FormInput}
          placeholder="Email"
        />
        <Field
          name="password"
          type="password"
          component={FormInput}
          placeholder="Password"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary btn-lg btn-block"
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>
        <hr />
        <Link to="/signup" className="btn">
          Create a new account
        </Link>
      </form>
    );
  }
}


LoginForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
