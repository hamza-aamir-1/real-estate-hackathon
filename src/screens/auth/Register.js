import React, {useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert } from 'react-native';

const initialState = { email: "", password: "" };

export const Register = ({ navigation }) => {

  const { setUserStatus} = useContext(AuthContext);
  const [state, setState] = useState(initialState);

  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }

  const signup = () => {
    let { email, password } = state

        if (!email) {
            alert("Please enter your email")
            return
        }
        if (password.length < 6) {
            alert("Password must be 6 chars")
            return
        }
    auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
    setUserStatus(true);
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
      Alert.alert('Email already in use...!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
      Alert.alert('Email is invalid...!');
    }

    // console.error(error);
  });
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <TextInput
        style={styles.input}
        onChangeText={val => handleChange("firstName", val)}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={val => handleChange("lastName", val)}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={val => handleChange("userName", val)}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={val => handleChange("email", val)}
        placeholder="Email Address"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={val => handleChange("number", val)}
        placeholder="Phone Number"
        keyboardType='phone-pad'
      />
      <TextInput
        style={styles.input}
        onChangeText={val => handleChange("password", val)}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableHighlight onPress={() => signup()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>SIGNUP</Text>
        </View>
      </TouchableHighlight>
    </View>
    <View style={styles.linkContainer}>
      <TouchableHighlight onPress={() => navigation.navigate('Login')}>
        <View>
          <Text style={styles.link}>Already have an account?</Text>
        </View>
      </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
  },  
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
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16
  },
  linkContainer:{
    alignItems: 'center'
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 16,
    marginBottom: 16,
  }
})