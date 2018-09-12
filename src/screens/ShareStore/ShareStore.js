import React from 'react';
import {View, Text, Platform} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
//
import StoreInput  from '../../components/StoreInput';
import { addStore }  from '../../redux/actions/stores';

class ShareStore extends React.Component {
  static navigationOptions = ({ }) => ({
    title: 'Share Store',
  });
  storeAddedHandler = storeName => {
    this.props.addStore(storeName);
  };

  render() {
    return (
      <View>
        <StoreInput onStoreAdded={this.storeAddedHandler}/>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addStore
  }, dispatch)
};

export default connect(null, mapDispatchToProps)(ShareStore);

