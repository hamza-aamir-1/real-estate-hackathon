import React, {useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app"

const initialState = { email: "", password: "" };

export const Register = ({ navigation }) => {

  const { setUserStatus} = useContext(AuthContext);
  const [state, setState] = useState(initialState);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  // const handleChange = (name, value) => {
  //   setState(s => ({ ...s, [name]: value }))
  // }

  const signup = () => {
    // let { firstName ,email, password } = state
        if (firstName.trim().length <= 2 || !(/^[A-Za-z\s]*$/.test(firstName))) {
          alert("Please enter your First Name /n (Name Contains only letters)")
          return
        }
        if (lastName.trim().length <= 2 || !(/^[A-Za-z\s]*$/.test(lastName))) {
          alert("Please enter your Last Name (Name Contains only letters)")
          return
        }
        if (userName.trim().length <= 2 || !(/^[A-Za-z0-9]*$/.test(userName))) {
          alert("Please enter your Username (Username contains only letters and numbers)")
          return
        }
        if (!email) {
            alert("Please enter your email")
            return
        }
        if (number.trim().length < 11 || !(/^[0-9]+$/.test(number))) {
          alert("Please enter a valid phone number")
          return
        }
        if (password.trim().length < 6) {
            alert("Password must be 6 chars")
            return
        }
    auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    createUserProfile(user);
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

  const createUserProfile = (user) => {
    let formData = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: user.email,
        number: number,
        uid: user.uid,
        dateCreated: firebase.firestore.FieldValue.serverTimestamp()
    }
    firestore()
        .collection('users')
        .doc(user.uid)
        .set(formData)
        .then(() => {
            console.log('User account created & signed in!');
            setUserStatus(true);
        })
        .catch(err => {
            console.error(err)
        })
}

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
      <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
        placeholderTextColor='gray'
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
        placeholderTextColor='gray'
      />
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
        placeholder="Username"
        placeholderTextColor='gray'
      />
      <TextInput
        style={styles.input}
        // onChangeText={val => handleChange("email", val)}
        onChangeText={setEmail}
        value={email}
        placeholder="Email Address"
        keyboardType="email-address"
        placeholderTextColor='gray'
      />
      <TextInput
        style={styles.input}
        onChangeText={setNumber}
        value={number}
        placeholder="Phone Number"
        keyboardType='phone-pad'
        placeholderTextColor='gray'
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor='gray'
        secureTextEntry
      />
      <TouchableHighlight onPress={() => signup()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>SIGNUP</Text>
        </View>
      </TouchableHighlight>
    </View>
      </ScrollView>
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
    justifyContent: 'center',
  },  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    fontSize: 18,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
    width: '90%',
    paddingHorizontal: 15,
    color: 'black',
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  linkContainer:{
    alignItems: 'center'
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 16,
    marginBottom: 16,
    color: 'black',
  }
})