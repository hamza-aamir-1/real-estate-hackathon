import { View, Text, StyleSheet, TouchableHighlight, TextInput, ScrollView, FlatList } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import { Appbar, Button, List } from 'react-native-paper';

export default function Sell() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("");
    const [ property, setProperty ] = useState({});
    const [ properties, setProperties ] = useState([]);
    const ref = firestore().collection('properties');

    const user = firebase.auth().currentUser;

    const [loading, setLoading] = useState(false); // Set loading to true on component mount
  const [allUsers, setAllUsers] = useState([]);
  const [email, setEmail] = useState(user.email);

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
        });
    
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);

    async function addProperty() {
      if (title.trim().length <= 3) {
        alert("Please enter property title")
        return
      }
      if (city.trim().length <= 3 || !(/^[A-Za-z\s]*$/.test(city))) {
        alert("Please enter City Name  \n (City Name Contains only letters)")
        return
      }
      if (propertyType.trim().length <= 3 || !(/^[A-Za-z\s]*$/.test(propertyType))) {
        alert("Please enter Property Type \n (Property Type contains only letters)")
        return
      }
      if (area.trim().length < 1 || !(/^[0-9]+$/.test(area))) {
        alert("Please enter area")
        return
      }
      if (finishType.trim().length <= 3 || !(/^[A-Za-z\s]*$/.test(finishType))) {
        alert("Please enter Finish Type \n (Finish Type contains only letters)")
        return
      }
      if (price.trim().length < 1 || !(/^[0-9]+$/.test(price))) {
        alert("Please enter a price")
        return
      }
      if (bedRoom.trim().length < 1 || !(/^[0-9]+$/.test(bedRoom))) {
        alert("Please enter a number of bedrooms")
        return
      }
      if (bathRoom.trim().length < 1 || !(/^[0-9]+$/.test(bathRoom))) {
        alert("Please enter a number of bathrooms")
        return
      }
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
          bathRoom: bathRoom,
          firstName: firstName,
          lastName: lastName,
        });
        setTitle('');
        setCity('');
        setPropertyType('');
        setArea('');
        setFinishType('');
        setPrice('');
        setBedRoom('');
        setBathRoom('');
        setFirstName('');
        setLastName('');
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
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.text}>Property Title :</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="ABC"
        placeholderTextColor='gray'
      />
      <Text style={styles.text}>Location :</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCity}
        value={city}
        placeholder="City (i.e. Faisalabad)"
        placeholderTextColor='gray'
      />
      <Text style={styles.text}>Property Type : </Text>
      <TextInput
        style={styles.input}
        onChangeText={setPropertyType}
        value={propertyType}
        placeholder="Home / Villa / Flat / Apartment"
        placeholderTextColor='gray'
      />
      <Text style={styles.text}>Area / Size</Text>
      <TextInput
        style={styles.input}
        onChangeText={setArea}
        value={area}
        placeholder="Square Meter (i.e. 500)"
        keyboardType='numeric'
        placeholderTextColor='gray'
      />
      <Text style={styles.text}>Finish Type</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFinishType}
        value={finishType}
        placeholder="Well Furnished / Not Furnished"
        placeholderTextColor='gray'
      />
      <Text style={styles.text}>Price</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPrice}
        value={price}
        placeholder="i.e. 50000 Rs."
        keyboardType='numeric'
        placeholderTextColor='gray'
      />
      <Text style={styles.text}>No. of Bedrooms</Text>
      <TextInput
        style={styles.input}
        onChangeText={setBedRoom}
        value={bedRoom}
        placeholder="i.e. 5"
        keyboardType='numeric'
        placeholderTextColor='gray'
      />
      <Text style={styles.text}>No. of Bathrooms</Text>
      <TextInput
        style={styles.input}
        onChangeText={setBathRoom}
        value={bathRoom}
        placeholder="i.e. 4"
        keyboardType='numeric'
        placeholderTextColor='gray'
      />
      <Button onPress={() => addProperty()} textColor='black' style={styles.button}>Add Property</Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
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
    paddingHorizontal: 15,
    width: '100%',
    color: 'black',
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
})