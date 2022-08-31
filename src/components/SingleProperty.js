import React from 'react';
import {Card, Title, Paragraph, Avatar, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
export default function SingleProperty(props) {
  const navigation = useNavigation();
  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.navigate('Properties', {screen: 'PropertyDetail'});
      }}>
      <View>
        <Card.Cover source={{uri: props.img}} style={styles.productImg} />
      </View>
      <Card.Content>
        <Title style={styles.text}>{props.name}</Title>
        <Paragraph numberOfLines={3} style={styles.descripton}>
          {props.description}
        </Paragraph>
        <View style={styles.listRow}>
          <Avatar.Text
            size={24}
            label={`${props.user ? props.user.firstName.charAt(0) : 'U'}${
              props.user ? props.user.lastName.charAt(0) : 'N'
            }`}
            color="white"
          />
          <View style={styles.iconText}>
            <MaterialIcons name="location-city" size={24} />
            <Text style={{fontWeight: '700'}}> {props.city}</Text>
          </View>
          <View style={styles.iconText}>
            <FontAwesome name="dollar" size={16} />
            <Text style={{fontWeight: '700'}}>
              {' '}
              {props.price.$numberDecimal}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: 'white',
  },
  productImg: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  descripton: {
    marginBottom: 16,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});