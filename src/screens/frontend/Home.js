import React, { useContext } from 'react';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export const Home = () => {
const { setUserStatus} = useContext(AuthContext);
  const signout = () => {
    auth()
  .signOut()
  .then(() => {
    setUserStatus(false);
    console.log('User signed out!');
  });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textbox}>Home Page</Text>
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
    alignItems: 'center',
  },
  textbox: {
    color: 'red',
    fontSize: 22,
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