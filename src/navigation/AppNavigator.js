import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/frontend/Home';
import Profile from '../screens/frontend/Profile';
import Sell from '../screens/frontend/Sell';
import { Login } from '../screens/auth/Login';
import { Register } from '../screens/auth/Register';
import { AuthContext } from '../contexts/AuthContext';
import { Alert, Button, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigator = () => {

    const { userStatus} = useContext(AuthContext);
    const isAuthenticated = userStatus;

  return (
        
            isAuthenticated ? 
            (
            <Tab.Navigator initialRouteName="Home"
              screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle:{
                  backgroundColor:'silver',
                  height:50,
                },
              }}
            >
                <Tab.Screen name="Home" component={Home}
                options={{
                  tabBarIcon: () => <IconButton icon="home" size={28}/>,
                }}
                />
                <Tab.Screen name="Sell" component={Sell}
                options={{
                  tabBarIcon: () => <View style={styles.iconBox}><IconButton icon="plus" size={26}/></View>,
                  headerTitle: 'Add Property'
                }}
                />
                <Tab.Screen name="Profile" component={Profile}
                options={{
                  tabBarIcon: () => <IconButton icon="account" size={28}/>,
                }}
                />
            </Tab.Navigator>)
             : 
             (<Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>)
        
  )
}

const styles = StyleSheet.create({
  iconBox: {
    width: 55,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 50,
    fontSize: 30,
    bottom: 15,
  },
})