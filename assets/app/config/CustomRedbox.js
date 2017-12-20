import React from 'react';
import PropTypes from 'prop-types';
import Redbox from 'redbox-react';

const styles = {
  redbox: {
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
    position: 'fixed',
    padding: 10,
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    width: '100%',
    background: 'rgb(92,107,192)',
    color: 'white',
    zIndex: 2147483647,
    textAlign: 'left',
    fontSize: '16px',
    lineHeight: 1.2,
    overflow: 'auto',
  },
  message: {
    fontWeight: 'bold',
  },
  stack: {
    fontFamily: 'monospace',
    marginTop: '2em',
  },
  frame: {
    marginTop: '1em',
  },
  file: {
    fontSize: '0.8em',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  linkToFile: {
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
  },
};

export default class CustomRedbox extends React.Component {
  render() {
    return (
      <Redbox
        error={this.props.error}
        style={styles}
      />);
  }
}

CustomRedbox.propTypes = {
  error: PropTypes.string.isRequired,
};
