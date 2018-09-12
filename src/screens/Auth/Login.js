import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import Input from '../../components/Input';

class Login extends React.Component {
  static navigationOptions = {
    title: 'login'
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Button title="App" onPress={() => navigation.navigate('App')} />
          <Button title="SignUp" onPress={() => navigation.navigate('Signup')} />
        </View>
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
    flex: 1
  },
});

export default Login;
