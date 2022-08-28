import { View, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../contexts/AuthContext';

export default function Profile() {

  const { setUserStatus} = useContext(AuthContext);
  const signout = () => {
    auth()
  .signOut()
  .then(() => {
    setUserStatus(false);
    console.log('User signed out!');
  });
  }

  const user = firebase.auth().currentUser;
  const [firstName, setFirstName] = useState(user.firstName ? user.firstName : "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [userName, setUserName] = useState(user.userName || "");
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.number || "");
  const [password, setPassword] = useState(user.password);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email Address"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setNumber}
        value={number}
        placeholder="Phone Number"
        keyboardType='phone-pad'
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableHighlight onPress={() => signout()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
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
})