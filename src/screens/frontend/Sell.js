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
          city: city,
          propertyType: propertyType,
          area: area,
          finishType: finishType,
          price: price,
          bedRoom: bedRoom,
          bathRoom: bathRoom
        });
        setTitle('');
        setCity('');
        setPropertyType('');
        setArea('');
        setFinishType('');
        setPrice('');
        setBedRoom('');
        setBathRoom('');
      }

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [area, setArea] = useState("");
  const [finishType, setFinishType] = useState("");
  const [price, setPrice] = useState("");
  const [bedRoom, setBedRoom] = useState("");
  const [bathRoom, setBathRoom] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Property Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={setCity}
        value={city}
        placeholder="Location"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPropertyType}
        value={propertyType}
        placeholder="Property Type"
      />
      <TextInput
        style={styles.input}
        onChangeText={setArea}
        value={area}
        placeholder="Area / Size"
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        onChangeText={setFinishType}
        value={finishType}
        placeholder="Finish Type"
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
        onChangeText={setBedRoom}
        value={bedRoom}
        placeholder="No. of Bedrooms"
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        onChangeText={setBathRoom}
        value={bathRoom}
        placeholder="No. of Bathrooms"
        keyboardType='numeric'
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