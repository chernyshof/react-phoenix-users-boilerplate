import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotificationSystem from 'react-notification-system';

export class ErrorMessage extends Component {
  constructor(props) {
    super(props);

    this.notificationSystem = null;
  }

  componentDidUpdate(prevProps) {
    const { errors } = prevProps;

    for (let i = 0; i < this.props.errors.length; i += 1) {
      if (errors[i] !== this.props.errors[i] && this.props.errors[i]) {
        this.addNotification(this.props.errors[i]);
      }
    }
  }


  addNotification(message) {
    this.notificationSystem.addNotification({
      message,
      level: 'error',
    });
  }


  render() {
    return (
      <div className="errorMessage">
        <NotificationSystem ref={(n) => {
          this.notificationSystem = n;
          return n;
        }}
        />
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  errors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

ErrorMessage.defaultProps = {
  errors: [],
};

const mapStateProps = state => ({
  errors: state.errors.errors,
});

export default connect(mapStateProps)(ErrorMessage);
