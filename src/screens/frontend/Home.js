// import React from 'react';
// import {View, StyleSheet, ScrollView} from 'react-native';
// import {Text} from 'react-native-paper';
// import ImgContainer from '../../components/ImgContainer';
// import SingleProperty from '../../components/SingleProperty';
// import {usePropertyContext} from '../../contexts/PropertyContext';

// export const Home = () => {
//   // const {property} = usePropertyContext();

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.padding12}>
//         <View>
//           <Text
//             variant="headlineSmall"
//             style={[styles.mainHeading, styles.pimaryColor]}>
//             Wellcome to Real Estate
//           </Text>
//         </View>
//         <View>
//           <ImgContainer property={property} />
//         </View>
//         <View>
//           {property.length > 0 ? (
//             property.reverse().map((data, index) => {
//               return (
//                 <View key={index} style={styles.card}>
//                   <SingleProperty {...data} />
//                 </View>
//               );
//             })
//           ) : (
//             <Text style={{textAlign: 'center'}}>No Property Found</Text>
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   padding12: {
//     padding: 12,
//   },
//   pimaryColor: {
//     color: '#f77d2b',
//   },
//   mainHeading: {
//     fontWeight: '900',
//     marginBottom: 16,
//   },
//   text: {
//     fontSize: 20,
//   },
//   imgContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },

//   card: {
//     marginBottom: 16,
//   },
// });









import React, { useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export const Home = () => {

  // const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const propertyRef = firebase.firestore().collection('properties');

  const [loading, setLoading] = useState(false); // Set loading to true on component mount
  const [propertys, setPropertys] = useState([]); // Initial empty array of users
  const imgType = ['property', 'house', 'apartment', 'building', 'land'];

  if (loading) {
    return <ActivityIndicator />;
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('properties')
      .onSnapshot(querySnapshot => {
        const propertys = [];
  
        querySnapshot.forEach(documentSnapshot => {
          propertys.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setPropertys(propertys);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <FlatList
      data={propertys}
      renderItem={({ item }) => (
        <Card style={styles.propertyBox}>
      <Card.Cover source={{ uri: `https://source.unsplash.com/random/?${imgType[(Math.random() * imgType.length).toFixed(0)]}` }} />
    <Card.Content>
      <Title style={styles.heading} numberOfLines={1}>{item.title}</Title>
      <Paragraph numberOfLines={3}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</Paragraph>
    </Card.Content>
    <Card.Content style={styles.priceBox}>
      <Title style={styles.price}>Rs. {item.price}</Title>
      <Paragraph style={styles.location}>{item.city}</Paragraph>
    </Card.Content>
    <Card.Content style={styles.priceBox}>
      <Paragraph style={styles.location}>Property Type: {item.propertyType}</Paragraph>
    </Card.Content>
    <Card.Content style={styles.priceBox}>
      <Paragraph style={styles.location}>Area: {item.area} sq. meter</Paragraph>
    </Card.Content>
    <Card.Content style={styles.priceBox}>
      <Paragraph style={styles.location}>Finish Type: {item.finishType}</Paragraph>
    </Card.Content>
    <Card.Content style={styles.priceBox}>
      <Paragraph style={styles.location}>Bedrooms: {item.bedRoom}</Paragraph>
      <Paragraph style={styles.location}>Bathrooms: {item.bathRoom}</Paragraph>
    </Card.Content>
    <Card.Content style={styles.adminDetails}>
      <Avatar.Image size={30} source={{ uri: 'https://picsum.photos/200' }} />
      <Paragraph style={styles.fullName}>{item.firstName + " " + item.lastName}</Paragraph>
    </Card.Content>
  </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  propertyBox: {
    color: 'red',
    padding: 10,
    margin: 15,
  },
  heading: {
    fontSize: 22,
    paddingTop: 10,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  location: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  adminDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10
  },
})