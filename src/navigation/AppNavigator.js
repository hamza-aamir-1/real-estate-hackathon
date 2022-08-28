import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/frontend/Home';
import Profile from '../screens/frontend/Profile';
import Sell from '../screens/frontend/Sell';
import { Login } from '../screens/auth/Login';
import { Register } from '../screens/auth/Register';
import { AuthContext } from '../contexts/AuthContext';
import { Alert, Button } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigator = () => {

    const { userStatus} = useContext(AuthContext);
    const isAuthenticated = userStatus;

  return (

        
            isAuthenticated ? 
            (
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Home" component={Home}
                options={{
                  // headerTitle: (props) => <LogoTitle {...props} />,
                  headerRight: () => (
                    <Button
                      onPress={() => Alert.alert('This is a button!')}
                      title="Info"
                      color="#fff"
                    />
                  ),
                }}
                />
                <Tab.Screen name="Sell" component={Sell}/>
                <Tab.Screen name="Profile" component={Profile}/>
            </Tab.Navigator>)
             : 
             (<Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>)
        
  )
}