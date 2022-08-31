import { View, Text, StyleSheet, TouchableHighlight, TextInput, ScrollView, FlatList } from 'react-native'
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
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false); // Set loading to true on component mount
  const [allUsers, setAllUsers] = useState([]); // Initial empty array of users
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [number, setNumber] = useState("");

  if (loading) {
    return <ActivityIndicator />;
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .where('email', '==', email)
      .onSnapshot(querySnapshot => {
        const allUsers = [];
  
        querySnapshot.forEach(documentSnapshot => {
          allUsers.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setAllUsers(allUsers);
        setLoading(false);
        setFirstName(allUsers[0].firstName);
        setLastName(allUsers[0].lastName);
        setUserName(allUsers[0].userName);
        setNumber(allUsers[0].number);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const updateProfile = () => {
    firestore()
  .collection('users')
  .doc(user.uid)
  .update({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    number: number,
  })
  .then(() => {
    console.log('User updated!');
  });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.text}>First Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
        placeholderTextColor='gray'
      />
      <Text style={styles.text}>Last Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
        placeholderTextColor='gray'
      />
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
        placeholder="Username"
        placeholderTextColor='gray'
      />
      <Text style={styles.text}>Email Address</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email Address"
        keyboardType="email-address"
        editable={false}
        placeholderTextColor='gray'
      />
      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNumber}
        value={number}
        placeholder="Phone Number"
        keyboardType='phone-pad'
        placeholderTextColor='gray'
      />
      <View style={{flexDirection: 'row'}}>
      <TouchableHighlight onPress={() => updateProfile()}>
        <View style={styles.buttonSave}>
          <Text style={styles.buttonText}>Save</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => signout()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </View>
      </TouchableHighlight>
      </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    width: '100%',
    color: 'black',
  },
  input: {
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 15,
    color: 'black',
  },
  buttonSave: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "lightgreen",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    minWidth: 100,
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    minWidth: 100,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
})