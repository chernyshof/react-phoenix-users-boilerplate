import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  render() {
    const { input, label, type, placeholder, meta } = this.props;

    return (
      <div className="input">
        {label && <label htmlFor={input.name}>{label}</label>}
        <input
          {...input}
          type={type}
          placeholder={placeholder}
          className="form-control"
        />
        {meta.touched && meta.error &&
          <div>{meta.error}</div>
        }
      </div>
    );
  }
}

Input.propTypes = {
  input: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
};

Input.defaultProps = {
  label: '',
  type: '',
  placeholder: '',
};
