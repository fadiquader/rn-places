import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Input from '../../components/Input';
import { tryAuth, authSignIn } from '../../redux/actions/auth';

class Login extends React.Component {
  static navigationOptions = {
    title: 'login'
  };
  state = {
    email: '',
    password: '',
  };

  onLogin = () => {
    const { navigation } = this.props;
    const { email, password } = this.state;
    // this.props.tryAuth({ email, password })
    this.props.authSignIn({ email, password, navigation })
    // navigation.navigate('App')
  }
  render() {
    const { navigation, loading } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <Input
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}

          />
          <Input
            placeholder="Password"
            onChangeText={(password) => this.setState({password})}
          />
          <Button
            disabled={loading}
            title="App" onPress={this.onLogin} />
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

const mapState = ({ auth }) => ({
  loading: auth.loading,
})

export default connect(mapState, { tryAuth, authSignIn })(Login);
