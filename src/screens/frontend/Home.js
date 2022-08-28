import React, { useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export const Home = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const propertyRef = firebase.firestore().collection('properties');

  useEffect(async () => {
    propertyRef
    .onSnapshot(
      querySnapshot => {
        const data = []
        querySnapshot.forEach((doc) => {
          const {title, city, propertyType, area, finishType, price, bedRoom, bathRoom} = doc.data()
          data.push({
            id: doc.id,
            title,
            city,
            propertyType,
            area,
            finishType,
            price,
            bedRoom,
            bathRoom
          })
        })
        setData(data)
      }
    )
  }, [])

  return (
    <ScrollView style={styles.container}>

<View>
  <FlatList
    data={data}
    numColumns={1}
    renderItem={({item}) => (
      <Card style={styles.propertyBox}>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
      <Title style={styles.heading}>{item.title}</Title>
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
      <Paragraph style={styles.fullName}>Full Name</Paragraph>
    </Card.Content>
  </Card>
    )}
  />
</View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  propertyBox: {
    color: 'red',
    padding: 10,
    margin: 15
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