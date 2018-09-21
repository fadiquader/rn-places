import React from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
//
import { tryAuth } from '../../redux/actions/auth';

class Launch extends React.Component {
  componentDidMount() {
    const { navigation }  = this.props;
    this.props.tryAuth(true, navigation)
  }
  render() {
    return <ActivityIndicator size="large" />
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    tryAuth
  }, dispatch)
}

export default connect(null, mapDispatch)(Launch)
