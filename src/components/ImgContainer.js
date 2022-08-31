import React from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function ImgContainer(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        style={[styles.pimaryColor, {marginBottom: 8}]}>
        Popular Properties
      </Text>
      <View style={styles.imgContainer}>
        {props.property && props.property.length > 0 ? (
          props.property.slice(0, 4).map((data, index) => {
            return (
              <Pressable
                key={index}
                style={styles.imgBox}
                onPress={() => {
                  navigation.navigate('Properties', {
                    screen: 'PropertyDetail',
                  });
                }}>
                <Image
                  source={{uri: data.img}}
                  key={index}
                  style={styles.img}
                />
              </Pressable>
            );
          })
        ) : (
          <Text style={{textAlign: 'center'}}>No Feature property Found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 16,
  },
  pimaryColor: {
    color: '#f77d2b',
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imgBox: {
    width: '50%',
    aspectRatio: 1 / 1,
    padding: 6,
    borderRadius: 12,
  },
  img: {
    flex: 1,
    borderRadius: 12,
  },
});