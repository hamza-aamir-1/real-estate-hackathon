import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/frontend/Home';
import { Login } from '../screens/auth/Login';
import { Register } from '../screens/auth/Register';
import { AuthContext } from '../contexts/AuthContext';
import { Alert, Button } from 'react-native';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {

    const { userStatus} = useContext(AuthContext);
    const isAuthenticated = userStatus;

  return (
    <Stack.Navigator>

        {
            isAuthenticated ? 
            (<Stack.Group initialRouteName="Home">
                <Stack.Screen name="Home" component={Home}
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
            </Stack.Group>)
             : 
             (<Stack.Group initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Group>)
        }
    </Stack.Navigator>
  )
}