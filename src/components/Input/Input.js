import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Input = props => {
  return (
    <TextInput
      underlineColorAndroid="transparent"
      {...props}
      style={[styles.input, props.style]}
    />
  )
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 8,
    marginVertical: 8,
  }
});

Input.defaultProps = {
  style: {},
};

export default Input;
