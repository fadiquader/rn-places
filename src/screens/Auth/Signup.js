import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Dimensions } from 'react-native';
import Input from '../../components/Input';

const { width, height } = Dimensions.get('window');

class Signup extends React.Component {
  static navigationOptions = {
    title: 'Signup'
  };
  constructor() {
    super();
    this.state = {
      viewMode: height > 500 ? 'portrait' : 'landscape',
    }
  }
  componentDidMount() {
    Dimensions.addEventListener('change', this.onChangeDimensions)
  }
  onChangeDimensions = dims => {
    const height = dims.window.height;
    this.setState({
      viewMode: height > 500 ? 'portrait' : 'landscape',
    })
  };

  render() {
    const { navigation } = this.props;
    const { viewMode } = this.state;
    return (
      <View style={styles.inputsContainer}>
        <Input placeholder="Email" />
        <View style={styles[`${viewMode}PwContainer`]}>
          <View style={styles[`${viewMode}PwWrapper`]}>
            <Input placeholder="Password" />
          </View>
          <View style={styles[`${viewMode}PwWrapper`]}>
            <Input placeholder="Confirm Password" />
          </View>
        </View>
        <Button title="Signup" onPress={() => navigation.navigate('App')} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  inputsContainer: {
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  portraitPwContainer: {
    flexDirection: 'column',
    width: '100%'
  },
  landscapePwContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  portraitPwWrapper: {
    width: '100%',
  },
  landscapePwWrapper: {
    width: '45%',
  },
});


export default Signup;
