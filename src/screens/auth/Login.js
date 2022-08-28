import React, {useContext} from 'react';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert } from 'react-native';

export const Login = ({ navigation }) => {
  const { setUserStatus} = useContext(AuthContext);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const loginBtn = () => {
    auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User logged in successfully!');
    setUserStatus(true);
  })
  .catch(error => {

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
      Alert.alert('Email is invalid...!');
    }

    if (error.code === 'auth/user-not-found') {
      console.log('That user not found!');
      Alert.alert('User not found...!');
    }

    if (error.code === 'auth/wrong-password') {
      console.log('That password is wrong!');
      Alert.alert('Password is incorrect...!');
    }

    // console.error(error);
  });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email Address"
        keyboardType="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <TouchableHighlight onPress={() => (!email || !password) ? Alert.alert("Enter Email and Password") : loginBtn()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </View>
      </TouchableHighlight>
      <Text style={styles.noAccount}>Don't Have an Account?</Text>
      <TouchableHighlight onPress={() => navigation.navigate('Register')}>
        <View>
          <Text style={styles.link}>SignUp</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 20,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
    width: '90%',
    paddingHorizontal: 15
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  buttonText: {
    fontSize: 16
  },
  noAccount: {
    marginTop: 20
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 16
  }
})