import { View, Text, StyleSheet, TouchableHighlight, TextInput, ScrollView, FlatList } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import { Appbar, Button, List } from 'react-native-paper';

export default function Sell() {

    const [ property, setProperty ] = useState('');
    const [ properties, setProperties ] = useState([]);
    const ref = firestore().collection('properties');

    const user = firebase.auth().currentUser;

    async function addProperty() {
        await ref.add({
          id: user.uid,
          email: user.email,  
          title: title,
          price: price,
          city: city,
        });
        setTitle('');
        setPrice('');
        setCity('');
      }

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPrice}
        value={price}
        placeholder="Price"
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        onChangeText={setCity}
        value={city}
        placeholder="City"
      />
      <Button onPress={() => addProperty()} textColor='black' style={styles.button}>Add Property</Button>
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
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 16
  },
})